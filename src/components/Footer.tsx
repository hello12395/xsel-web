"use client";

import { BrandLogo } from "./BrandLogo";
import { Reveal } from "./Reveal";

const links = [
  { href: "#why", label: "Why the Lab" },
  { href: "#free-stuff", label: "Free Stuff" },
  { href: "#reviews", label: "Reviews" },
  { href: "#blogs", label: "Blogs" },
  { href: "#location", label: "Visit" },
];

export function Footer() {
  return (
    <footer className="bg-forest-deep text-white">
      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div className="flex items-center gap-4">
            <BrandLogo size={56} className="h-12 w-12" />
            <div>
              <p className="font-display text-xl">English Sarwar Lab</p>
              <p className="mt-1 text-sm text-white/55">A living classroom for spoken, written, exam-ready English.</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/65 transition hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-white/45">
            Dummy site · {new Date().getFullYear()} · All lessons still on the board.
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
