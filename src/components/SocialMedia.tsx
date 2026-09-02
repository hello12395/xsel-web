"use client";

import type { CSSProperties, ComponentType } from "react";
import { socials } from "@/data/site";
import {
  ArrowIcon,
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "./Icons";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

const slabs: {
  accent: string;
  edge: string;
  tilt: string;
  floatDelay: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { accent: "#F5E6D8", edge: "#9a5238", tilt: "-7deg", floatDelay: "0s", Icon: InstagramIcon },
  { accent: "#E8F4FF", edge: "#8f4a32", tilt: "5deg", floatDelay: "0.35s", Icon: YoutubeIcon },
  { accent: "#FFF1D6", edge: "#a4583a", tilt: "-4deg", floatDelay: "0.7s", Icon: FacebookIcon },
  { accent: "#EAF8F2", edge: "#944f35", tilt: "6deg", floatDelay: "1.05s", Icon: WhatsappIcon },
];

export function SocialMedia() {
  return (
    <section id="social" className="relative scroll-mt-24 overflow-hidden border-b border-black/10 bg-social-stage">
      <div className="social-stage-glow" aria-hidden />
      <div className="social-stage-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24 lg:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-14">
          <Reveal className="relative z-10">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-[#F5E6D8]/80 uppercase">
              06 — Outside the room
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-[#FFF8F1] sm:text-5xl lg:text-[3.4rem]">
              Social Media
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[#FFF8F1]/72 sm:text-lg">
              Daily prompts, lab clips, and community threads — follow the lab wherever you already scroll.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#FFF8F1]/25 bg-[#FFF8F1]/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#FFF8F1]/90 backdrop-blur-sm">
                4 platforms
              </span>
              <span className="rounded-full border border-[#FFF8F1]/25 bg-[#FFF8F1]/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#FFF8F1]/90 backdrop-blur-sm">
                Always live
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="social-slab-scene relative">
            <div className="social-slab-floor" aria-hidden />
            <Stagger className="relative grid gap-5 sm:grid-cols-2 sm:gap-6">
              {socials.map((social, index) => {
                const slab = slabs[index % slabs.length];
                const Icon = slab.Icon;
                return (
                  <StaggerItem key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="social-slab group block"
                      style={
                        {
                          "--slab-tilt": slab.tilt,
                          "--slab-edge": slab.edge,
                          "--float-delay": slab.floatDelay,
                        } as CSSProperties
                      }
                    >
                      <span className="social-slab-shadow" aria-hidden />
                      <span
                        className="social-slab-thickness"
                        style={{ background: slab.edge }}
                        aria-hidden
                      />
                      <span
                        className="social-slab-face overflow-hidden"
                        style={{ background: `linear-gradient(165deg, #ffffff 0%, ${slab.accent} 100%)` }}
                      >
                        <span
                          className="pointer-events-none absolute -right-3 -bottom-4 opacity-[0.18] transition duration-500 group-hover:opacity-[0.28] group-hover:scale-105"
                          aria-hidden
                        >
                          <Icon className="h-28 w-28 sm:h-32 sm:w-32" />
                        </span>

                        <span className="relative z-10 flex items-start justify-between gap-3">
                          <span className="font-display text-[2.4rem] leading-none text-[#BF6D4D]/25">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="rounded-full bg-[#BF6D4D]/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-[#BF6D4D] uppercase">
                            {social.stat}
                          </span>
                        </span>
                        <div className="relative z-10 mt-5">
                          <h3 className="font-display text-[1.55rem] text-ink sm:text-[1.7rem]">
                            {social.name}
                          </h3>
                          <p className="mt-1.5 text-sm text-ink/50">{social.handle}</p>
                        </div>
                        <span className="relative z-10 mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#BF6D4D]">
                          Follow
                          <ArrowIcon className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                        </span>
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
