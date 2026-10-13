"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { PremiumCourse } from "@/data/premium-courses";
import { ArrowIcon, PremiumIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { CourseCardsSkeleton } from "./Shimmer";
import { ShimmerGate } from "./ShimmerGate";

const PAGE_SIZE = 3;

/** Dark professional gradients from the Xsel logo palette (navy, green, red, cyan). */
const CARD_THEMES = [
  {
    // Dark blue — true navy (no purple cast)
    background:
      "linear-gradient(155deg, #0c4a66 0%, #0a2340 48%, #020b18 100%)",
    hoverShadow: "hover:shadow-[0_28px_52px_-18px_rgba(10,35,64,0.65)]",
  },
  {
    // Green — logo "s" / "l" (#449c09)
    background:
      "linear-gradient(155deg, #449c09 0%, #2d7006 48%, #1a4504 100%)",
    hoverShadow: "hover:shadow-[0_28px_52px_-18px_rgba(68,156,9,0.55)]",
  },
  {
    // Red — logo "e"
    background:
      "linear-gradient(155deg, #a01a22 0%, #6b1218 48%, #3d0a0e 100%)",
    hoverShadow: "hover:shadow-[0_28px_52px_-18px_rgba(107,18,24,0.6)]",
  },
  {
    // Cyan — logo pencil / splash
    background:
      "linear-gradient(155deg, #0d6f88 0%, #0a4a5c 48%, #06303c 100%)",
    hoverShadow: "hover:shadow-[0_28px_52px_-18px_rgba(10,74,92,0.6)]",
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
      className="scroll-mt-24 border-b border-ink/8 bg-gradient-to-br from-[#eef8e0] via-[#c5e890] to-[#449c09]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 md:py-28 lg:px-8">
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
            <Reveal className="mt-10 sm:mt-14">
              <ShimmerGate minMs={550} skeleton={<CourseCardsSkeleton />}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={showAll ? "all" : `page-${page}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
                >
                  {visible.map((course, index) => {
                    const theme = getCardTheme(showAll ? index : page * PAGE_SIZE + index);
                    return (
                    <Link
                      key={course.id}
                      href={course.href}
                      style={{ background: theme.background }}
                      className={`group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-white/10 transition duration-300 hover:-translate-y-1.5 sm:rounded-[28px] ${theme.hoverShadow}`}
                    >
                      <div className="relative aspect-video overflow-hidden bg-black/20">
                        <Image
                          src={course.thumbnail}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <span
                          className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#f0d060] to-[#c9a227] px-2 py-1 text-[10px] font-semibold tracking-wide text-white shadow-[0_4px_12px_rgba(185,134,11,0.35)] uppercase sm:top-3 sm:left-3 sm:px-2.5 sm:text-[11px]"
                          aria-label="Paid course"
                        >
                          <PremiumIcon className="h-3 w-3" />
                          Paid
                        </span>
                        <span className="absolute right-2.5 bottom-2.5 rounded-full bg-black/65 px-2 py-1 text-[10px] font-semibold tracking-wide text-white tabular-nums sm:right-3 sm:bottom-3 sm:px-2.5 sm:text-[11px]">
                          {course.price}
                        </span>
                        <span className="absolute bottom-2.5 left-2.5 max-w-[45%] truncate rounded-full bg-black/65 px-2 py-1 text-[10px] font-semibold tracking-wide text-white uppercase sm:bottom-3 sm:left-3 sm:max-w-none sm:px-2.5 sm:text-[11px]">
                          {course.lessons > 0
                            ? `${course.lessons} lessons`
                            : course.duration}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-4 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="w-fit rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase sm:px-3 sm:text-[11px]">
                            Paid
                          </span>
                        </div>
                        <h3 className="font-display mt-3 text-[1.25rem] leading-tight text-white sm:mt-4 sm:text-[1.45rem]">
                          {course.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-white/70 sm:mt-3 sm:text-[15px] sm:leading-7">
                          {course.blurb}
                        </p>
                        <p className="mt-3 text-[11px] font-medium tracking-wide text-white/45 uppercase sm:mt-4 sm:text-[12px]">
                          {course.duration} · Sign in to enroll
                        </p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#37ccf8] sm:mt-5">
                          View course
                          <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
              </ShimmerGate>
            </Reveal>

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
