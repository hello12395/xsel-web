"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { features } from "@/config/features";
import { location, socials } from "@/data/site";
import { BrandLogo } from "./BrandLogo";
import {
  ArrowIcon,
  CloseIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  ThreadsIcon,
  TiktokIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "./Icons";
import { Stagger, StaggerItem } from "./Reveal";

const exploreLinks = [
  { href: "#why", label: "Why XSEL" },
  { href: "#premium-courses", label: "Paid Courses" },
  { href: "#free-lessons", label: "Free Lessons" },
  { href: "#reviews", label: "Reviews" },
  ...(features.blogs ? [{ href: "#blogs", label: "Blogs" }] : []),
  { href: "#location", label: "Visit the lab" },
];

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsappIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
  threads: ThreadsIcon,
} as const;

type Social = (typeof socials)[number];

const linkClassName =
  "inline-flex w-full items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left text-sm text-white/70 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white sm:w-auto sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:hover:bg-transparent";

function FooterSocialItem({ social }: { social: Social }) {
  const Icon = socialIcons[social.icon];
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

  if (!hasChoices) {
    return (
      <a
        href={social.links[0]?.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/8">
          <Icon className="h-3.5 w-3.5" />
        </span>
        {social.name}
      </a>
    );
  }

  return (
    <div ref={rootRef} className="relative w-full sm:w-auto">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className={linkClassName}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/8">
          <Icon className="h-3.5 w-3.5" />
        </span>
        {social.name}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            aria-label={`Choose ${social.name} account`}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[calc(100%+0.5rem)] left-0 z-30 w-[min(18.5rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/12 bg-[#1a3d35] shadow-[0_20px_44px_-16px_rgba(0,0,0,0.55)] sm:left-auto sm:right-0"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2.5">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#EFAA93] uppercase">
                Choose account
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white/45 transition hover:bg-white/8 hover:text-white"
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
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-white/80 transition hover:bg-white/8 hover:text-white"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-semibold">{link.label}</span>
                    <ArrowIcon className="h-3.5 w-3.5 shrink-0 text-white/35" />
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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#152F29] text-white">
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-5 sm:pt-16 sm:pb-12 lg:px-8">
        <Stagger className="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-[1.45fr_0.7fr_0.85fr_0.75fr] md:gap-8 lg:gap-12">
          <StaggerItem className="col-span-2 max-w-sm md:col-span-1">
            <a href="#hero" className="inline-flex items-center gap-3 transition hover:opacity-90">
              <BrandLogo size={52} className="h-10 w-10 shrink-0 rounded-[11px] sm:h-12 sm:w-12" />
              <span className="min-w-0">
                <span className="font-display block text-base leading-none tracking-tight sm:text-xl">
                  Sarwar English Lab
                  <span className="text-[#EFAA93]">.</span>
                </span>
                <span className="mt-1.5 block text-[10px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                  Learn. Practise. Progress.
                </span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/55 sm:mt-5">
              A better way to understand English, practise with purpose, and move forward with
              confidence.
            </p>
          </StaggerItem>

          <StaggerItem>
            <p className="mb-3.5 text-[10px] font-bold tracking-[0.18em] text-[#EFAA93] uppercase sm:mb-4">
              Explore
            </p>
            <nav aria-label="Footer" className="flex flex-col gap-2.5 sm:gap-3">
              {exploreLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </StaggerItem>

          <StaggerItem>
            <p className="mb-3.5 text-[10px] font-bold tracking-[0.18em] text-[#EFAA93] uppercase sm:mb-4">
              Visit
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/70 sm:gap-3.5">
              <p className="leading-relaxed">
                {location.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <a
                href={`tel:${location.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2.5 transition hover:text-white"
              >
                <PhoneIcon className="h-3.5 w-3.5 shrink-0 text-[#EFAA93]" />
                {location.phone}
              </a>
              <a
                href={`mailto:${location.email}`}
                className="inline-flex items-start gap-2.5 break-all transition hover:text-white"
              >
                <MailIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#EFAA93]" />
                {location.email}
              </a>
            </div>
          </StaggerItem>

          <StaggerItem className="col-span-2 md:col-span-1">
            <p className="mb-3.5 text-[10px] font-bold tracking-[0.18em] text-[#EFAA93] uppercase sm:mb-4">
              Connect
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-col sm:gap-3">
              {socials.map((social) => (
                <FooterSocialItem key={social.name} social={social} />
              ))}
            </div>
          </StaggerItem>
        </Stagger>
      </div>

      <div className="border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-1.5 px-4 py-4 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-5 sm:py-6 lg:px-8">
          <span>© {year} Sarwar English Lab. All rights reserved.</span>
          <span>G-11 Markaz · Islamabad</span>
        </div>
      </div>
    </footer>
  );
}
