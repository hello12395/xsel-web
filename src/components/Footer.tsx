"use client";

import { BrandLogo } from "./BrandLogo";
import { Reveal } from "./Reveal";

const links = [
  { href: "#why", label: "Why the Lab" },
  { href: "#premium-courses", label: "Premium" },
  { href: "#free-stuff", label: "Free Stuff" },
  { href: "#reviews", label: "Reviews" },
  { href: "#blogs", label: "Blogs" },
  { href: "#location", label: "Visit" },
];

export function Footer() {
  return (
    <footer className="bg-forest-deep text-white">
      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:gap-10 sm:px-5 sm:py-14 md:grid-cols-[1.3fr_1fr] md:items-center lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <BrandLogo size={56} className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
            <div className="min-w-0">
              <p className="font-display text-lg sm:text-xl">English Sarwar Lab</p>
              <p className="mt-1 text-sm text-white/55">A living classroom for spoken, written, exam-ready English.</p>
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
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-white/45 sm:px-5 sm:py-5 lg:px-8">
            Dummy site · {new Date().getFullYear()} · All lessons still on the board.
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
