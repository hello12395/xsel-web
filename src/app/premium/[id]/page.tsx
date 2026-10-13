import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mapCourseToPremium } from "@/data/premium-courses";
import { getPublishedCourseById } from "@/lib/db/courses";
import { getCourseReviews } from "@/lib/db/course-reviews";
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
  try {
    courseReviews = await getCourseReviews(id);
  } catch (error) {
    console.error("Failed to load course reviews", error);
    courseReviews = [];
  }

  return (
    <main className="min-h-dvh bg-cream">
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #020b18 0%, #0a2340 42%, #0c4a66 100%)",
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
                "linear-gradient(145deg, rgba(2,11,24,0.88) 0%, rgba(10,35,64,0.82) 48%, rgba(12,74,102,0.78) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-14 pt-28 md:px-8 md:py-16 md:pt-32">
          <Link
            href="/#premium-courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            <ArrowIcon className="h-4 w-4 -scale-x-100" />
            Back to Paid Courses
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#f0d060]/20 to-[#c9a227]/20 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#f0d060] uppercase">
              <PremiumIcon className="h-3.5 w-3.5" />
              Paid
            </span>
          </div>

          <h1 className="font-display mt-5 text-3xl leading-tight text-white sm:text-5xl">
            {course.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-start lg:gap-8">
          <PremiumCourseTabs
            description={row.description?.trim() || ""}
            outcomes={outcomes}
            chapters={row.chapters ?? []}
            duration={course.duration}
            lessons={course.lessons}
            students={row.fake_enrollments ?? 0}
            formatLabel={formatCourseType(row.course_type)}
            reviews={courseReviews}
          />

          <aside className="self-start lg:sticky lg:top-24 lg:z-20">
            <div className="card-surface overflow-hidden rounded-[24px]">
              <div className="relative aspect-video bg-ink/5">
                <Image
                  src={course.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium tracking-wide text-ink/40 uppercase">
                  Enrollment
                </p>
                <p className="mt-2 font-display text-3xl tracking-tight text-ink tabular-nums">
                  {course.price}
                </p>
                <p className="mt-2 text-sm leading-6 text-ink/55">
                  Secure your seat with bank or mobile wallet payment. Admin verification usually
                  takes 24–48 hours.
                </p>
                <Link
                  href={`/premium/${course.id}/enroll`}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-deep"
                >
                  Enroll
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/#free-lessons"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/25"
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
