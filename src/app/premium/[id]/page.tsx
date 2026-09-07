import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { mapCourseToPremium } from "@/data/premium-courses";
import { getPublishedCourseById } from "@/lib/db/courses";
import { createClient } from "@/lib/supabase/server";
import { ArrowIcon, PremiumIcon } from "@/components/Icons";
import type { LearningOutcome } from "@/types/course";

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
    if (!row) return { title: "Premium course | English Sarwar Lab" };
    const course = mapCourseToPremium(row);
    return {
      title: `${course.title} | English Sarwar Lab`,
      description: course.blurb,
    };
  } catch {
    return { title: "Premium course | English Sarwar Lab" };
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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/premium/${id}`)}&required=1`);
  }

  const course = mapCourseToPremium(row);
  const outcomes = (row.learning_outcomes ?? []).filter(
    (item): item is LearningOutcome =>
      Boolean(item?.title?.trim() || item?.description?.trim())
  );

  return (
    <main className="min-h-dvh bg-cream">
      <div className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Image
            src={course.thumbnail}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/75" />
        </div>

        <div className="relative mx-auto max-w-5xl px-5 py-14 pt-28 md:px-8 md:py-16 md:pt-32">
          <Link
            href="/#free-stuff"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            <ArrowIcon className="h-4 w-4 -scale-x-100" />
            Back to Free Stuff
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-gold-soft uppercase">
              {course.tag}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#f0d060]/20 to-[#c9a227]/20 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#f0d060] uppercase">
              <PremiumIcon className="h-3.5 w-3.5" />
              Premium · Paid
            </span>
          </div>

          <h1 className="font-display mt-5 text-3xl leading-tight text-white sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
            {course.blurb}
          </p>
          <p className="mt-4 text-sm font-semibold tracking-wide text-white/55 uppercase">
            {course.lessons > 0
              ? `${course.lessons} lessons · ${course.duration} · ${course.price}`
              : `${course.duration} · ${course.price}`}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start lg:gap-10">
          <div className="space-y-8">
            <section className="card-surface rounded-[24px] p-6 sm:p-8">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-[#b8860b] uppercase">
                About this course
              </p>
              <h2 className="font-display mt-2 text-2xl tracking-tight text-ink">
                What you&apos;ll learn
              </h2>
              <p className="mt-4 text-[15px] leading-7 whitespace-pre-line text-ink/65">
                {row.description?.trim() || course.blurb}
              </p>

              {outcomes.length > 0 ? (
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {outcomes.map((outcome, index) => (
                    <li
                      key={`${outcome.title}-${index}`}
                      className="rounded-2xl border border-ink/8 bg-cream/50 p-4"
                    >
                      <p className="text-sm font-semibold text-ink">
                        {outcome.title || `Outcome ${index + 1}`}
                      </p>
                      {outcome.description ? (
                        <p className="mt-1.5 text-sm leading-6 text-ink/55">
                          {outcome.description}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>

            <section className="card-surface rounded-[24px] p-6 sm:p-8">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-gold uppercase">
                Course details
              </p>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium tracking-wide text-ink/40 uppercase">
                    Format
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    {formatCourseType(row.course_type)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium tracking-wide text-ink/40 uppercase">
                    Category
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{course.tag}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium tracking-wide text-ink/40 uppercase">
                    Lessons
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    {course.lessons > 0 ? `${course.lessons} lessons` : "Curriculum updating"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium tracking-wide text-ink/40 uppercase">
                    Duration
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{course.duration}</dd>
                </div>
              </dl>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28">
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
                  href="/#free-stuff"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/25"
                >
                  Browse free courses
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
