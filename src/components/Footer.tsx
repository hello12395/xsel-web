"use client";

import { features } from "@/config/features";
import { BrandLogo } from "./BrandLogo";
import { Reveal } from "./Reveal";

const links = [
  { href: "#why", label: "Why Xsel" },
  { href: "#premium-courses", label: "Paid Courses" },
  { href: "#free-lessons", label: "Free Lessons" },
  { href: "#reviews", label: "Reviews" },
  ...(features.blogs ? [{ href: "#blogs", label: "Blogs" }] : []),
  { href: "#location", label: "Visit" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a2340] text-white">
      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:gap-10 sm:px-5 sm:py-14 md:grid-cols-[1.3fr_1fr] md:items-center lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <BrandLogo size={56} className="h-10 w-10 shrink-0 rounded-[10px] sm:h-12 sm:w-12" />
            <div className="min-w-0">
              <p className="font-display text-lg leading-none tracking-tight sm:text-xl">XSEL</p>
              <p className="mt-1.5 text-sm text-white/55">Sarwar English Lab</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-6 md:justify-end">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/65 transition hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Reveal>
    </footer>
  );
}
// just for deploy
