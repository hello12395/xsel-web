"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { playlists } from "@/data/playlists";
import { ArrowIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const PAGE_SIZE = 3;

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
    <section id="free-stuff" className="scroll-mt-24 border-b border-ink/8 bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 md:py-28 lg:px-8">
        <SectionHeader
          kicker="04 — Open shelf"
          title="Free Stuff"
          copy="Free YouTube playlists from English with Mahmood Sarwar — grammar, exams, speaking, vocabulary, and more. Watch anytime, no sign-up."
        />

        <Reveal className="mt-10 sm:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={showAll ? "all" : `page-${page}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
            >
              {visible.map((playlist) => (
                <Link
                  key={playlist.id}
                  href={`/playlists/${playlist.id}`}
                  className="card-surface group flex min-w-0 flex-col overflow-hidden rounded-[22px] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(28,48,190,0.28)] sm:rounded-[28px]"
                >
                  <div className="relative aspect-video overflow-hidden bg-ink/5">
                    <Image
                      src={playlist.thumbnail}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-forest shadow-lg">
                        <PlayIcon className="ml-0.5 h-5 w-5" />
                      </span>
                    </div>
                    <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/65 px-2 py-1 text-[10px] font-semibold tracking-wide text-white uppercase sm:bottom-3 sm:left-3 sm:px-2.5 sm:text-[11px]">
                      {playlist.isCourse ? `${playlist.videoCount} lessons` : `${playlist.videoCount} videos`}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <span className="w-fit rounded-full bg-forest/8 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-forest uppercase sm:px-3 sm:text-[11px]">
                      {playlist.tag}
                    </span>
                    <h3 className="font-display mt-3 text-[1.25rem] leading-tight text-ink sm:mt-4 sm:text-[1.45rem]">{playlist.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-ink/65 sm:mt-3 sm:text-[15px] sm:leading-7">{playlist.body}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest sm:mt-6">
                      View course
                      <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </Reveal>

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
