"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { PremiumCourse } from "@/data/premium-courses";
import { ArrowIcon, PremiumIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const PAGE_SIZE = 3;

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
      className="scroll-mt-24 border-b border-ink/8 bg-gradient-to-b from-white via-[#fbfcff] to-cream"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHeader
          kicker="03 — Studio shelf"
          title="Premium courses"
          copy="Mentor-led tracks and live cohorts from English with Mahmood Sarwar — structured lessons, marked work, and enrollment when you are ready."
        />

        {courses.length === 0 ? (
          <Reveal className="mt-14">
            <div className="card-surface rounded-[28px] px-6 py-14 text-center sm:px-10">
              <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0d060]/25 to-[#c9a227]/20 text-[#b8860b]">
                <PremiumIcon className="h-6 w-6" />
              </span>
              <h3 className="font-display mt-5 text-2xl tracking-tight text-ink">
                Courses arriving soon
              </h3>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-ink/60">
                No premium courses are published yet. Browse free playlists below, or ask about enrollment when you visit the lab.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#free-stuff"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-deep"
                >
                  Browse free stuff
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
            <Reveal className="mt-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={showAll ? "all" : `page-${page}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-5 md:grid-cols-3"
                >
                  {visible.map((course) => (
                    <Link
                      key={course.id}
                      href={course.href}
                      className="card-surface group flex flex-col overflow-hidden rounded-[28px] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(185,134,11,0.28)]"
                    >
                      <div className="relative aspect-video overflow-hidden bg-ink/5">
                        <Image
                          src={course.thumbnail}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <span
                          className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#f0d060] to-[#c9a227] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white shadow-[0_4px_12px_rgba(185,134,11,0.35)] uppercase"
                          aria-label="Premium course"
                        >
                          <PremiumIcon className="h-3 w-3" />
                          Premium
                        </span>
                        <span className="absolute right-3 bottom-3 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white tabular-nums">
                          {course.price}
                        </span>
                        <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                          {course.lessons > 0
                            ? `${course.lessons} lessons`
                            : course.duration}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="w-fit rounded-full bg-forest/8 px-3 py-1 text-[11px] font-semibold tracking-wide text-forest uppercase">
                            {course.tag}
                          </span>
                          <span className="w-fit rounded-full bg-[#f5e6b8]/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#8a6a10] uppercase">
                            Paid
                          </span>
                        </div>
                        <h3 className="font-display mt-4 text-[1.45rem] leading-tight text-ink">
                          {course.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-7 text-ink/65">
                          {course.blurb}
                        </p>
                        <p className="mt-4 text-[12px] font-medium tracking-wide text-ink/40 uppercase">
                          {course.duration} · Sign in to enroll
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                          View course
                          <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
            </Reveal>

            {courses.length > PAGE_SIZE ? (
              <Reveal delay={0.12} className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
                {!showAll ? (
                  <div className="flex items-center gap-2" role="tablist" aria-label="Premium course pages">
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
