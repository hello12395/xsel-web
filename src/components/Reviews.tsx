"use client";

import { useCallback, useEffect, useState, Fragment } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { reviews } from "@/data/site";
import { StarIcon } from "./Icons";
import { Reveal } from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 3500;

const stats = [
  { value: "2.4k+", label: "Learners" },
  { value: "4.9", label: "Avg. rating" },
  { value: "96%", label: "Return rate" },
] as const;

export function Reviews() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const review = reviews[active];
  const count = reviews.length;

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
    <section id="reviews" className="relative scroll-mt-24 overflow-hidden bg-reviews-section text-white">
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-mark/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gold-soft/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-28 lg:px-12 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:gap-16">
          <Reveal className="reviews-intro-panel text-left">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-soft uppercase">04 — Voices</p>
            <h2 className="font-display mt-4 text-[2.35rem] leading-[1.1] tracking-tight sm:text-5xl lg:text-[3rem] xl:text-[3.25rem]">
              What learners say
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-white/60 sm:text-base sm:leading-8">
              Real notes from people who marked pages, spoke in the lab, and came back the next week.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-10 sm:gap-8">
              {stats.map((stat, index) => (
                <Fragment key={stat.label}>
                  {index > 0 ? <div className="reviews-stat-divider hidden sm:block" aria-hidden /> : null}
                  <div>
                    <p className="font-display text-2xl text-white sm:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-white/45 uppercase sm:text-[11px]">
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
                  className="reviews-spotlight relative overflow-hidden rounded-[28px] p-6 sm:rounded-[32px] sm:p-8 lg:p-9"
                >
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
                    <div className="relative mx-auto shrink-0 sm:mx-0">
                      <div className="reviews-avatar-glow absolute -inset-5 rounded-full" aria-hidden />
                      <div className="relative h-24 w-24 overflow-hidden rounded-full border-[3px] border-white/20 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)] sm:h-28 sm:w-28">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          fill
                          sizes="112px"
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <StarIcon key={index} className="h-3.5 w-3.5 text-gold-soft" />
                          ))}
                        </div>
                        <span className="text-[11px] font-semibold tracking-[0.14em] text-white/40 uppercase">
                          5.0
                        </span>
                      </div>

                      <blockquote className="font-display mt-4 text-pretty text-xl leading-snug text-white sm:text-[1.35rem] lg:text-[1.5rem]">
                        {review.quote}
                      </blockquote>

                      <footer className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <cite className="not-italic">
                            <span className="text-base font-semibold text-white">{review.name}</span>
                          </cite>
                          <p className="mt-0.5 text-sm text-white/50">{review.role}</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-gold-soft uppercase">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-soft" />
                          Verified learner
                        </span>
                      </footer>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </Reveal>

            <Reveal delay={0.14} className="mt-5">
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3" role="tablist" aria-label="Select a review">
                {reviews.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Review from ${item.name}`}
                      onClick={() => setActive(index)}
                      className={`group flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all duration-300 ${
                        isActive
                          ? "reviews-selector-active border-gold-soft/35"
                          : "border-white/8 bg-white/[0.03] hover:border-white/14 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span
                        className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-full transition ${
                          isActive ? "ring-2 ring-gold-soft/50 ring-offset-2 ring-offset-[#2a3688]" : ""
                        }`}
                      >
                        <Image src={item.avatar} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-sm font-semibold transition ${
                            isActive ? "text-white" : "text-white/75 group-hover:text-white"
                          }`}
                        >
                          {item.name.split(" ")[0]}
                        </span>
                        <span className="block truncate text-xs text-white/45">{item.role}</span>
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
                      index === active ? "w-7 bg-gold-soft" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
