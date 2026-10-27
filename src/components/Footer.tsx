"use client";

import { features } from "@/config/features";
import { location, socials } from "@/data/site";
import { BrandLogo } from "./BrandLogo";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  TiktokIcon,
  WhatsappIcon,
} from "./Icons";
import { Reveal } from "./Reveal";

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
} as const;

const primarySocials = socials.map((social) => ({
  name: social.name,
  href: social.links[0]?.href ?? "#",
  Icon: socialIcons[social.icon],
}));

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#152F29] text-white">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-10 sm:px-5 sm:pt-16 sm:pb-12 lg:px-8">
          <div className="grid gap-10 sm:gap-12 md:grid-cols-[1.45fr_0.7fr_0.85fr_0.75fr] md:gap-8 lg:gap-12">
            <div className="max-w-sm">
              <a href="#hero" className="inline-flex items-center gap-3 transition hover:opacity-90">
                <BrandLogo size={52} className="h-11 w-11 shrink-0 rounded-[11px] sm:h-12 sm:w-12" />
                <span className="min-w-0">
                  <span className="font-display block text-lg leading-none tracking-tight sm:text-xl">
                    Sarwar English Lab
                    <span className="text-[#EFAA93]">.</span>
                  </span>
                  <span className="mt-1.5 block text-[10px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                    Learn. Practise. Progress.
                  </span>
                </span>
              </a>
              <p className="mt-5 text-sm leading-relaxed text-white/55">
                A better way to understand English, practise with purpose, and move forward with
                confidence.
              </p>
            </div>

            <div>
              <p className="mb-4 text-[10px] font-bold tracking-[0.18em] text-[#EFAA93] uppercase">
                Explore
              </p>
              <nav aria-label="Footer" className="flex flex-col gap-3">
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
            </div>

            <div>
              <p className="mb-4 text-[10px] font-bold tracking-[0.18em] text-[#EFAA93] uppercase">
                Visit
              </p>
              <div className="flex flex-col gap-3.5 text-sm text-white/70">
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
            </div>

            <div>
              <p className="mb-4 text-[10px] font-bold tracking-[0.18em] text-[#EFAA93] uppercase">
                Connect
              </p>
              <div className="flex flex-col gap-3">
                {primarySocials.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-white/70 transition hover:text-white"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/8">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto max-w-6xl overflow-hidden px-4 sm:px-5 lg:px-8">
        <p
          aria-hidden="true"
          className="select-none font-sans text-[clamp(7rem,32vw,22rem)] leading-[0.82] font-black tracking-[-0.02em] text-white/[0.11]"
        >
          XSEL
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-6 lg:px-8">
          <span>© {year} Sarwar English Lab. All rights reserved.</span>
          <span>G-11 Markaz · Islamabad</span>
        </div>
      </div>
    </footer>
  );
}
