"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { freeStuff } from "@/data/site";
import { ArrowIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const PAGE_SIZE = 3;

export function FreeStuff() {
  const [page, setPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const pageCount = Math.ceil(freeStuff.length / PAGE_SIZE);

  const visible = useMemo(() => {
    if (showAll) return freeStuff;
    const start = page * PAGE_SIZE;
    return freeStuff.slice(start, start + PAGE_SIZE);
  }, [page, showAll]);

  return (
    <section id="free-stuff" className="scroll-mt-24 border-b border-ink/8 bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHeader
          kicker="03 — Open shelf"
          title="Free Stuff"
          copy="Workbooks, cue cards, and cheat sheets you can use tonight. Dummy copies for now — the real files will live here."
        />

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
              {visible.map((item) => (
                <article
                  key={item.id}
                  className="card-surface group flex flex-col rounded-[28px] p-6 transition duration-300 hover:-translate-y-1"
                >
                  <span className="w-fit rounded-full bg-forest/8 px-3 py-1 text-[11px] font-semibold tracking-wide text-forest uppercase">
                    {item.tag}
                  </span>
                  <h3 className="font-display mt-4 text-[1.55rem] leading-tight text-ink">{item.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-ink/65">{item.body}</p>
                  <button
                    type="button"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest"
                  >
                    Download pack
                    <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </button>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          {!showAll ? (
            <div className="flex items-center gap-2" role="tablist" aria-label="Free stuff pages">
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
            <p className="text-sm text-ink/55">Showing all {freeStuff.length} packs</p>
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
