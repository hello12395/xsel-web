import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  kicker,
  title,
  copy,
  light = false,
  className = "",
}: {
  kicker?: string;
  title: string;
  copy: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal variant="up" className={`max-w-2xl text-left ${className}`}>
      {kicker ? (
        <p
          className={`text-[11px] font-extrabold tracking-[0.2em] uppercase ${
            light ? "text-gold-soft" : "text-forest"
          }`}
        >
          {kicker}
        </p>
      ) : null}
      <h2
        className={`font-display text-[clamp(1.75rem,5.5vw,4rem)] leading-[1.08] tracking-[-0.055em] sm:leading-[1.03] ${
          kicker ? "mt-3 " : ""
        }${light ? "text-white" : "text-heading"}`}
      >
        {title}
      </h2>
      <p className={`mt-3 max-w-prose text-[15px] leading-[1.75] sm:mt-4 sm:text-base md:text-lg ${light ? "text-white/70" : "text-muted"}`}>
        {copy}
      </p>
    </Reveal>
  );
}
