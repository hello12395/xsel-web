"use client";

import { useCallback, useEffect, useState, Fragment } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { reviews } from "@/data/site";
import { StarIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { ReviewPanelSkeleton } from "./Shimmer";
import { ShimmerGate } from "./ShimmerGate";

const ease = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 7000;
/** Facebook-style placeholder avatar background */
const DEFAULT_AVATAR_BG = "#E4E6EB";

function isDefaultAvatar(src: string) {
  return src.includes("default-user");
}

const stats = [
  { value: "2.4k+", label: "Learners" },
  { value: "4.9", label: "Avg. rating" },
  { value: "96%", label: "Return rate" },
] as const;

/** Solid Red, Blue, Yellow, Green — cycles across reviews */
const REVIEW_COLORS = [
  {
    bg: "#e11d2e",
    text: "text-white",
    muted: "text-white/55",
    quote: "text-white",
    star: "text-[#f0d060]",
    badge: "border-white/15 bg-white/10 text-[#f0d060]",
    glow: "rgba(255,255,255,0.28)",
    ring: "ring-white/40",
    selector: "border-red-300/60 bg-[#e11d2e] text-white",
    selectorMuted: "text-white/70",
  },
  {
    bg: "#1c30be",
    text: "text-white",
    muted: "text-white/55",
    quote: "text-white",
    star: "text-[#37ccf8]",
    badge: "border-white/15 bg-white/10 text-[#37ccf8]",
    glow: "rgba(55,204,248,0.35)",
    ring: "ring-[#37ccf8]/50",
    selector: "border-blue-300/60 bg-[#1c30be] text-white",
    selectorMuted: "text-white/70",
  },
  {
    bg: "#f5c518",
    text: "text-ink",
    muted: "text-ink/55",
    quote: "text-ink",
    star: "text-ink",
    badge: "border-ink/15 bg-black/8 text-ink",
    glow: "rgba(0,0,0,0.12)",
    ring: "ring-ink/25",
    selector: "border-amber-400/70 bg-[#f5c518] text-ink",
    selectorMuted: "text-ink/60",
  },
  {
    bg: "#1f7a38",
    text: "text-white",
    muted: "text-white/55",
    quote: "text-white",
    star: "text-[#a7f3c0]",
    badge: "border-white/15 bg-white/10 text-[#a7f3c0]",
    glow: "rgba(167,243,192,0.35)",
    ring: "ring-green-200/50",
    selector: "border-green-300/60 bg-[#1f7a38] text-white",
    selectorMuted: "text-white/70",
  },
] as const;

export function Reviews() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const review = reviews[active];
  const count = reviews.length;
  const color = REVIEW_COLORS[active % REVIEW_COLORS.length];

  const goTo = useCallback(
    (index: number) => {
      setActive((index + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(active + 1);
      if (event.key === "ArrowLeft") goTo(active - 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, goTo]);

  useEffect(() => {
    if (paused || count < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [paused, count, active]);

  return (
    <section id="reviews" className="relative scroll-mt-24 overflow-hidden bg-reviews-section text-ink">
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#37ccf8]/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#02abd5]/35 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20 md:px-10 md:py-28 lg:px-12 lg:py-32">
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:gap-16">
          <Reveal className="reviews-intro-panel min-w-0 text-left">
            <h2 className="font-display text-[2rem] leading-[1.1] tracking-tight text-ink sm:text-[2.35rem] md:text-5xl lg:text-[3rem] xl:text-[3.25rem]">
              What learners say
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-ink/60 sm:mt-5 sm:text-base sm:leading-8">
              Real notes from people who marked pages, spoke in the lab, and came back the next week.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-ink/10 pt-8 sm:mt-10 sm:gap-8 sm:pt-10">
              {stats.map((stat, index) => (
                <Fragment key={stat.label}>
                  {index > 0 ? <div className="reviews-stat-divider hidden sm:block" aria-hidden /> : null}
                  <div className="min-w-0">
                    <p className="font-display text-2xl text-ink sm:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-ink/45 uppercase sm:text-[11px]">
                      {stat.label}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          </Reveal>

          <div
            className="min-w-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setPaused(false);
              }
            }}
          >
            <ShimmerGate minMs={500} skeleton={<ReviewPanelSkeleton />}>
            <Reveal delay={0.08} className="relative">
              <div
                className="pointer-events-none absolute -top-6 right-4 font-display text-[8rem] leading-none text-white/[0.04] select-none sm:text-[10rem]"
                aria-hidden
              >
                &ldquo;
              </div>

              <AnimatePresence mode="wait">
                <motion.article
                  key={review.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease }}
                  style={{ backgroundColor: color.bg }}
                  className="relative overflow-hidden rounded-[22px] border border-black/10 p-5 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.35)] sm:rounded-[32px] sm:p-8 lg:p-9"
                >
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                    <div className="relative mx-auto shrink-0 sm:mx-0">
                      <div
                        className="absolute -inset-5 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${color.glow} 0%, transparent 70%)`,
                        }}
                        aria-hidden
                      />
                      <div
                        className="relative h-20 w-20 overflow-hidden rounded-full border-[3px] border-white/25 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)] sm:h-28 sm:w-28"
                        style={
                          isDefaultAvatar(review.avatar)
                            ? { backgroundColor: DEFAULT_AVATAR_BG }
                            : undefined
                        }
                      >
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          fill
                          sizes="112px"
                          className="object-cover object-center"
                          unoptimized={isDefaultAvatar(review.avatar)}
                          priority
                        />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <StarIcon key={index} className={`h-3.5 w-3.5 ${color.star}`} />
                          ))}
                        </div>
                        <span
                          className={`text-[11px] font-semibold tracking-[0.14em] uppercase ${color.muted}`}
                        >
                          5.0
                        </span>
                      </div>

                      <blockquote
                        className={`font-display mt-3 text-pretty text-lg leading-snug sm:mt-4 sm:text-[1.35rem] lg:text-[1.5rem] ${color.quote}`}
                      >
                        {review.quote}
                      </blockquote>

                      <footer className="mt-5 flex flex-col items-center gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <cite className="not-italic">
                            <span className={`text-base font-semibold ${color.text}`}>
                              {review.name}
                            </span>
                          </cite>
                          <p className={`mt-0.5 text-sm ${color.muted}`}>{review.role}</p>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase ${color.badge}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          Verified learner
                        </span>
                      </footer>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </Reveal>

            <Reveal delay={0.14} className="mt-5">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5" role="tablist" aria-label="Select a review">
                {reviews.map((item, index) => {
                  const isActive = index === active;
                  const itemColor = REVIEW_COLORS[index % REVIEW_COLORS.length];
                  return (
                    <button
                      key={item.name}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Review from ${item.name}`}
                      onClick={() => setActive(index)}
                      style={isActive ? { backgroundColor: itemColor.bg } : undefined}
                      className={`group flex min-w-0 items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition-all duration-300 sm:gap-3 sm:px-3.5 sm:py-3 ${
                        isActive
                          ? itemColor.selector
                          : "border-ink/8 bg-white/70 hover:border-ink/14 hover:bg-white"
                      }`}
                    >
                      <span
                        className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-full transition sm:h-10 sm:w-10 ${
                          isActive ? `ring-2 ${itemColor.ring} ring-offset-2 ring-offset-transparent` : ""
                        }`}
                        style={
                          isDefaultAvatar(item.avatar)
                            ? { backgroundColor: DEFAULT_AVATAR_BG }
                            : undefined
                        }
                      >
                        <Image
                          src={item.avatar}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover object-center"
                          unoptimized={isDefaultAvatar(item.avatar)}
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-sm font-semibold transition ${
                            isActive ? itemColor.text : "text-ink/70 group-hover:text-ink"
                          }`}
                        >
                          {item.name.split(" ")[0]}
                        </span>
                        <span
                          className={`block truncate text-xs ${
                            isActive ? itemColor.selectorMuted : "text-ink/45"
                          }`}
                        >
                          {item.role}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 sm:justify-end">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to review ${index + 1}`}
                    aria-current={index === active ? "true" : undefined}
                    onClick={() => setActive(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === active ? "w-7 bg-gold" : "w-1.5 bg-ink/15 hover:bg-ink/30"
                    }`}
                  />
                ))}
              </div>
            </Reveal>
            </ShimmerGate>
          </div>
        </div>
      </div>
    </section>
  );
}
