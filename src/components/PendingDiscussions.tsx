"use client";

import { discussions } from "@/data/site";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function PendingDiscussions() {
  return (
    <section id="discussions" className="scroll-mt-24 border-b border-ink/8 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHeader
          kicker="05 — Open floor"
          title="Pending Discussions"
          copy="Threads waiting for another voice. Dummy topics for now — join in when the board goes live."
        />

        <Stagger className="mt-14 space-y-4" delay={0.1}>
          {discussions.map((thread) => (
            <StaggerItem key={thread.title}>
              <article className="grid gap-5 rounded-[28px] border border-ink/8 bg-cream/80 p-6 transition duration-300 hover:border-forest/20 hover:bg-white hover:shadow-[0_20px_40px_-28px_rgba(28,48,190,0.3)] md:grid-cols-[1fr_auto] md:items-center md:p-7">
                <div>
                  <h3 className="font-display text-[1.45rem] leading-snug text-ink">{thread.title}</h3>
                  <p className="mt-2 max-w-3xl leading-7 text-ink/65">{thread.excerpt}</p>
                  <p className="mt-3 text-sm text-ink/45">
                    Started by {thread.author} · {thread.time}
                  </p>
                </div>
                <div className="flex items-center gap-4 md:flex-col md:items-end">
                  <span className="rounded-full bg-forest/8 px-4 py-2 text-sm font-semibold text-forest">
                    {thread.replies} replies
                  </span>
                  <button
                    type="button"
                    className="text-sm font-semibold text-forest underline-offset-4 hover:underline"
                  >
                    Join thread
                  </button>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
