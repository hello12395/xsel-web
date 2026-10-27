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

const themes: Record<
  (typeof socials)[number]["icon"],
  {
    card: string;
    badge: string;
    title: string;
    handle: string;
    cta: string;
    watermark: string;
    menuHover: string;
    menuIconBg: string;
  }
> = {
  /* Soft warm tile — sits cleanly on cream */
  instagram: {
    card: "border border-[#e6e6d9] bg-[#FFFEF9] shadow-[0_10px_28px_-18px_rgba(21,47,41,0.18)] hover:border-[#d9d9cc] hover:shadow-[0_16px_34px_-16px_rgba(21,47,41,0.22)]",
    badge: "bg-[#f7dfc7] text-[#5c4033]",
    title: "text-heading",
    handle: "text-muted",
    cta: "text-[#1d6b56] group-hover:text-[#152F29]",
    watermark: "text-[#152F29]/[0.06]",
    menuHover: "hover:bg-[#fff6ef]",
    menuIconBg: "bg-[#f7dfc7]",
  },
  /* Soft sage tile */
  facebook: {
    card: "border border-[#e6e6d9] bg-[#F3F7F0] shadow-[0_10px_28px_-18px_rgba(21,47,41,0.18)] hover:border-[#d9d9cc] hover:shadow-[0_16px_34px_-16px_rgba(21,47,41,0.22)]",
    badge: "bg-[#d7e5d3] text-[#214F42]",
    title: "text-heading",
    handle: "text-muted",
    cta: "text-[#1d6b56] group-hover:text-[#152F29]",
    watermark: "text-[#152F29]/[0.06]",
    menuHover: "hover:bg-[#eaf1e6]",
    menuIconBg: "bg-[#d7e5d3]",
  },
  /* Deep brand green */
  whatsapp: {
    card: "border border-[#214F42]/20 bg-[#214F42] shadow-[0_12px_30px_-16px_rgba(33,79,66,0.45)] hover:shadow-[0_18px_36px_-14px_rgba(33,79,66,0.55)]",
    badge: "bg-white/12 text-[#E8F0E4]",
    title: "text-white",
    handle: "text-white/60",
    cta: "text-[#C2D7BA] group-hover:text-white",
    watermark: "text-white/[0.08]",
    menuHover: "hover:bg-[#eaf1e6]",
    menuIconBg: "bg-[#eaf1e6]",
  },
  /* Primary dark green */
  tiktok: {
    card: "border border-[#152F29]/20 bg-[#152F29] shadow-[0_12px_30px_-16px_rgba(21,47,41,0.45)] hover:shadow-[0_18px_36px_-14px_rgba(21,47,41,0.55)]",
    badge: "bg-white/12 text-[#E8F0E4]",
    title: "text-white",
    handle: "text-white/60",
    cta: "text-[#DF937F] group-hover:text-white",
    watermark: "text-white/[0.08]",
    menuHover: "hover:bg-[#f5f0ea]",
    menuIconBg: "bg-[#f5f0ea]",
  },
};

type Social = (typeof socials)[number];

function SocialCard({ social }: { social: Social }) {
  const Icon = icons[social.icon];
  const theme = themes[social.icon];
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

  const cardClassName = `group relative flex h-full min-h-[11.5rem] w-full flex-col overflow-hidden rounded-[18px] p-3.5 text-left transition duration-300 hover:-translate-y-1 sm:min-h-[15.5rem] sm:rounded-[22px] sm:p-6 ${theme.card}`;

  const cardBody = (
    <>
      <span
        className={`pointer-events-none absolute -right-2 -bottom-3 transition duration-500 group-hover:scale-105 ${theme.watermark}`}
        aria-hidden
      >
        <Icon className="h-24 w-24 sm:h-36 sm:w-36" />
      </span>

      <span className="relative z-10 flex items-start justify-between gap-2 sm:gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 shadow-[0_4px_14px_-8px_rgba(21,47,41,0.25)] ring-1 ring-[#152F29]/6 sm:h-11 sm:w-11 sm:rounded-2xl">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[9px] font-bold tracking-[0.1em] uppercase sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.12em] ${theme.badge}`}
        >
          {social.stat}
        </span>
      </span>

      <div className="relative z-10 mt-3.5 flex-1 sm:mt-5">
        <h3
          className={`font-display text-[1.15rem] leading-tight tracking-[-0.04em] sm:text-[1.6rem] ${theme.title}`}
        >
          {social.name}
        </h3>
        <p className={`mt-1 line-clamp-2 text-[12px] leading-5 sm:mt-1.5 sm:text-sm sm:leading-6 ${theme.handle}`}>{social.handle}</p>
      </div>

      <span
        className={`relative z-10 mt-3.5 inline-flex items-center gap-1.5 text-[12px] font-semibold transition sm:mt-5 sm:gap-2 sm:text-sm ${theme.cta}`}
      >
        {hasChoices ? (
          <>
            <span className="sm:hidden">Choose</span>
            <span className="hidden sm:inline">Choose account</span>
          </>
        ) : (
          "Follow"
        )}
        <ArrowIcon className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
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
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${theme.menuHover}`}
                  >
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${theme.menuIconBg}`}
                    >
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
      className="relative section-anchor overflow-hidden border-b border-ink/8 bg-social-stage"
    >
      <div className="social-stage-glow" aria-hidden />
      <div className="social-stage-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-20 lg:py-28">
        <div className="grid items-end gap-7 sm:gap-10 md:gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-14">
          <Reveal className="relative z-10 min-w-0">
            <h2 className="font-display text-[clamp(1.75rem,7vw,4.625rem)] leading-[1.08] tracking-[-0.055em] text-heading sm:leading-[1.03]">
              Social Media
            </h2>
            <p className="mt-3.5 max-w-md text-[14px] leading-[1.7] text-muted sm:mt-5 sm:text-base sm:leading-[1.75] md:text-lg">
              Daily prompts, lab clips, and community threads — follow the lab
              wherever you already scroll.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
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
              <Stagger className="grid grid-cols-2 gap-2.5 sm:gap-4">
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
