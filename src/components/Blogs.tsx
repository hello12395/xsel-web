"use client";

import { blogs } from "@/data/site";
import { ArrowIcon } from "./Icons";
import { Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const covers = [
  "bg-gradient-to-br from-gold-soft to-gold text-forest-deep",
  "bg-gradient-to-br from-forest to-forest-deep text-white",
  "bg-gradient-to-br from-mark to-[#c10d18] text-white",
];

export function Blogs() {
  return (
    <section id="blogs" className="scroll-mt-24 border-b border-ink/8 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHeader
          kicker="07 — Field notes"
          title="Blogs"
          copy="Short notes from the bench: drills, grammar traps, and how we teach them. Dummy posts until the journal is live."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {blogs.map((post, index) => (
            <StaggerItem key={post.title}>
              <article className="group overflow-hidden rounded-[28px] border border-ink/8 bg-cream transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgba(28,48,190,0.3)]">
                <div className={`flex h-40 items-end px-6 py-5 ${covers[index]}`}>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-sm text-ink/45">
                    {post.date} · {post.read} read
                  </p>
                  <h3 className="font-display mt-2 text-[1.45rem] leading-snug text-ink">{post.title}</h3>
                  <p className="mt-3 leading-7 text-ink/65">{post.excerpt}</p>
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest"
                  >
                    Read note
                    <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
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
