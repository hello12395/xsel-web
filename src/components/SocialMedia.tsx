"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "motion/react";
import { socials } from "@/data/site";
import {
  ArrowIcon,
  CloseIcon,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  WhatsappIcon,
} from "./Icons";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SocialCardsSkeleton } from "./Shimmer";
import { ShimmerGate } from "./ShimmerGate";

const icons: Record<(typeof socials)[number]["icon"], ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsappIcon,
};

type Social = (typeof socials)[number];

function SocialCard({ social }: { social: Social }) {
  const Icon = icons[social.icon];
  const hasChoices = social.links.length > 1;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const cardClassName =
    "group relative flex h-full min-h-[14.5rem] w-full flex-col overflow-hidden rounded-[20px] border border-[#cfe3d6] bg-white p-5 text-left shadow-[0_12px_32px_-16px_rgba(30,90,50,0.16)] ring-1 ring-white transition duration-300 hover:-translate-y-1 hover:border-[#b5d4c0] hover:shadow-[0_22px_44px_-18px_rgba(30,90,50,0.22)] sm:min-h-[16rem] sm:p-6";

  const cardBody = (
    <>
      <span
        className="pointer-events-none absolute -right-1 -bottom-2 opacity-[0.22] transition duration-500 group-hover:scale-105 group-hover:opacity-[0.32]"
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
        {hasChoices ? "Choose account" : "Follow"}
        <ArrowIcon className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
      </span>
    </>
  );

  if (!hasChoices) {
    return (
      <a
        href={social.links[0].href}
        target="_blank"
        rel="noreferrer"
        className={cardClassName}
      >
        {cardBody}
      </a>
    );
  }

  return (
    <div ref={rootRef} className="relative h-full">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className={cardClassName}
      >
        {cardBody}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            aria-label={`${social.name} accounts`}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-3 bottom-3 z-20 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_18px_40px_-16px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center justify-between border-b border-ink/8 px-3.5 py-2.5">
              <p className="text-xs font-semibold tracking-wide text-ink/55 uppercase">
                Open {social.name}
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/40 transition hover:bg-ink/5 hover:text-ink"
              >
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            </div>
            <ul className="p-1.5">
              {social.links.map((link) => (
                <li key={link.href}>
                  <a
                    role="menuitem"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[#eaf5ee]"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf5ee]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-semibold text-ink">
                      {link.label}
                    </span>
                    <ArrowIcon className="h-3.5 w-3.5 shrink-0 text-ink/35" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

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
                {socials.length} platforms
              </span>
              <span className="rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-wide text-ink/70 shadow-[0_4px_14px_-8px_rgba(30,90,50,0.2)]">
                Always live
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative min-w-0">
            <ShimmerGate minMs={500} skeleton={<SocialCardsSkeleton />}>
              <Stagger className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                {socials.map((social) => (
                  <StaggerItem key={social.name} className="h-full min-w-0">
                    <SocialCard social={social} />
                  </StaggerItem>
                ))}
              </Stagger>
            </ShimmerGate>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
