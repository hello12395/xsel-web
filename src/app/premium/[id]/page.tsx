import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPremiumCourse } from "@/data/premium-courses";
import { ArrowIcon, PremiumIcon } from "@/components/Icons";

type PremiumCoursePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PremiumCoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getPremiumCourse(id);
  if (!course) return { title: "Premium course | English Sarwar Lab" };
  return {
    title: `${course.title} | English Sarwar Lab`,
    description: course.blurb,
  };
}

export default async function PremiumCoursePage({ params }: PremiumCoursePageProps) {
  const { id } = await params;
  const course = getPremiumCourse(id);
  if (!course) notFound();

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

        <div className="relative mx-auto max-w-4xl px-5 py-14 pt-28 md:px-8 md:py-20 md:pt-32">
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
            {course.lessons} lessons · {course.duration} · {course.price}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
        <div className="card-surface rounded-[24px] p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-tight text-ink">You&apos;re signed in</h2>
          <p className="mt-3 text-[15px] leading-7 text-ink/60">
            This premium track is ready for enrollment. Reach out to confirm your seat and payment
            details.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/#location"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-deep"
            >
              Ask about enrollment
              <ArrowIcon className="h-3.5 w-3.5" />
            </a>
            <Link
              href="/#free-stuff"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/25"
            >
              Browse free courses
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
