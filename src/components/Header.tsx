"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import { features } from "@/config/features";
import { BrandLogo } from "./BrandLogo";
import { ArrowIcon, CloseIcon, MenuIcon } from "./Icons";

const links = [
  { href: "#why", label: "Why xSEL" },
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
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

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

  function goToSection(href: string) {
    setOpen(false);
    document.body.style.overflow = "";

    const id = href.startsWith("#") ? href.slice(1) : "";
    if (!id) return;

    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }, 80);
  }

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 ${
        solid
          ? "border-b border-white/10 bg-[#152F29] shadow-[0_12px_32px_-18px_rgba(21,47,41,0.55)]"
          : "border-b border-[#152F29]/08 bg-[#FFFCF6]"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:h-16 sm:gap-5 sm:px-5 md:gap-6 lg:h-[4.5rem] lg:px-8">
        <a href="#hero" className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3">
          <BrandLogo
            size={40}
            priority
            className="h-8 w-8 rounded-[10px] transition-transform duration-300 group-hover:scale-[1.03] sm:h-10 sm:w-10"
          />
          <span className="min-w-0 leading-none">
            <span
              className={`block text-[12px] font-extrabold tracking-[-0.02em] transition-colors sm:text-[14px] ${
                solid ? "text-white" : "text-[#152F29]"
              }`}
            >
              Sarwar English Lab
            </span>
            <span
              className={`mt-1 hidden text-[9px] font-semibold tracking-[0.16em] uppercase transition-colors sm:block ${
                solid ? "text-white/50" : "text-[#152F29]/45"
              }`}
            >
              Learn. Practise. Progress.
            </span>
          </span>
        </a>

        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3 lg:gap-4">
          <nav className="hidden items-center gap-0.5 xl:flex xl:gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative shrink-0 px-2.5 py-2 text-[13.5px] font-bold tracking-[-0.01em] transition-colors after:absolute after:right-2.5 after:bottom-1 after:left-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 xl:px-3 xl:text-[14px] ${
                  solid
                    ? "text-white/75 hover:text-white"
                    : "text-[#152F29]/70 hover:text-[#152F29]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {!authReady ? (
            <span
              className={`hidden h-10 w-28 overflow-hidden rounded-[8px] md:inline-flex ${
                solid ? "bg-white/15" : "bg-[#152F29]/10"
              }`}
              aria-hidden
            >
              <span className="shimmer-block h-full w-full rounded-[8px] bg-transparent" />
            </span>
          ) : isLoggedIn ? (
            <button
              type="button"
              onClick={handleSignOut}
              className={`hidden h-9 items-center gap-1.5 rounded-[8px] px-3.5 text-[13px] font-bold tracking-tight transition duration-200 hover:-translate-y-px sm:h-10 sm:px-4 sm:text-[13.5px] md:inline-flex ${
                solid
                  ? "border border-white/25 bg-white/10 text-white hover:bg-white/18"
                  : "border border-[#152F29]/20 bg-[#152F29]/5 text-[#152F29] hover:bg-[#152F29]/10"
              }`}
            >
              Log out
            </button>
          ) : (
            <a
              href="/login"
              className={`hidden h-9 items-center gap-1.5 rounded-[8px] px-3.5 text-[13px] font-extrabold tracking-tight shadow-[0_8px_18px_-10px_rgba(21,47,41,0.45)] transition duration-200 hover:-translate-y-px sm:h-10 sm:px-4 sm:text-[13.5px] md:inline-flex ${
                solid
                  ? "bg-white text-[#152F29] hover:bg-[#F7DFC7]"
                  : "bg-[#152F29] text-white hover:bg-[#1a3d35]"
              }`}
            >
              Login
              <ArrowIcon className="h-3.5 w-3.5" />
            </a>
          )}

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-[10px] transition-colors sm:h-10 sm:w-10 xl:hidden ${
              solid
                ? "border border-white/25 bg-white/10 text-white"
                : "border border-[#152F29]/15 bg-[#152F29]/5 text-[#152F29]"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
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
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden xl:hidden ${
              solid
                ? "border-t border-white/10 bg-[#152F29]"
                : "border-t border-[#152F29]/10 bg-[#FFFCF6]"
            }`}
          >
            <div className="flex max-h-[min(78dvh,36rem)] flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-5 sm:py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-3.5 py-3.5 text-[16px] font-bold transition-colors ${
                    solid
                      ? "text-white/90 active:bg-white/10 hover:bg-white/10 hover:text-white"
                      : "text-[#152F29]/85 active:bg-[#152F29]/5 hover:bg-[#152F29]/5 hover:text-[#152F29]"
                  }`}
                  onClick={(event) => {
                    event.preventDefault();
                    goToSection(link.href);
                  }}
                >
                  {link.label}
                </a>
              ))}
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className={`mt-3 mb-1 min-h-12 rounded-[10px] px-4 py-3.5 text-center text-[15px] font-bold ${
                    solid
                      ? "border border-white/25 bg-white/10 text-white"
                      : "border border-[#152F29]/20 bg-[#152F29]/5 text-[#152F29]"
                  }`}
                >
                  Log out
                </button>
              ) : (
                <a
                  href="/login"
                  className={`mt-3 mb-1 inline-flex min-h-12 items-center justify-center gap-1.5 rounded-[10px] px-4 py-3.5 text-center text-[15px] font-extrabold ${
                    solid
                      ? "bg-white text-[#152F29]"
                      : "bg-[#152F29] text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Login
                  <ArrowIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
