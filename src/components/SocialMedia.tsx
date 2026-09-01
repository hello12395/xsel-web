"use client";

import { socials } from "@/data/site";
import { ArrowIcon } from "./Icons";
import { Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const accents = ["bg-mark", "bg-forest", "bg-gold", "bg-gold-soft"];

export function SocialMedia() {
  return (
    <section id="social" className="scroll-mt-24 border-b border-ink/8 bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHeader
          kicker="06 — Outside the room"
          title="Social Media"
          copy="Daily prompts, lab clips, and community threads. Dummy links for now — the handles stay."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((social, index) => (
            <StaggerItem key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="card-surface group block h-full rounded-[28px] p-6 transition duration-300 hover:-translate-y-1.5"
              >
                <span className={`mb-8 block h-2 w-10 rounded-full ${accents[index]}`} />
                <p className="text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">
                  {social.stat}
                </p>
                <h3 className="font-display mt-2 text-2xl text-ink">{social.name}</h3>
                <p className="mt-1 text-ink/55">{social.handle}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest">
                  Follow
                  <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
