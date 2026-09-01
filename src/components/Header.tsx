"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BrandLogo } from "./BrandLogo";
import { CloseIcon, MenuIcon } from "./Icons";

const links = [
  { href: "#why", label: "Why the Lab" },
  { href: "#free-stuff", label: "Free Stuff" },
  { href: "#reviews", label: "Reviews" },
  { href: "#discussions", label: "Discussions" },
  { href: "#social", label: "Social" },
  { href: "#blogs", label: "Blogs" },
  { href: "#location", label: "Visit" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-ink/10 bg-white/85 shadow-[0_8px_30px_-18px_rgba(28,48,190,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#hero" className="flex items-center gap-3">
          <BrandLogo size={48} priority className="h-11 w-11 rounded-2xl shadow-sm ring-1 ring-white/20" />
          <span className="leading-tight">
            <span
              className={`block text-[10px] font-semibold uppercase tracking-[0.24em] ${
                scrolled || open ? "text-gold" : "text-gold-soft"
              }`}
            >
              English
            </span>
            <span
              className={`font-display text-[17px] font-semibold ${
                scrolled || open ? "text-ink" : "text-white"
              }`}
            >
              Sarwar Lab
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                scrolled
                  ? "text-ink/60 hover:bg-forest/6 hover:text-forest"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#free-stuff"
            className={`hidden rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-px lg:inline-flex ${
              scrolled
                ? "btn-primary bg-forest text-white hover:bg-forest-deep"
                : "bg-white text-forest-deep hover:bg-gold-soft"
            }`}
          >
            Start free
          </a>
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
              scrolled || open
                ? "border-ink/10 bg-white text-ink"
                : "border-white/30 bg-white/10 text-white"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/8 bg-white/95 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-2.5 text-base text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#free-stuff"
                className="mt-2 rounded-full bg-forest px-4 py-2.5 text-center text-sm font-medium text-white"
                onClick={() => setOpen(false)}
              >
                Start free
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
