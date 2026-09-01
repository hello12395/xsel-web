"use client";

import { reviews } from "@/data/site";
import { QuoteIcon, StarIcon } from "./Icons";
import { Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 relative overflow-hidden bg-forest-deep text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(55,204,248,0.18),transparent_42%)]" />
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHeader
          light
          kicker="04 — Voices"
          title="Reviews"
          copy="Dummy notes from learners who sat in the lab, marked the pages, and came back the next week."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <StaggerItem key={review.name}>
              <article className="h-full rounded-[28px] border border-white/10 bg-white/6 p-7 backdrop-blur-sm transition hover:bg-white/10">
                <div className="flex items-center justify-between">
                  <QuoteIcon className="h-8 w-8 text-mark" />
                  <div className="flex gap-0.5 text-gold-soft">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon key={index} className="h-3.5 w-3.5" />
                    ))}
                  </div>
                </div>
                <p className="mt-5 text-[15px] leading-7 text-white/88">&ldquo;{review.quote}&rdquo;</p>
                <div className="mt-7 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft font-display text-sm text-forest-deep">
                    {review.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-white/55">{review.role}</p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
