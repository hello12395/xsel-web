"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { getPlaylistById } from "@/data/playlists";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const ease = [0.22, 1, 0.36, 1] as const;

/** Seven playlists in the rainbow. */
const carouselPlaylistIds = [
  "spoken-english",
  "fog",
  "vocabulary-boost",
  "newspaper",
  "prepositions",
  "css-mpt",
  "fpsc",
] as const;

const CENTER_SLOT = 3;

type BlogSlide = {
  id: string;
  tag: string;
  title: string;
  detail: string;
  highlight: string;
  videoCount: number;
  thumbnail: string;
  href: string;
};

/** Extra copy for the detail panel — one line per playlist. */
const slideHighlights: Record<(typeof carouselPlaylistIds)[number], string> = {
  "spoken-english":
    "Practical phrases, pronunciation cues, and confidence drills you can use in conversation the same week.",
  fog: "Sentence structure, tense logic, and the grammar backbone every competitive exam builds on.",
  "vocabulary-boost":
    "Weekly word lists, collocations, and revision sets tuned for one-paper and CSS-style papers.",
  newspaper:
    "Editorial deconstruction with vocabulary notes, grammar callouts, and Urdu-to-English translation.",
  prepositions:
    "Common traps, fixed phrases, and exam-style MCQs — explained clearly, not memorised blindly.",
  "css-mpt": "Timed mocks, past-paper patterns, and MCQ strategy for the CSS MPT English section.",
  fpsc: "Past paper walkthroughs, one-paper MCQs, and answer techniques for federal job tests.",
};

type CardLayout = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  blur: number;
  opacity: number;
  zIndex: number;
  width: number;
  aspectRatio: string;
};

/** Fixed semicircle slots: slot 3 = selected card on top, 0 & 6 = outer arc ends. */
const arcSlotLayout: Record<number, CardLayout> = {
  0: {
    x: -418,
    y: 132,
    rotate: -48,
    scale: 0.66,
    blur: 11,
    opacity: 0.5,
    zIndex: 1,
    width: 136,
    aspectRatio: "3 / 4",
  },
  1: {
    x: -288,
    y: 62,
    rotate: -30,
    scale: 0.74,
    blur: 8,
    opacity: 0.64,
    zIndex: 2,
    width: 150,
    aspectRatio: "3 / 4",
  },
  2: {
    x: -158,
    y: 18,
    rotate: -14,
    scale: 0.84,
    blur: 5,
    opacity: 0.78,
    zIndex: 3,
    width: 164,
    aspectRatio: "3 / 4",
  },
  3: {
    x: 0,
    y: -102,
    rotate: 0,
    scale: 1,
    blur: 0,
    opacity: 1,
    zIndex: 40,
    width: 200,
    aspectRatio: "3 / 4",
  },
  4: {
    x: 158,
    y: 18,
    rotate: 14,
    scale: 0.84,
    blur: 5,
    opacity: 0.78,
    zIndex: 3,
    width: 164,
    aspectRatio: "3 / 4",
  },
  5: {
    x: 288,
    y: 62,
    rotate: 30,
    scale: 0.74,
    blur: 8,
    opacity: 0.64,
    zIndex: 2,
    width: 150,
    aspectRatio: "3 / 4",
  },
  6: {
    x: 418,
    y: 132,
    rotate: 48,
    scale: 0.66,
    blur: 11,
    opacity: 0.5,
    zIndex: 1,
    width: 136,
    aspectRatio: "3 / 4",
  },
};

function buildSlides(): BlogSlide[] {
  return carouselPlaylistIds
    .map((id) => {
      const playlist = getPlaylistById(id);
      if (!playlist) return null;
      return {
        id: playlist.id,
        tag: playlist.tag,
        title: playlist.title,
        detail: playlist.body,
        highlight: slideHighlights[id],
        videoCount: playlist.videoCount,
        thumbnail: playlist.thumbnail,
        href: playlist.href,
      };
    })
    .filter((slide): slide is BlogSlide => slide !== null);
}

function getArcSlot(index: number, active: number) {
  return index - active + CENTER_SLOT;
}

function getCardLayout(slot: number): CardLayout {
  return arcSlotLayout[slot] ?? arcSlotLayout[CENTER_SLOT];
}

const panelVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 36 : -36,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease,
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -28 : 28,
    transition: { duration: 0.32, ease },
  }),
};

const lineVariants = {
  enter: { opacity: 0, y: 18, filter: "blur(6px)" },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

function BlogDetailPanel({
  slide,
  index,
  count,
  direction,
}: {
  slide: BlogSlide;
  index: number;
  count: number;
  direction: number;
}) {
  return (
    <motion.div
      key={slide.id}
      custom={direction}
      variants={panelVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="blogs-detail-panel w-full"
    >
      <motion.div variants={lineVariants} className="blogs-detail-meta flex items-center justify-between gap-4">
        <span className="blogs-detail-index">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <span className="blogs-detail-tag">
          <span className="blogs-detail-tag-dot" aria-hidden />
          {slide.tag}
        </span>
      </motion.div>

      <motion.h3
        variants={lineVariants}
        className="blogs-detail-title font-display text-left text-[1.65rem] leading-[1.15] tracking-tight sm:text-[1.85rem] lg:text-[2rem]"
      >
        {slide.title}
      </motion.h3>

      <motion.p
        variants={lineVariants}
        className="blogs-detail-body text-left text-[15px] leading-7 sm:text-base sm:leading-8"
      >
        {slide.detail}
      </motion.p>

      <motion.p
        variants={lineVariants}
        className="blogs-detail-highlight text-left text-sm leading-7 sm:text-[15px] sm:leading-8"
      >
        {slide.highlight}
      </motion.p>
    </motion.div>
  );
}

export function Blogs() {
  const slides = useMemo(() => buildSlides(), []);
  const [active, setActive] = useState(3);
  const [direction, setDirection] = useState(0);
  const count = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : index < active ? -1 : 0);
      setActive(Math.max(0, Math.min(count - 1, index)));
    },
    [active, count],
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setActive((current) => Math.min(count - 1, current + 1));
  }, [count]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActive((current) => Math.max(0, current - 1));
  }, []);

  const canGoPrev = active > 0;
  const canGoNext = active < count - 1;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && canGoNext) goNext();
      if (event.key === "ArrowLeft" && canGoPrev) goPrev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canGoNext, canGoPrev, goNext, goPrev]);

  const visibleSlides = useMemo(
    () =>
      slides
        .map((slide, index) => ({
          slide,
          index,
          slot: getArcSlot(index, active),
        }))
        .filter(({ slot }) => slot >= 0 && slot <= 6)
        .sort((a, b) => Math.abs(b.slot - CENTER_SLOT) - Math.abs(a.slot - CENTER_SLOT)),
    [slides, active],
  );

  if (count === 0) return null;

  const current = slides[active];

  return (
    <section id="blogs" className="bg-blogs-section relative scroll-mt-24 overflow-x-clip border-b border-[#d9c4b4]/50">
      <div className="relative mx-auto w-full max-w-[1500px] px-2 pb-20 pt-16 sm:px-4 sm:pb-24 sm:pt-20">
        <h2 className="blogs-heading font-display mb-8 text-left text-3xl tracking-tight lowercase sm:mb-10 sm:text-4xl md:text-5xl">
          blogs
        </h2>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <div className="blogs-stage relative w-full overflow-hidden">
              <div className="blogs-stage-glow pointer-events-none" aria-hidden />

              <div className="blogs-stage-inner relative mx-auto h-[22rem] max-w-[1280px] origin-center scale-[0.48] sm:h-[24rem] sm:scale-[0.58] md:h-[25rem] md:scale-[0.68] lg:h-[26rem] lg:scale-[0.78] xl:h-[27rem] xl:scale-[0.88]">
                {visibleSlides.map(({ slide, index, slot }) => {
                  const layout = getCardLayout(slot);
                  const isActive = slot === CENTER_SLOT;

                  return (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={slide.title}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => {
                        if (isActive) {
                          window.open(slide.href, "_blank", "noopener,noreferrer");
                          return;
                        }
                        goTo(index);
                      }}
                      className={`blogs-stage-card absolute left-1/2 top-[54%] overflow-hidden rounded-[1.25rem] sm:rounded-[1.35rem] ${
                        isActive ? "blogs-stage-card-active" : "blogs-stage-card-idle"
                      }`}
                      style={{
                        width: layout.width,
                        aspectRatio: layout.aspectRatio,
                        zIndex: layout.zIndex,
                        opacity: layout.opacity,
                        filter: layout.blur > 0 ? `blur(${layout.blur}px)` : undefined,
                        transform: `translate(-50%, -50%) translate3d(${layout.x}px, ${layout.y}px, 0) rotate(${layout.rotate}deg) scale(${layout.scale})`,
                        transformOrigin: isActive ? "center center" : "50% 115%",
                        transition:
                          "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease, filter 0.8s ease, width 0.8s ease",
                      }}
                    >
                      <Image
                        src={slide.thumbnail}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 150px, 200px"
                        className="object-cover"
                        priority={isActive}
                      />
                      {!isActive ? <div className="blogs-card-dim absolute inset-0" aria-hidden /> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2.5">
              <button
                type="button"
                aria-label="Previous blog"
                disabled={!canGoPrev}
                onClick={goPrev}
                className="blogs-nav-btn sm:h-10 sm:w-10"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next blog"
                disabled={!canGoNext}
                onClick={goNext}
                className="blogs-nav-btn sm:h-10 sm:w-10"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative flex min-w-0 items-center lg:pl-2 xl:pl-6">
            <AnimatePresence mode="wait" custom={direction}>
              <BlogDetailPanel
                key={current.id}
                slide={current}
                index={active}
                count={count}
                direction={direction}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
