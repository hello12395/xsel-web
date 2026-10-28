import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mapCourseToPremium } from "@/data/premium-courses";
import { getPublishedCourseById } from "@/lib/db/courses";
import {
  averageCourseRating,
  getCourseAverageRating,
  getCourseReviews,
} from "@/lib/db/course-reviews";
import { getDisplayedStudentCount } from "@/lib/db/enrollments";
import { ArrowIcon, PremiumIcon } from "@/components/Icons";
import { PremiumCourseTabs } from "@/components/PremiumCourseTabs";
import { parseLearningOutcomes } from "@/types/course";

type PremiumCoursePageProps = {
  params: Promise<{ id: string }>;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function generateMetadata({
  params,
}: PremiumCoursePageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const row = await getPublishedCourseById(id);
    if (!row) return { title: "Paid course | Sarwar English Lab" };
    const course = mapCourseToPremium(row);
    return {
      title: `${course.title} | Sarwar English Lab`,
      description: course.blurb,
    };
  } catch {
    return { title: "Paid course | Sarwar English Lab" };
  }
}

function formatCourseType(type: string) {
  return type === "live" ? "Live cohort" : "Pre-recorded";
}

export default async function PremiumCoursePage({ params }: PremiumCoursePageProps) {
  const { id } = await params;

  if (!UUID_RE.test(id)) notFound();

  const row = await getPublishedCourseById(id);
  if (!row) notFound();

  const course = mapCourseToPremium(row);
  const outcomes = parseLearningOutcomes(row.learning_outcomes);
  let courseReviews: Awaited<ReturnType<typeof getCourseReviews>> = [];
  let courseRating: number | null = null;
  const [studentCount, reviewResult] = await Promise.all([
    getDisplayedStudentCount(row.fake_enrollments ?? 0, row.batches, id),
    (async () => {
      try {
        const [reviews, avgRating] = await Promise.all([
          getCourseReviews(id),
          getCourseAverageRating(id),
        ]);
        return {
          reviews,
          rating: avgRating ?? averageCourseRating(reviews),
        };
      } catch (error) {
        console.error("Failed to load course reviews", error);
        return { reviews: [] as Awaited<ReturnType<typeof getCourseReviews>>, rating: null };
      }
    })(),
  ]);
  courseReviews = reviewResult.reviews;
  courseRating = reviewResult.rating;

  return (
    <main className="min-h-dvh bg-cream">
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #0a1a16 0%, #152F29 42%, #234f44 100%)",
        }}
      >
        <div className="absolute inset-0">
          <Image
            src={course.thumbnail}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(145deg, rgba(10,26,22,0.92) 0%, rgba(21,47,41,0.88) 48%, rgba(35,79,68,0.82) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-10 pt-24 sm:px-5 sm:py-14 sm:pt-28 md:px-8 md:py-16 md:pt-32">
          <Link
            href="/#premium-courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            <ArrowIcon className="h-4 w-4 -scale-x-100" />
            Back to Paid Courses
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFAA93]/18 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#EFAA93] uppercase">
              <PremiumIcon className="h-3.5 w-3.5" />
              Paid
            </span>
          </div>

          <h1 className="font-display mt-3.5 text-[1.75rem] leading-tight text-white sm:mt-5 sm:text-5xl">
            {course.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-12 md:px-8 md:py-16">
        <div className="grid gap-5 sm:gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start lg:gap-8">
          <PremiumCourseTabs
            description={row.description?.trim() || ""}
            outcomes={outcomes}
            chapters={row.chapters ?? []}
            duration={course.duration}
            lessons={course.lessons}
            students={studentCount}
            formatLabel={formatCourseType(row.course_type)}
            rating={courseRating}
            reviews={courseReviews}
          />

          <aside className="self-start lg:sticky lg:top-24 lg:z-20">
            <div className="card-surface overflow-hidden rounded-[18px] sm:rounded-[24px]">
              <div className="relative aspect-[16/10] bg-ink/5 sm:aspect-video">
                <Image
                  src={course.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-[11px] font-medium tracking-wide text-ink/40 uppercase sm:text-xs">
                  Enrollment
                </p>
                <p className="mt-1.5 font-display text-[1.75rem] tracking-tight text-ink tabular-nums sm:mt-2 sm:text-3xl">
                  {course.price}
                </p>
                <p className="mt-1.5 text-[13px] leading-5 text-ink/55 sm:mt-2 sm:text-sm sm:leading-6">
                  Secure your seat with bank or mobile wallet payment. Admin verification usually
                  takes 24–48 hours.
                </p>
                <Link
                  href={`/premium/${course.id}/enroll`}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#152F29] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1a3d35] sm:mt-6 sm:px-6 sm:py-3.5"
                >
                  Enroll
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/#free-lessons"
                  className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#152F29]/15 bg-white px-5 py-3 text-sm font-semibold text-[#152F29] transition hover:border-[#152F29]/30 hover:bg-[#F3F7F0] sm:mt-3 sm:px-6 sm:py-3.5"
                >
                  Browse free lessons
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
