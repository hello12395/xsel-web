import { createPublicClient } from "@/lib/supabase/public";

export type CourseReviewRow = {
  id: string;
  course_id: string;
  user_id: string | null;
  reviewer_name: string | null;
  rating: number;
  review: string;
  created_at: string;
  profiles?: {
    full_name?: string | null;
    avatar_url?: string | null;
  } | null;
};

export type CourseReviewCard = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
};

function formatReviewDate(iso: string): string {
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return "Learner";
  return date.toLocaleDateString("en-PK", {
    month: "short",
    year: "numeric",
  });
}

function mapReviewRow(row: CourseReviewRow): CourseReviewCard {
  const profileName = row.profiles?.full_name?.trim() || "";
  const guestName = row.reviewer_name?.trim() || "";
  const name = profileName || guestName || "Learner";
  const avatar = row.profiles?.avatar_url?.trim() || "/default-user.png";

  return {
    id: row.id,
    name,
    role: formatReviewDate(row.created_at),
    avatar,
    quote: row.review?.trim() || "",
    rating: Math.min(5, Math.max(1, Math.round(Number(row.rating) || 5))),
  };
}

/** Published course reviews from live `course_reviews` table. */
export async function getCourseReviews(
  courseId: string,
): Promise<CourseReviewCard[]> {
  const supabase = createPublicClient();

  // Prefer the simple select first so rating still loads if the profile join is blocked.
  const { data, error } = await supabase
    .from("course_reviews")
    .select(
      "id, course_id, user_id, reviewer_name, rating, review, created_at",
    )
    .eq("course_id", courseId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const baseRows = ((data ?? []) as CourseReviewRow[]).filter(
    (row) => (row.review?.trim() || "").length > 0 || Number(row.rating) > 0,
  );

  if (baseRows.length === 0) return [];

  const withProfile = await supabase
    .from("course_reviews")
    .select(
      `
      id,
      course_id,
      user_id,
      reviewer_name,
      rating,
      review,
      created_at,
      profiles:profiles!course_reviews_user_id_fkey (
        full_name,
        avatar_url
      )
    `,
    )
    .eq("course_id", courseId)
    .order("created_at", { ascending: false });

  if (!withProfile.error && withProfile.data && withProfile.data.length > 0) {
    return (withProfile.data as CourseReviewRow[])
      .map(mapReviewRow)
      .filter((item) => item.quote.length > 0 || item.rating > 0);
  }

  return baseRows.map(mapReviewRow);
}

export function averageCourseRating(reviews: CourseReviewCard[]): number | null {
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

/** Average rating for a course from `course_reviews.rating`. */
export async function getCourseAverageRating(
  courseId: string,
): Promise<number | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("course_reviews")
    .select("rating")
    .eq("course_id", courseId);

  if (error) throw error;

  const ratings = (data ?? [])
    .map((row) => Number((row as { rating: number }).rating))
    .filter((value) => Number.isFinite(value) && value > 0);

  if (ratings.length === 0) return null;

  const total = ratings.reduce((sum, value) => sum + value, 0);
  return Math.round((total / ratings.length) * 10) / 10;
}
