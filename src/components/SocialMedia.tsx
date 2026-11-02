"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "motion/react";
import { socials } from "@/data/site";
import {
  ArrowIcon,
  CloseIcon,
  FacebookIcon,
  InstagramIcon,
  ThreadsIcon,
  TiktokIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "./Icons";
import { SocialCardsSkeleton } from "./Shimmer";
import { ShimmerGate } from "./ShimmerGate";

const icons: Record<(typeof socials)[number]["icon"], ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsappIcon,
  youtube: YoutubeIcon,
  threads: ThreadsIcon,
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
  /* Instagram — darker magenta */
  instagram: {
    card: "border border-white/10 bg-[rgba(42,12,29,0.5)] shadow-[0_12px_30px_-16px_rgba(42,12,29,0.4)]",
    badge: "bg-white/12 text-[#F7D6E6]",
    title: "text-white",
    handle: "text-white",
    cta: "text-[#F7B8D4] group-hover:text-white",
    watermark: "opacity-[0.28]",
    menuHover: "hover:bg-[#fdf2f7]",
    menuIconBg: "bg-[#f7d6e6]",
  },
  /* Facebook — darker blue */
  facebook: {
    card: "border border-white/10 bg-[rgba(7,31,59,0.5)] shadow-[0_12px_30px_-16px_rgba(7,31,59,0.4)]",
    badge: "bg-white/12 text-[#D6E6FC]",
    title: "text-white",
    handle: "text-white",
    cta: "text-[#A8C8F5] group-hover:text-white",
    watermark: "opacity-[0.3]",
    menuHover: "hover:bg-[#ebf3fe]",
    menuIconBg: "bg-[#d6e6fc]",
  },
  /* WhatsApp — darker green */
  whatsapp: {
    card: "border border-white/10 bg-[rgba(4,37,28,0.5)] shadow-[0_12px_30px_-16px_rgba(4,37,28,0.4)]",
    badge: "bg-white/12 text-[#C9EFD8]",
    title: "text-white",
    handle: "text-white",
    cta: "text-[#7DDBA8] group-hover:text-white",
    watermark: "opacity-[0.3]",
    menuHover: "hover:bg-[#e8f8ef]",
    menuIconBg: "bg-[#c9efd8]",
  },
  /* TikTok — near black */
  tiktok: {
    card: "border border-white/10 bg-[rgba(8,8,8,0.5)] shadow-[0_12px_30px_-16px_rgba(0,0,0,0.4)]",
    badge: "bg-white/12 text-[#E5E7EB]",
    title: "text-white",
    handle: "text-white",
    cta: "text-[#25F4EE] group-hover:text-white",
    watermark: "opacity-[0.32]",
    menuHover: "hover:bg-[#f3f4f6]",
    menuIconBg: "bg-[#e5e7eb]",
  },
  /* YouTube — darker red */
  youtube: {
    card: "border border-white/10 bg-[rgba(58,9,9,0.5)] shadow-[0_12px_30px_-16px_rgba(58,9,9,0.4)]",
    badge: "bg-white/12 text-[#FCD0D0]",
    title: "text-white",
    handle: "text-white",
    cta: "text-[#FFB4B4] group-hover:text-white",
    watermark: "opacity-[0.3]",
    menuHover: "hover:bg-[#feecec]",
    menuIconBg: "bg-[#fcd0d0]",
  },
  /* Threads — charcoal black */
  threads: {
    card: "border border-white/10 bg-[rgba(11,11,11,0.5)] shadow-[0_12px_30px_-16px_rgba(0,0,0,0.4)]",
    badge: "bg-white/12 text-[#E4E4E4]",
    title: "text-white",
    handle: "text-white",
    cta: "text-white group-hover:text-[#EFAA93]",
    watermark: "opacity-[0.34]",
    menuHover: "hover:bg-[#f0f0f0]",
    menuIconBg: "bg-[#e4e4e4]",
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

  const cardClassName = `group relative flex h-full min-h-[10.75rem] w-full flex-col overflow-hidden rounded-[18px] p-3.5 text-left sm:min-h-[13.5rem] sm:rounded-[22px] sm:p-5 lg:min-h-[12.75rem] lg:p-5 ${open ? "is-open" : ""} ${theme.card}`;

  const cardBody = (
    <>
      <span
        className={`pointer-events-none absolute inset-0 overflow-hidden ${theme.watermark}`}
        aria-hidden
      >
        <Icon className="absolute top-1/2 right-[-28%] h-[118%] w-[118%] -translate-y-1/2 drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]" />
      </span>
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between">
        <div>
          <h3
            className={`font-display text-[1.15rem] leading-tight tracking-[-0.04em] sm:text-[1.4rem] ${theme.title}`}
          >
            {social.name}
          </h3>
          <p className={`mt-1.5 line-clamp-2 text-[12px] leading-5 sm:mt-2 sm:text-[13px] sm:leading-5 ${theme.handle}`}>
            {social.handle}
          </p>
        </div>

        <span
          className={`mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold transition sm:mt-5 sm:gap-2 sm:text-sm ${theme.cta}`}
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
      </div>
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

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-5 sm:py-20 md:px-8 lg:px-12 lg:py-28">
        <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-14 xl:gap-16">
          <div className="relative z-10 min-w-0 lg:pr-2">
            <h2 className="font-display text-[clamp(1.75rem,6.5vw,4.25rem)] leading-[1.08] tracking-[-0.055em] text-heading sm:leading-[1.03]">
              <span className="em-serif italic text-[#EFAA93]">Beyond</span> the
              Classroom
            </h2>
            <p className="mt-3.5 max-w-md text-[14px] leading-[1.7] text-muted sm:mt-5 sm:text-base sm:leading-[1.75]">
              Daily prompts, bite-sized explanations and practical learning tips
              — follow along wherever you already scroll.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
              <span className="rounded-full border border-[#EFAA93]/50 bg-[#EFAA93] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#152F29] shadow-[0_4px_14px_-8px_rgba(184,107,82,0.35)]">
                {socials.length} platforms
              </span>
              <span className="rounded-full border border-[#EFAA93]/50 bg-[#EFAA93] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#152F29] shadow-[0_4px_14px_-8px_rgba(184,107,82,0.35)]">
                Always live
              </span>
            </div>
          </div>

          <div className="relative min-w-0">
            <ShimmerGate minMs={500} skeleton={<SocialCardsSkeleton />}>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5 lg:gap-4">
                {socials.map((social) => (
                  <div key={social.name} className="h-full min-w-0">
                    <SocialCard social={social} />
                  </div>
                ))}
              </div>
            </ShimmerGate>
          </div>
        </div>
      </div>
    </section>
  );
}
