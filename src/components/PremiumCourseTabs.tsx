"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { LearningOutcome, CourseChapterSummary } from "@/types/course";
import { ChevronDownIcon, ClockIcon, StarIcon } from "./Icons";

type TabId = "overview" | "content" | "reviews";

type ReviewItem = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
};

type PremiumCourseTabsProps = {
  description: string;
  outcomes: LearningOutcome[];
  chapters: CourseChapterSummary[];
  duration: string;
  lessons: number;
  students: number;
  formatLabel: string;
  reviews: ReviewItem[];
};

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "content", label: "Content" },
  { id: "reviews", label: "Reviews" },
];

const OUTCOME_TONES = [
  "bg-[#1c30be] text-white",
  "bg-[#e8f6ee] text-[#145a28]",
  "bg-[#eef0fb] text-[#1c30be]",
  "bg-[#e8f7fc] text-[#0a4a5c]",
] as const;

function formatLessonDuration(seconds: number | null | undefined) {
  if (!seconds || seconds <= 0) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M16 11a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 16 11ZM8 12.5A3 3 0 1 0 8 6.5a3 3 0 0 0 0 6ZM3.5 19.5a4.5 4.5 0 0 1 9 0M12.5 19.5a5.5 5.5 0 0 1 8 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3 12h18M12 3c2.8 3 4.2 6 4.2 9s-1.4 6-4.2 9c-2.8-3-4.2-6-4.2-9s1.4-6 4.2-9Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 8.5A2.5 2.5 0 0 1 6 6h3.2l1.6 2H18a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 18 20H6a2.5 2.5 0 0 1-2.5-2.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8 11V8a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 8.8v6.4L16 12 10 8.8Z" fill="currentColor" />
    </svg>
  );
}

export function PremiumCourseTabs({
  description,
  outcomes,
  chapters,
  duration,
  lessons,
  students,
  formatLabel,
  reviews,
}: PremiumCourseTabsProps) {
  const [tab, setTab] = useState<TabId>("overview");
  const [openChapterId, setOpenChapterId] = useState<string | null>(null);

  const sortedChapters = useMemo(() => {
    return [...chapters]
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((chapter) => ({
        ...chapter,
        lessons: [...(chapter.lessons ?? [])].sort(
          (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
        ),
      }));
  }, [chapters]);

  const selectTab = (next: TabId) => {
    setTab(next);
    if (next === "content" && openChapterId === null && sortedChapters[0]) {
      setOpenChapterId(sortedChapters[0].id);
    }
  };

  const totalLessons = useMemo(() => {
    if (lessons > 0) return lessons;
    return sortedChapters.reduce((sum, chapter) => sum + (chapter.lessons?.length ?? 0), 0);
  }, [lessons, sortedChapters]);

  const aboutText = description.trim();
  const showAbout = aboutText.length > 0 && aboutText.toLowerCase() !== "custom";

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return null;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  const ratingLabel =
    averageRating != null ? `${averageRating.toFixed(1)} / 5.0` : "New";

  const stats = [
    { label: "Rating", value: ratingLabel, icon: StarIcon },
    { label: "Duration", value: duration, icon: ClockIcon },
    {
      label: "Students",
      value: students > 0 ? `${students.toLocaleString("en-PK")}+` : "Growing",
      icon: UsersIcon,
    },
    { label: "Language", value: "English", icon: GlobeIcon },
  ] as const;

  return (
    <div className="card-surface overflow-hidden rounded-[24px]">
      <div
        className="grid grid-cols-3 gap-2 border-b border-ink/8 bg-[#f4f7fb] p-2 sm:gap-2.5 sm:p-2.5"
        role="tablist"
        aria-label="Course sections"
      >
        {TABS.map((item) => {
          const active = tab === item.id;
          const tone =
            item.id === "overview"
              ? active
                ? "bg-[#1c30be] text-white shadow-[0_10px_22px_-12px_rgba(28,48,190,0.7)]"
                : "bg-[#e8ecff] text-[#1c30be] hover:bg-[#dce3ff]"
              : item.id === "content"
                ? active
                  ? "bg-[#14804a] text-white shadow-[0_10px_22px_-12px_rgba(20,128,74,0.7)]"
                  : "bg-[#e6f6ec] text-[#14804a] hover:bg-[#d7f0e0]"
                : active
                  ? "bg-[#b42318] text-white shadow-[0_10px_22px_-12px_rgba(180,35,24,0.7)]"
                  : "bg-[#fde8e6] text-[#b42318] hover:bg-[#f9d7d3]";

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectTab(item.id)}
              className={`rounded-xl px-2 py-2.5 text-center text-[13px] font-semibold transition sm:py-3 sm:text-sm ${tone}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="p-5 sm:p-7">
        <AnimatePresence mode="wait">
          {tab === "overview" ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-ink/8 bg-cream/60 px-3.5 py-3.5 sm:px-4 sm:py-4"
                    >
                      <Icon className="h-4 w-4 text-forest" />
                      <p className="mt-2.5 text-sm font-semibold tracking-tight text-ink sm:text-[15px]">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium tracking-wide text-ink/40 uppercase">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {showAbout ? (
                <section>
                  <h3 className="font-display text-xl tracking-tight text-ink sm:text-[1.35rem]">
                    About this course
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 whitespace-pre-line text-ink/65">
                    {aboutText}
                  </p>
                </section>
              ) : null}

              <section>
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <h3 className="font-display text-xl tracking-tight text-ink sm:text-[1.35rem]">
                    What you&apos;ll learn
                  </h3>
                  <p className="text-xs font-medium text-ink/40">{formatLabel}</p>
                </div>

                {outcomes.length > 0 ? (
                  <ul className="mt-4 grid gap-3">
                    {outcomes.map((outcome, index) => (
                      <li
                        key={`${outcome.title}-${index}`}
                        className={`rounded-2xl px-4 py-4 sm:px-5 ${OUTCOME_TONES[index % OUTCOME_TONES.length]}`}
                      >
                        {outcome.title ? (
                          <p className="text-sm font-semibold sm:text-[15px]">{outcome.title}</p>
                        ) : null}
                        {outcome.description ? (
                          <p
                            className={`text-sm leading-6 ${
                              outcome.title ? "mt-1 opacity-85" : ""
                            }`}
                          >
                            {outcome.description}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 rounded-2xl border border-dashed border-ink/12 bg-cream/50 px-4 py-6 text-sm text-ink/50">
                    Learning outcomes will appear here once the curriculum is finalized.
                  </p>
                )}
              </section>
            </motion.div>
          ) : null}

          {tab === "content" ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex items-end justify-between gap-3">
                <h3 className="font-display text-xl tracking-tight text-ink sm:text-[1.35rem]">
                  Course Content
                </h3>
                <p className="text-sm text-ink/45">
                  {sortedChapters.length} chapters · {totalLessons} lessons
                </p>
              </div>

              {sortedChapters.length > 0 ? (
                <div className="mt-5 divide-y divide-ink/8 overflow-hidden rounded-2xl border border-ink/8">
                  {sortedChapters.map((chapter, chapterIndex) => {
                    const open = openChapterId === chapter.id;
                    const lessonCount = chapter.lessons?.length ?? 0;
                    return (
                      <div key={chapter.id} className="bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenChapterId((current) =>
                              current === chapter.id ? null : chapter.id,
                            )
                          }
                          className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-cream/70 sm:px-5"
                          aria-expanded={open}
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest/8 text-forest">
                            <FolderIcon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-ink sm:text-[15px]">
                              Chapter {chapterIndex + 1}
                              {chapter.title ? `: ${chapter.title}` : ""}
                            </span>
                            <span className="mt-0.5 block text-xs text-ink/45">
                              {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
                            </span>
                          </span>
                          <ChevronDownIcon
                            className={`h-4 w-4 shrink-0 text-ink/40 transition ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {open ? (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              className="overflow-hidden border-t border-ink/6 bg-cream/35"
                            >
                              {(chapter.lessons ?? []).map((lesson, lessonIndex) => {
                                const durationLabel = formatLessonDuration(
                                  lesson.duration_seconds,
                                );
                                const typeLabel =
                                  lesson.lesson_type === "quiz"
                                    ? "Quiz"
                                    : lesson.lesson_type === "live"
                                      ? "Live"
                                      : "Video";
                                return (
                                  <li
                                    key={lesson.id}
                                    className="flex items-start gap-3 px-4 py-3.5 sm:px-5"
                                  >
                                    <span className="mt-0.5 text-ink/35">
                                      {lesson.status === "published" ? (
                                        <PlayCircleIcon className="h-4 w-4" />
                                      ) : (
                                        <LockIcon className="h-4 w-4" />
                                      )}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block text-sm font-medium text-ink">
                                        {lesson.title?.trim() ||
                                          `Lesson ${lessonIndex + 1}`}
                                      </span>
                                      <span className="mt-0.5 block text-xs text-ink/45">
                                        {[durationLabel, typeLabel].filter(Boolean).join(" · ")}
                                      </span>
                                    </span>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-5 rounded-2xl border border-dashed border-ink/12 bg-cream/50 px-4 py-8 text-center text-sm text-ink/50">
                  Course content is being prepared. Check back soon.
                </p>
              )}
            </motion.div>
          ) : null}

          {tab === "reviews" ? (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex items-end justify-between gap-3">
                <h3 className="font-display text-xl tracking-tight text-ink sm:text-[1.35rem]">
                  Course Reviews
                </h3>
                <p className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
                  <StarIcon className="h-3.5 w-3.5 text-[#c9a227]" />
                  {averageRating != null ? averageRating.toFixed(1) : "—"}
                  <span className="font-medium text-ink/40">
                    · {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                  </span>
                </p>
              </div>

              {reviews.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {reviews.map((review) => (
                    <li
                      key={review.id}
                      className="rounded-2xl border border-ink/8 bg-cream/50 p-4 sm:p-5"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full"
                          style={
                            review.avatar.includes("default-user")
                              ? { backgroundColor: "#E4E6EB" }
                              : undefined
                          }
                        >
                          <Image
                            src={review.avatar}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-cover"
                            unoptimized={review.avatar.includes("default-user")}
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-ink">
                            {review.name}
                          </span>
                          <span className="block text-xs text-ink/45">{review.role}</span>
                        </span>
                        <span className="flex gap-0.5" aria-label={`${review.rating} out of 5`}>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <StarIcon
                              key={index}
                              className={`h-3 w-3 ${
                                index < review.rating
                                  ? "text-[#c9a227]"
                                  : "text-ink/15"
                              }`}
                            />
                          ))}
                        </span>
                      </div>
                      {review.quote ? (
                        <p className="mt-3 text-sm leading-6 text-ink/65">{review.quote}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 rounded-2xl border border-dashed border-ink/12 bg-cream/50 px-4 py-8 text-center text-sm text-ink/50">
                  No reviews yet for this course.
                </p>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
