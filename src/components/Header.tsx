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
  { href: "#premium-courses", label: "Paid Courses" },
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
          ? "border-b border-white/10 bg-[#152F29] shadow-[0_12px_32px_-18px_rgba(21,47,41,0.55)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-5 sm:px-5 md:gap-6 lg:h-[4.5rem] lg:px-8">
        <a href="#hero" className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3">
          <BrandLogo
            size={40}
            priority
            className="h-9 w-9 rounded-[10px] transition-transform duration-300 group-hover:scale-[1.03] sm:h-10 sm:w-10"
          />
          <span className="min-w-0 leading-none">
            <span className="mb-1 hidden text-[10px] font-extrabold tracking-[0.18em] text-white/70 uppercase sm:block">
              Sarwar
            </span>
            <span className="font-display block max-w-[9.5rem] truncate text-[15px] font-extrabold tracking-[-0.035em] text-white sm:max-w-none sm:text-[17px]">
              English Lab
            </span>
          </span>
        </a>

        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3 lg:gap-5">
          <nav className="hidden items-center gap-0.5 xl:flex xl:gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative shrink-0 px-2.5 py-2 text-[13.5px] font-bold tracking-[-0.01em] text-white/75 transition-colors hover:text-white after:absolute after:right-2.5 after:bottom-1 after:left-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 xl:px-3 xl:text-[14px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden h-4 w-px shrink-0 bg-white/20 xl:block" aria-hidden />

          {!authReady ? (
            <span
              className="hidden h-10 w-28 overflow-hidden rounded-[8px] bg-white/15 md:inline-flex"
              aria-hidden
            >
              <span className="shimmer-block h-full w-full rounded-[8px] bg-transparent" />
            </span>
          ) : isLoggedIn ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="hidden h-9 items-center rounded-[8px] border border-white/25 bg-white/10 px-3.5 text-[13px] font-bold tracking-tight text-white transition duration-200 hover:-translate-y-px hover:bg-white/18 sm:h-10 sm:px-4 sm:text-[13.5px] md:inline-flex"
            >
              Log out
            </button>
          ) : (
            <a
              href="#free-lessons"
              className="hidden h-9 items-center rounded-[8px] bg-white px-3.5 text-[13px] font-extrabold tracking-tight text-[#152F29] shadow-[0_8px_18px_-10px_rgba(0,0,0,0.35)] transition duration-200 hover:-translate-y-px hover:bg-[#F7DFC7] sm:h-10 sm:px-4 sm:text-[13.5px] md:inline-flex"
            >
              Start free
            </a>
          )}

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-white/25 bg-white/10 text-white transition-colors sm:h-10 sm:w-10 xl:hidden"
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
            className={`overflow-hidden border-t border-white/10 xl:hidden ${
              solid ? "bg-[#152F29]" : "bg-[#152F29]/95 backdrop-blur-md"
            }`}
          >
            <div className="flex flex-col gap-0.5 px-5 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-[16px] font-bold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-2 mb-1 rounded-[8px] border border-white/25 bg-white/10 px-4 py-3 text-center text-[15px] font-bold text-white"
                >
                  Log out
                </button>
              ) : (
                <a
                  href="#free-lessons"
                  className="mt-2 mb-1 rounded-[8px] bg-white px-4 py-3 text-center text-[15px] font-extrabold text-[#152F29]"
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
