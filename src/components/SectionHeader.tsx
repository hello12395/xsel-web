import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  kicker,
  title,
  copy,
  light = false,
}: {
  kicker: string;
  title: string;
  copy: ReactNode;
  light?: boolean;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
          light ? "text-gold-soft" : "text-gold"
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`font-display mt-3 text-3xl leading-[1.15] tracking-tight sm:text-5xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <p className={`mt-4 text-base leading-8 sm:text-lg ${light ? "text-white/70" : "text-ink/65"}`}>
        {copy}
      </p>
    </Reveal>
  );
}
