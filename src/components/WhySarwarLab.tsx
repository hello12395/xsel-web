"use client";

import { whyCards } from "@/data/site";
import { Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function WhySarwarLab() {
  return (
    <section id="why" className="scroll-mt-24 border-b border-ink/8 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHeader
          kicker="02 — The method"
          title="Why Sarwar Lab?"
          copy="Because English is not a subject you watch. It is a lab you walk into, speak in, and leave with work in your hands."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {whyCards.map((card) => (
            <StaggerItem key={card.number}>
              <article className="group relative h-full overflow-hidden rounded-[28px] border border-ink/8 bg-cream p-7 transition duration-300 hover:-translate-y-1.5 hover:border-forest/20 hover:bg-white hover:shadow-[0_28px_50px_-28px_rgba(28,48,190,0.35)]">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-mark via-forest to-gold-soft opacity-0 transition group-hover:opacity-100" />
                <span className="font-display text-3xl text-mark">{card.number}</span>
                <h3 className="font-display mt-6 text-[1.65rem] leading-tight text-ink">{card.title}</h3>
                <p className="mt-3 leading-7 text-ink/65">{card.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
