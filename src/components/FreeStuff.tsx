"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { playlists } from "@/data/playlists";
import { ArrowIcon } from "./Icons";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { CourseCardsSkeleton } from "./Shimmer";
import { ShimmerGate } from "./ShimmerGate";

const PAGE_SIZE = 3;

const LABEL_COLORS = [
  { bg: "#152F29", text: "#ffffff" },
  { bg: "#EFAA93", text: "#152F29" },
  { bg: "#1D6B56", text: "#ffffff" },
  { bg: "#214F42", text: "#ffffff" },
] as const;

const CARD_THEMES = [
  {
    background: "#214F42",
    hoverShadow: "hover:shadow-[0_28px_52px_-18px_rgba(33,79,66,0.55)]",
    border: "border-white/10",
    title: "text-white",
    blurb: "text-[#E8F0E4]",
    cta: "text-[#F7DFC7]",
    ring: "rgba(255,255,255,0.16)",
    ringSoft: "rgba(255,255,255,0.08)",
    ringFaint: "rgba(255,255,255,0.04)",
  },
  {
    background: "#C2D7BA",
    hoverShadow: "hover:shadow-[0_28px_52px_-18px_rgba(194,215,186,0.65)]",
    border: "border-[#152F29]/12",
    title: "text-[#152F29]",
    blurb: "text-[#1c3530]",
    cta: "text-[#152F29]",
    ring: "rgba(255,255,255,0.45)",
    ringSoft: "rgba(255,255,255,0.28)",
    ringFaint: "rgba(255,255,255,0.14)",
  },
  {
    background: "#DF937F",
    hoverShadow: "hover:shadow-[0_28px_52px_-18px_rgba(223,147,127,0.55)]",
    border: "border-[#152F29]/12",
    title: "text-[#152F29]",
    blurb: "text-[#1c3530]",
    cta: "text-[#152F29]",
    ring: "rgba(255,255,255,0.42)",
    ringSoft: "rgba(255,255,255,0.24)",
    ringFaint: "rgba(255,255,255,0.12)",
  },
] as const;

function getCardTheme(index: number) {
  return CARD_THEMES[index % CARD_THEMES.length];
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

export function FreeStuff() {
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const pageCount = Math.ceil(playlists.length / PAGE_SIZE);

  const visible = useMemo(() => {
    if (showAll) return playlists;
    const start = page * PAGE_SIZE;
    return playlists.slice(start, start + PAGE_SIZE);
  }, [page, showAll]);

  return (
    <section
      id="free-lessons"
      className="section-anchor border-b border-ink/8 bg-[#FFFCF6]"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-20 md:px-6 md:py-24 lg:px-8 lg:py-28">
        <SectionHeader
          title="Free Lessons"
          copy="Free YouTube playlists — grammar, exams preparation, speaking, vocabulary, and more. Watch anytime, no sign-up."
        />

        <div className="mt-10 sm:mt-14">
          <ShimmerGate
            minMs={500}
            skeleton={<CourseCardsSkeleton tones={["red", "yellow", "blue"]} />}
          >
          <AnimatePresence mode="wait">
            <motion.div
              key={showAll ? "all" : `page-${page}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
            <Stagger className="grid grid-cols-2 gap-2.5 sm:gap-5 md:gap-6 lg:grid-cols-3">
              {visible.map((playlist, index) => {
                const absoluteIndex = playlists.findIndex((item) => item.id === playlist.id);
                const themeIndex = showAll
                  ? index
                  : absoluteIndex >= 0
                    ? absoluteIndex
                    : page * PAGE_SIZE + index;
                const theme = getCardTheme(themeIndex);
                const label =
                  LABEL_COLORS[(absoluteIndex >= 0 ? absoluteIndex : 0) % LABEL_COLORS.length];
                return (
                  <StaggerItem key={playlist.id} className="h-full min-w-0">
                  <Link
                    href={`/playlists/${playlist.id}`}
                    style={{ background: theme.background }}
                    className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] border transition duration-300 hover:-translate-y-1.5 sm:rounded-[28px] ${theme.border} ${theme.hoverShadow}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/20 sm:aspect-video">
                      <Image
                        src={playlist.thumbnail}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      <div className="absolute inset-0 hidden items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100 sm:flex">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg">
                          <PlayIcon className="ml-0.5 h-5 w-5" />
                        </span>
                      </div>
                      <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/65 px-1.5 py-0.5 text-[8px] font-semibold tracking-wide text-white uppercase sm:bottom-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-[11px]">
                        {playlist.isCourse
                          ? `${playlist.videoCount} lessons`
                          : `${playlist.videoCount} videos`}
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
                      <span
                        style={{ backgroundColor: label.bg, color: label.text }}
                        className="relative z-[1] w-fit rounded-full px-1.5 py-0.5 text-[8px] font-semibold tracking-wide uppercase sm:px-3 sm:py-1 sm:text-[11px]"
                      >
                        {playlist.tag}
                      </span>
                      <h3 className={`relative z-[1] font-display mt-1.5 text-[0.92rem] leading-snug tracking-[-0.03em] sm:mt-4 sm:text-[1.45rem] sm:leading-tight ${theme.title}`}>
                        {playlist.title}
                      </h3>
                      <p className={`relative z-[1] mt-1.5 line-clamp-2 flex-1 text-[11px] leading-4 sm:mt-3 sm:line-clamp-3 sm:text-[15px] sm:leading-7 ${theme.blurb}`}>
                        {playlist.body}
                      </p>
                      <span className={`relative z-[1] mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold sm:mt-6 sm:gap-2 sm:text-sm ${theme.cta}`}>
                        <span className="sm:hidden">View</span>
                        <span className="hidden sm:inline">
                          {playlist.isCourse ? "View course" : "View playlist"}
                        </span>
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

        <Reveal delay={0.12} className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          {!showAll ? (
            <div className="flex items-center gap-2" role="tablist" aria-label="Playlist pages">
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
            <p className="text-sm text-ink/55">Showing all {playlists.length} playlists</p>
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
      </div>
    </section>
  );
}
