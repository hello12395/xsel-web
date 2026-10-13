"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import { features } from "@/config/features";
import { BrandLogo } from "./BrandLogo";
import { CloseIcon, MenuIcon } from "./Icons";

const links = [
  { href: "#why", label: "Why Xsel" },
  { href: "#premium-courses", label: "Paid" },
  { href: "#free-lessons", label: "Free Lessons" },
  { href: "#reviews", label: "Reviews" },
  ...(features.pendingDiscussions
    ? [{ href: "#discussions", label: "Discussions" }]
    : []),
  { href: "#social", label: "Social" },
  ...(features.blogs ? [{ href: "#blogs", label: "Blogs" }] : []),
  { href: "#location", label: "Visit" },
];

export function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(Boolean(data.user));
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session?.user));
      setAuthReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    setOpen(false);
    setIsLoggedIn(false);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-white/10 bg-[#0a2340] shadow-[0_12px_32px_-18px_rgba(10,35,64,0.55)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:gap-5 sm:px-5 lg:h-[3.5rem] lg:px-8">
        <a href="#hero" className="group flex min-w-0 shrink-0 items-center gap-2">
          <BrandLogo
            size={32}
            priority
            className="h-8 w-8 transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="min-w-0 leading-none">
            <span className="mb-0.5 block text-[9px] font-semibold tracking-[0.2em] text-[#37ccf8] uppercase">
              Sarwar
            </span>
            <span className="font-display block truncate text-[15px] font-semibold tracking-tight text-white">
              English Lab
            </span>
          </span>
        </a>

        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-2.5 lg:gap-4">
          <nav className="hidden items-center lg:flex lg:max-w-[min(100%,42rem)] lg:overflow-x-auto xl:max-w-none">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative shrink-0 px-1.5 py-1 text-[12px] font-medium tracking-[-0.01em] text-white/72 transition-colors hover:text-white after:absolute after:right-1.5 after:bottom-0 after:left-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 xl:px-2.5 xl:text-[12.5px] xl:after:right-2.5 xl:after:left-2.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden h-3.5 w-px shrink-0 bg-white/25 lg:block" aria-hidden />

          {!authReady ? (
            <span
              className="hidden h-8 w-24 overflow-hidden rounded-full bg-white/15 lg:inline-flex"
              aria-hidden
            >
              <span className="shimmer-block h-full w-full rounded-full bg-transparent" />
            </span>
          ) : isLoggedIn ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="hidden h-8 items-center rounded-full border border-white/30 bg-white/10 px-3.5 text-[12.5px] font-semibold tracking-tight text-white transition duration-200 hover:-translate-y-px hover:bg-white/20 lg:inline-flex"
            >
              Log out
            </button>
          ) : (
            <a
              href="#free-lessons"
              className="hidden h-8 items-center rounded-full bg-white px-3.5 text-[12.5px] font-semibold tracking-tight text-[#0a2340] shadow-[0_6px_16px_-10px_rgba(0,0,0,0.35)] transition duration-200 hover:-translate-y-px hover:bg-[#37ccf8] lg:inline-flex"
            >
              Start free
            </a>
          )}

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors lg:hidden"
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
            className={`overflow-hidden border-t border-white/10 lg:hidden ${
              solid ? "bg-[#0a2340]" : "bg-[#0a2340]/95 backdrop-blur-md"
            }`}
          >
            <div className="flex flex-col gap-0.5 px-5 py-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-2 mb-1 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Log out
                </button>
              ) : (
                <a
                  href="#free-lessons"
                  className="mt-2 mb-1 rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#0a2340]"
                  onClick={() => setOpen(false)}
                >
                  Start free
                </a>
              )}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
