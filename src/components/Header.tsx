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
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-ink/8 bg-white/92 shadow-[0_1px_0_rgba(18,22,74,0.04),0_12px_32px_-20px_rgba(28,48,190,0.28)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-5 px-5 lg:h-[3.5rem]">
        <a href="#hero" className="group flex shrink-0 items-center gap-2">
          <BrandLogo
            size={32}
            priority
            className="h-8 w-8 transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="leading-none">
            <span
              className={`mb-0.5 block text-[9px] font-semibold uppercase tracking-[0.2em] ${
                solid ? "text-gold" : "text-white/75"
              }`}
            >
              English
            </span>
            <span
              className={`font-display block text-[15px] font-semibold tracking-tight ${
                solid ? "text-ink" : "text-white"
              }`}
            >
              Sarwar Lab
            </span>
          </span>
        </a>

        <div className="ml-auto flex items-center gap-2.5 lg:gap-4">
          <nav className="hidden items-center lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-2 py-1 text-[12.5px] font-medium tracking-[-0.01em] transition-colors xl:px-2.5 ${
                  solid
                    ? "text-ink/55 hover:text-ink"
                    : "text-white/72 hover:text-white"
                } after:absolute after:right-2 after:bottom-0 after:left-2 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 xl:after:right-2.5 xl:after:left-2.5`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div
            className={`hidden h-3.5 w-px shrink-0 lg:block ${solid ? "bg-ink/12" : "bg-white/25"}`}
            aria-hidden
          />

          <a
            href="#free-stuff"
            className={`hidden h-8 items-center rounded-full px-3.5 text-[12.5px] font-semibold tracking-tight transition duration-200 hover:-translate-y-px lg:inline-flex ${
              solid
                ? "bg-forest text-white shadow-[0_6px_16px_-8px_rgba(28,48,190,0.65)] hover:bg-forest-deep"
                : "bg-white text-forest-deep shadow-[0_6px_16px_-10px_rgba(0,0,0,0.3)] hover:bg-gold-soft"
            }`}
          >
            Start free
          </a>

          <button
            type="button"
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors lg:hidden ${
              solid
                ? "border-ink/10 bg-white text-ink"
                : "border-white/30 bg-white/10 text-white"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/8 bg-white/96 lg:hidden"
          >
            <div className="flex flex-col gap-0.5 px-5 py-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink/75 transition-colors hover:bg-forest/5 hover:text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#free-stuff"
                className="mt-2 mb-1 rounded-full bg-forest px-4 py-2.5 text-center text-sm font-semibold text-white"
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
