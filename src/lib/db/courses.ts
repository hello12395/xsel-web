import { createPublicClient } from "@/lib/supabase/public";
import type {
  Course,
  CourseBatch,
  CourseChapterSummary,
  CourseWithLessons,
} from "@/types/course";
import { pickLatestBatchByStartDate } from "@/lib/db/batches";

const COURSE_LIST_SELECT = `
  id,
  title,
  description,
  course_type,
  category,
  price,
  thumbnail_url,
  instructor_id,
  status,
  registration_deadline,
  course_start_date,
  fake_enrollments,
  learning_outcomes,
  created_at,
  updated_at,
  batches:course_batches(
    id,
    course_id,
    name,
    start_date,
    end_date,
    registration_deadline,
    status,
    max_seats,
    created_at,
    updated_at
  ),
  chapters:course_chapters(
    id,
    title,
    batch_id,
    sort_order,
    lessons:course_lessons(
      id,
      title,
      duration_seconds,
      status,
      lesson_type,
      sort_order
    )
  )
`;

/** Keep chapters for the latest running batch (by start_date); ignore other batches. */
export function filterChaptersToLatestBatch(
  course: CourseWithLessons,
): CourseWithLessons {
  const batches = (course.batches ?? []) as CourseBatch[];
  const chapters = (course.chapters ?? []) as CourseChapterSummary[];

  if (batches.length === 0) {
    // Prerecorded / unbatched content — keep chapters with no batch_id.
    return {
      ...course,
      chapters: chapters.filter((chapter) => !chapter.batch_id),
    };
  }

  const latest = pickLatestBatchByStartDate(batches);
  if (!latest) {
    return { ...course, chapters: [] };
  }

  return {
    ...course,
    chapters: chapters.filter((chapter) => chapter.batch_id === latest.id),
  };
}

/** Published courses — same Supabase `courses` table as the admin portal. */
export async function getPublishedCourses(): Promise<CourseWithLessons[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("courses")
    .select(COURSE_LIST_SELECT)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return ((data ?? []) as CourseWithLessons[]).map(filterChaptersToLatestBatch);
}

export async function getPublishedCourseById(
  id: string
): Promise<CourseWithLessons | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("courses")
    .select(COURSE_LIST_SELECT)
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return filterChaptersToLatestBatch(data as CourseWithLessons);
}

export type { Course, CourseWithLessons };
