"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { PremiumCourse } from "@/data/premium-courses";
import { ArrowIcon, PremiumIcon } from "./Icons";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { CourseCardsSkeleton } from "./Shimmer";
import { ShimmerGate } from "./ShimmerGate";

const PAGE_SIZE = 3;

const CARD_THEMES = [
  {
    background: "#214F42",
    hoverShadow: "hover:shadow-[0_28px_52px_-18px_rgba(33,79,66,0.55)]",
    border: "border-white/10",
    badge: "bg-white/18 text-white",
    title: "text-white",
    blurb: "text-[#E8F0E4]",
    meta: "text-[#C2D7BA]",
    cta: "text-[#F7DFC7]",
    ring: "rgba(255,255,255,0.16)",
    ringSoft: "rgba(255,255,255,0.08)",
    ringFaint: "rgba(255,255,255,0.04)",
  },
  {
    background: "#C2D7BA",
    hoverShadow: "hover:shadow-[0_28px_52px_-18px_rgba(194,215,186,0.65)]",
    border: "border-[#152F29]/12",
    badge: "bg-[#152F29] text-white",
    title: "text-[#152F29]",
    blurb: "text-[#1c3530]",
    meta: "text-[#3d524a]",
    cta: "text-[#152F29]",
    ring: "rgba(255,255,255,0.45)",
    ringSoft: "rgba(255,255,255,0.28)",
    ringFaint: "rgba(255,255,255,0.14)",
  },
  {
    background: "#DF937F",
    hoverShadow: "hover:shadow-[0_28px_52px_-18px_rgba(223,147,127,0.55)]",
    border: "border-[#152F29]/12",
    badge: "bg-[#152F29] text-white",
    title: "text-[#152F29]",
    blurb: "text-[#1c3530]",
    meta: "text-[#3f3530]",
    cta: "text-[#152F29]",
    ring: "rgba(255,255,255,0.42)",
    ringSoft: "rgba(255,255,255,0.24)",
    ringFaint: "rgba(255,255,255,0.12)",
  },
] as const;

function getCardTheme(index: number) {
  return CARD_THEMES[index % CARD_THEMES.length];
}

export function PremiumCourses({ courses }: { courses: PremiumCourse[] }) {
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const pageCount = Math.max(1, Math.ceil(courses.length / PAGE_SIZE));

  const visible = useMemo(() => {
    if (showAll) return courses;
    const start = page * PAGE_SIZE;
    return courses.slice(start, start + PAGE_SIZE);
  }, [courses, page, showAll]);

  return (
    <section
      id="premium-courses"
      className="section-anchor border-b border-ink/8 bg-[#F7F3EA]"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-20 md:px-6 md:py-24 lg:px-8 lg:py-28">
        <SectionHeader
          title="Paid Courses"
          copy="Live, mentor-led English courses in Islamabad and online, structured lessons, real correction, and a seat
                open when you're ready to join."
        />

        {courses.length === 0 ? (
          <Reveal className="mt-10 sm:mt-14">
            <div className="card-surface rounded-[22px] px-5 py-12 text-center sm:rounded-[28px] sm:px-10 sm:py-14">
              <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0d060]/25 to-[#c9a227]/20 text-[#b8860b]">
                <PremiumIcon className="h-6 w-6" />
              </span>
              <h3 className="font-display mt-5 text-2xl tracking-tight text-ink">
                Courses arriving soon
              </h3>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-ink/60">
                No paid courses are published yet. Browse free playlists below, or ask about enrollment when you visit the lab.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#free-lessons"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-deep"
                >
                  Browse free lessons
                  <ArrowIcon className="h-4 w-4" />
                </a>
                <a
                  href="#location"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-forest/30"
                >
                  Ask about enrollment
                </a>
              </div>
            </div>
          </Reveal>
        ) : (
          <>
            <div className="mt-10 sm:mt-14">
              <ShimmerGate minMs={550} skeleton={<CourseCardsSkeleton />}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={showAll ? "all" : `page-${page}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                <Stagger className="grid grid-cols-2 gap-2.5 sm:gap-5 md:gap-6 lg:grid-cols-3">
                  {visible.map((course, index) => {
                    const theme = getCardTheme(showAll ? index : page * PAGE_SIZE + index);
                    return (
                    <StaggerItem key={course.id} className="h-full min-w-0">
                    <Link
                      href={course.href}
                      style={{ background: theme.background }}
                      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] border transition duration-300 hover:-translate-y-1.5 sm:rounded-[28px] ${theme.border} ${theme.hoverShadow}`}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/20 sm:aspect-video">
                        <Image
                          src={course.thumbnail}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <span
                          className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-[#f0d060] to-[#c9a227] px-1.5 py-0.5 text-[8px] font-semibold tracking-wide text-white shadow-[0_4px_12px_rgba(185,134,11,0.35)] uppercase sm:top-3 sm:left-3 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[11px]"
                          aria-label="Paid course"
                        >
                          <PremiumIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          Paid
                        </span>
                        <span className="absolute right-1.5 bottom-1.5 rounded-full bg-black/65 px-1.5 py-0.5 text-[8px] font-semibold tracking-wide text-white tabular-nums sm:right-3 sm:bottom-3 sm:px-2.5 sm:py-1 sm:text-[11px]">
                          {course.price}
                        </span>
                        <span className="absolute bottom-1.5 left-1.5 max-w-[48%] truncate rounded-full bg-black/65 px-1.5 py-0.5 text-[8px] font-semibold tracking-wide text-white uppercase sm:bottom-3 sm:left-3 sm:max-w-none sm:px-2.5 sm:py-1 sm:text-[11px]">
                          {course.lessons > 0
                            ? `${course.lessons} lessons`
                            : course.duration}
                        </span>
                      </div>

                      <div className="relative flex flex-1 flex-col overflow-hidden p-2.5 sm:p-6">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute top-[18%] -right-[28%] hidden h-[14rem] w-[14rem] rounded-full sm:block sm:h-[16rem] sm:w-[16rem]"
                          style={{
                            border: `1px solid ${theme.ring}`,
                            boxShadow: `0 0 0 1.75rem ${theme.ringSoft}, 0 0 0 3.75rem ${theme.ringFaint}`,
                          }}
                        />
                        <div className="relative z-[1] hidden flex-wrap items-center gap-2 sm:flex">
                          <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${theme.badge}`}>
                            Paid
                          </span>
                        </div>
                        <h3 className={`relative z-[1] font-display text-[0.92rem] leading-snug tracking-[-0.03em] sm:mt-4 sm:text-[1.45rem] sm:leading-tight ${theme.title}`}>
                          {course.title}
                        </h3>
                        <p className={`relative z-[1] mt-1.5 line-clamp-2 flex-1 text-[11px] leading-4 sm:mt-3 sm:line-clamp-3 sm:text-[15px] sm:leading-7 ${theme.blurb}`}>
                          {course.blurb}
                        </p>
                        <p className={`relative z-[1] mt-2 hidden text-[12px] font-medium tracking-wide uppercase sm:mt-4 sm:block ${theme.meta}`}>
                          {course.duration} · Sign in to enroll
                        </p>
                        <span className={`relative z-[1] mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold sm:mt-5 sm:gap-2 sm:text-sm ${theme.cta}`}>
                          View
                          <span className="hidden sm:inline">course</span>
                          <ArrowIcon className="h-3 w-3 transition group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
                        </span>
                      </div>
                    </Link>
                    </StaggerItem>
                    );
                  })}
                </Stagger>
                </motion.div>
              </AnimatePresence>
              </ShimmerGate>
            </div>

            {courses.length > PAGE_SIZE ? (
              <Reveal delay={0.12} className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
                {!showAll ? (
                  <div className="flex items-center gap-2" role="tablist" aria-label="Paid course pages">
                    {Array.from({ length: pageCount }).map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Show page ${index + 1}`}
                        aria-current={page === index ? "true" : undefined}
                        onClick={() => setPage(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          page === index ? "w-9 bg-forest" : "w-2.5 bg-ink/15 hover:bg-ink/35"
                        }`}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-ink/55">Showing all {courses.length} courses</p>
                )}

                <button
                  type="button"
                  onClick={() => setShowAll((value) => !value)}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-forest/30 hover:shadow-sm"
                >
                  {showAll ? "Show less" : "See more"}
                  <ArrowIcon className={`h-4 w-4 ${showAll ? "-rotate-90" : "rotate-90"}`} />
                </button>
              </Reveal>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
