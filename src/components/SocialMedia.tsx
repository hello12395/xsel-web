"use client";

import type { ComponentType } from "react";
import { socials } from "@/data/site";
import {
  ArrowIcon,
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "./Icons";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

const icons: ComponentType<{ className?: string }>[] = [
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon,
  WhatsappIcon,
];

export function SocialMedia() {
  return (
    <section
      id="social"
      className="relative scroll-mt-24 overflow-hidden border-b border-ink/8 bg-social-stage"
    >
      <div className="social-stage-glow" aria-hidden />
      <div className="social-stage-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 lg:py-28">
        <div className="grid items-end gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-14">
          <Reveal className="relative z-10 min-w-0">
            <h2 className="font-display text-[2rem] leading-[1.05] tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-[3.4rem]">
              Social Media
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-ink/60 sm:mt-5 sm:text-base sm:leading-7 md:text-lg">
              Daily prompts, lab clips, and community threads — follow the lab
              wherever you already scroll.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
              <span className="rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-wide text-ink/70 shadow-[0_4px_14px_-8px_rgba(30,90,50,0.2)]">
                4 platforms
              </span>
              <span className="rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-wide text-ink/70 shadow-[0_4px_14px_-8px_rgba(30,90,50,0.2)]">
                Always live
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative min-w-0">
            <Stagger className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
              {socials.map((social, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <StaggerItem key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative flex min-h-[11.5rem] flex-col overflow-hidden rounded-[20px] border border-[#cfe3d6] bg-white p-5 shadow-[0_12px_32px_-16px_rgba(30,90,50,0.16)] ring-1 ring-white transition duration-300 hover:-translate-y-1 hover:border-[#b5d4c0] hover:shadow-[0_22px_44px_-18px_rgba(30,90,50,0.22)] sm:p-6"
                    >
                      <span
                        className="pointer-events-none absolute -right-1 -bottom-2 opacity-[0.22] transition duration-500 group-hover:opacity-[0.32] group-hover:scale-105"
                        aria-hidden
                      >
                        <Icon className="h-32 w-32 sm:h-36 sm:w-36" />
                      </span>

                      <span className="relative z-10 flex items-start justify-between gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center">
                          <Icon className="h-8 w-8" />
                        </span>
                        <span className="rounded-full bg-[#eaf5ee] px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-[#1f6b3a] uppercase">
                          {social.stat}
                        </span>
                      </span>

                      <div className="relative z-10 mt-5 flex-1">
                        <h3 className="font-display text-[1.45rem] leading-tight text-ink sm:text-[1.6rem]">
                          {social.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-ink/50">{social.handle}</p>
                      </div>

                      <span className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0a4a5c] transition group-hover:text-[#0a2340]">
                        Follow
                        <ArrowIcon className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                      </span>
                    </a>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
