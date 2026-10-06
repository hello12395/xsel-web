import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  kicker,
  title,
  copy,
  light = false,
  className = "",
}: {
  kicker: string;
  title: string;
  copy: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-2xl text-left ${className}`}>
      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
          light ? "text-gold-soft" : "text-gold"
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`font-display mt-3 text-[1.85rem] leading-[1.15] tracking-tight sm:text-4xl md:text-5xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <p className={`mt-3 text-[15px] leading-7 sm:mt-4 sm:text-base sm:leading-8 md:text-lg ${light ? "text-white/70" : "text-ink/65"}`}>
        {copy}
      </p>
    </Reveal>
  );
}
