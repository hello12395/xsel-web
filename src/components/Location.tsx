"use client";

import { location } from "@/data/site";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";
import { Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Location() {
  return (
    <section id="location" className="scroll-mt-24 bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <SectionHeader
          kicker="08 — Find us"
          title="Location"
          copy="Walk in for a lab, a worksheet, or a conversation. Dummy pin for now — the door is on Canal Road."
        />

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" delay={0.12}>
          <StaggerItem>
            <div className="card-surface h-full rounded-[28px] p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-gold-soft">
                  <PinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">Studio</p>
                  <h3 className="font-display text-2xl text-ink">{location.name}</h3>
                </div>
              </div>

              <p className="mt-8 leading-7 text-ink/70">
                {location.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-ink/75">
                  <ClockIcon className="h-5 w-5 text-forest" />
                  {location.hours}
                </li>
                <li className="flex items-center gap-3">
                  <PhoneIcon className="h-5 w-5 text-forest" />
                  <a href={`tel:${location.phone.replace(/\s/g, "")}`} className="text-ink/75 hover:text-forest">
                    {location.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MailIcon className="h-5 w-5 text-forest" />
                  <a href={`mailto:${location.email}`} className="text-ink/75 hover:text-forest">
                    {location.email}
                  </a>
                </li>
              </ul>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="overflow-hidden rounded-[28px] border border-ink/8 bg-white shadow-[0_24px_50px_-28px_rgba(28,48,190,0.3)]">
              <iframe
                title="English Sarwar Lab map"
                src={location.mapSrc}
                className="h-[340px] w-full border-0 lg:h-full min-h-[340px]"
                loading="lazy"
              />
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
