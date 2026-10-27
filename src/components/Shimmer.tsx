import type { CSSProperties } from "react";

type ShimmerProps = {
  className?: string;
  style?: CSSProperties;
};

/** Base shimmer block — use for any loading placeholder. */
export function Shimmer({ className = "", style }: ShimmerProps) {
  return <div className={`shimmer-block ${className}`.trim()} style={style} aria-hidden />;
}

export function CardSkeleton({
  tone = "neutral",
}: {
  tone?: "neutral" | "red" | "yellow" | "blue" | "green";
}) {
  const tones: Record<typeof tone, string> = {
    neutral: "bg-white/80",
    red: "bg-[#fee2e2]/90",
    yellow: "bg-[#fef9c3]/90",
    blue: "bg-[#dbeafe]/90",
    green: "bg-[#dcfce7]/90",
  };

  return (
    <div
      className={`overflow-hidden rounded-[22px] border border-ink/8 shadow-[0_18px_40px_-24px_rgba(18,22,74,0.2)] sm:rounded-[28px] ${tones[tone]}`}
    >
      <Shimmer className="aspect-video rounded-none" />
      <div className="space-y-3 p-4 sm:p-6">
        <Shimmer className="h-5 w-20 rounded-full" />
        <Shimmer className="h-6 w-[80%] max-w-[14rem] rounded-lg" />
        <Shimmer className="h-4 w-full rounded-md" />
        <Shimmer className="h-4 w-[70%] max-w-[12rem] rounded-md" />
        <Shimmer className="mt-2 h-4 w-24 rounded-md" />
      </div>
    </div>
  );
}

export function CourseCardsSkeleton({
  tones = ["neutral", "neutral", "neutral"] as const,
}: {
  tones?: ReadonlyArray<"neutral" | "red" | "yellow" | "blue" | "green">;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {tones.map((tone, index) => (
        <CardSkeleton key={`${tone}-${index}`} tone={tone} />
      ))}
    </div>
  );
}

export function SocialCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Shimmer key={i} className="min-h-[14.5rem] rounded-[20px] sm:min-h-[16rem]" />
      ))}
    </div>
  );
}

export function WhyCardsSkeleton() {
  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white/70 sm:hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`flex gap-3.5 px-4 py-4 ${i < 2 ? "border-b border-ink/8" : ""}`}
          >
            <Shimmer className="mt-0.5 h-5 w-8 shrink-0 rounded-md" />
            <div className="min-w-0 flex-1 space-y-2">
              <Shimmer className="h-4 w-[85%] max-w-[14rem] rounded-md" />
              <Shimmer className="h-3 w-full rounded-md" />
              <Shimmer className="h-3 w-[90%] rounded-md" />
            </div>
          </div>
        ))}
      </div>
      <div className="hidden grid-cols-1 gap-4 sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Shimmer key={i} className="h-48 rounded-[22px] sm:h-56" />
        ))}
      </div>
    </>
  );
}

export function ReviewPanelSkeleton() {
  return (
    <div className="space-y-4">
      <Shimmer className="h-52 w-full rounded-[28px] sm:h-56" />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Shimmer key={i} className="h-14 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function PremiumCoursesSkeleton() {
  return (
    <section
      className="section-anchor border-b border-ink/8 bg-[#F7F3EA]"
      aria-busy="true"
      aria-label="Loading paid courses"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 md:py-28 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <Shimmer className="h-10 w-56 rounded-xl sm:h-12 sm:w-72" />
          <Shimmer className="h-4 w-full max-w-md rounded-md" />
          <Shimmer className="h-4 w-[80%] max-w-sm rounded-md" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <CardSkeleton tone="neutral" />
          <CardSkeleton tone="neutral" />
          <CardSkeleton tone="neutral" />
        </div>
      </div>
    </section>
  );
}

export function FreeLessonsSkeleton() {
  return (
    <section
      className="section-anchor border-b border-ink/8 bg-[#F7F3EA]"
      aria-busy="true"
      aria-label="Loading free lessons"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 md:py-28 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <Shimmer className="h-10 w-52 rounded-xl sm:h-12 sm:w-64" />
          <Shimmer className="h-4 w-full max-w-lg rounded-md" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          <CardSkeleton tone="red" />
          <CardSkeleton tone="yellow" />
          <CardSkeleton tone="blue" />
        </div>
      </div>
    </section>
  );
}

export function ReviewsSkeleton() {
  return (
    <section
      className="relative section-anchor overflow-hidden bg-reviews-section"
      aria-busy="true"
      aria-label="Loading reviews"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20 md:px-10 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
          <div className="space-y-4">
            <Shimmer className="h-10 w-56 rounded-xl sm:h-12" />
            <Shimmer className="h-4 w-full rounded-md" />
            <Shimmer className="h-4 w-[80%] rounded-md" />
            <div className="mt-8 flex gap-6 border-t border-ink/10 pt-8">
              <Shimmer className="h-12 w-20 rounded-lg" />
              <Shimmer className="h-12 w-20 rounded-lg" />
              <Shimmer className="h-12 w-20 rounded-lg" />
            </div>
          </div>
          <div className="space-y-4">
            <Shimmer className="h-52 w-full rounded-[28px] sm:h-56" />
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Shimmer key={i} className="h-14 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SocialSkeleton() {
  return (
    <section
      className="relative section-anchor overflow-hidden border-b border-ink/8 bg-social-stage"
      aria-busy="true"
      aria-label="Loading social media"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="space-y-4">
            <Shimmer className="h-10 w-48 rounded-xl sm:h-12 sm:w-64" />
            <Shimmer className="h-4 w-full max-w-md rounded-md" />
            <div className="flex gap-2 pt-2">
              <Shimmer className="h-8 w-24 rounded-full" />
              <Shimmer className="h-8 w-24 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Shimmer key={i} className="min-h-[14.5rem] rounded-[20px] sm:min-h-[16rem]" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LocationSkeleton() {
  return (
    <section
      className="bg-location-section relative section-anchor overflow-hidden border-t border-ink/8"
      aria-busy="true"
      aria-label="Loading location"
    >
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-5 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <Shimmer className="h-10 w-48 rounded-xl bg-white/15 sm:h-12" />
          <Shimmer className="h-4 w-full max-w-md rounded-md bg-white/12" />
          <Shimmer className="mt-6 h-28 w-full rounded-2xl bg-white/90" />
          <div className="grid grid-cols-2 gap-3">
            <Shimmer className="h-24 rounded-2xl bg-white/90" />
            <Shimmer className="h-24 rounded-2xl bg-white/90" />
          </div>
        </div>
        <Shimmer className="mx-auto aspect-square w-full max-w-md rounded-full bg-white/10" />
      </div>
    </section>
  );
}

export function HomePageSkeleton() {
  return (
    <>
      <div className="h-16 border-b border-ink/8 bg-cream/80 sm:h-[4.25rem]">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-5 lg:px-8">
          <Shimmer className="h-9 w-32 rounded-lg" />
          <div className="hidden gap-3 md:flex">
            <Shimmer className="h-4 w-14 rounded-md" />
            <Shimmer className="h-4 w-14 rounded-md" />
            <Shimmer className="h-4 w-14 rounded-md" />
            <Shimmer className="h-9 w-24 rounded-full" />
          </div>
        </div>
      </div>
      <Shimmer className="h-[70vh] min-h-[28rem] w-full rounded-none" />
      <div className="bg-method-section border-b border-ink/8 px-4 py-16 sm:px-5 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-6">
          <Shimmer className="h-10 w-64 rounded-xl sm:h-12" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Shimmer className="h-40 rounded-[22px]" />
            <Shimmer className="h-40 rounded-[22px]" />
            <Shimmer className="h-40 rounded-[22px]" />
          </div>
        </div>
      </div>
      <PremiumCoursesSkeleton />
      <FreeLessonsSkeleton />
      <ReviewsSkeleton />
      <SocialSkeleton />
      <LocationSkeleton />
    </>
  );
}

export function CourseDetailSkeleton() {
  return (
    <main className="min-h-dvh bg-cream" aria-busy="true" aria-label="Loading course">
      <Shimmer className="h-64 w-full rounded-none sm:h-80" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-5 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-6">
          <Shimmer className="h-48 w-full rounded-[24px]" />
          <Shimmer className="h-40 w-full rounded-[24px]" />
        </div>
        <Shimmer className="h-80 w-full rounded-[24px]" />
      </div>
    </main>
  );
}

export function EnrollSkeleton() {
  return (
    <main
      className="min-h-dvh bg-[linear-gradient(180deg,#f7f4ec_0%,#f3efe6_45%,#efe9df_100%)]"
      aria-busy="true"
      aria-label="Loading enrollment"
    >
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-5 sm:py-14">
        <div className="space-y-3">
          <Shimmer className="h-3 w-36 rounded-md" />
          <Shimmer className="h-9 w-72 rounded-xl" />
          <Shimmer className="h-10 w-full max-w-xl rounded-xl" />
        </div>
        <Shimmer className="h-24 w-full rounded-[22px]" />
        <div className="grid gap-6 lg:grid-cols-5">
          <Shimmer className="h-80 rounded-[22px] lg:col-span-3" />
          <Shimmer className="h-80 rounded-[22px] lg:col-span-2" />
        </div>
      </div>
    </main>
  );
}

export function PlaylistDetailSkeleton() {
  return (
    <main className="min-h-dvh bg-cream" aria-busy="true" aria-label="Loading playlist">
      <Shimmer className="h-56 w-full rounded-none sm:h-72" />
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-10 sm:px-5 lg:px-8">
        <Shimmer className="h-8 w-48 rounded-xl" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Shimmer key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    </main>
  );
}

export function AuthPageSkeleton() {
  return (
    <main className="flex min-h-dvh" aria-busy="true" aria-label="Loading">
      <div className="hidden w-1/2 bg-ink/90 lg:block">
        <Shimmer className="h-full w-full rounded-none bg-white/10" />
      </div>
      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-4 rounded-[24px] border border-ink/8 bg-white p-6 sm:p-8">
          <Shimmer className="h-10 w-40 rounded-xl" />
          <Shimmer className="h-4 w-56 rounded-md" />
          <Shimmer className="mt-6 h-11 w-full rounded-xl" />
          <Shimmer className="h-11 w-full rounded-xl" />
          <Shimmer className="h-11 w-full rounded-full" />
        </div>
      </div>
    </main>
  );
}
