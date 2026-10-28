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
            <div className="flex flex-row flex-wrap gap-2.5 sm:flex-col sm:gap-3">
              {primarySocials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/70 transition hover:text-white sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/8">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {name}
                </a>
              ))}
            </div>
          </StaggerItem>
        </Stagger>
      </div>

      <div className="mx-auto max-w-6xl overflow-hidden px-4 sm:px-5 lg:px-8">
        <p
          aria-hidden="true"
          className="select-none font-sans text-[clamp(4.75rem,28vw,22rem)] leading-[0.82] font-black tracking-[-0.02em] text-white/[0.11]"
        >
          XSEL
        </p>
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
