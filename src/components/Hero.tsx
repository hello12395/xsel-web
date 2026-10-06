"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowIcon, ChevronDownIcon } from "./Icons";

const googlePlayUrl = "https://play.google.com/store";

const ease = [0.22, 1, 0.36, 1] as const;

function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.12em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.85, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-dvh w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-[72%_center]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="English teacher leading a studio lesson"
      >
        <source src="/studio-hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:from-black/80 sm:via-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

      <div className="relative z-10 flex min-h-dvh items-center px-5 pt-20 pb-20 sm:px-8 sm:pb-16 md:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-3xl text-left lg:max-w-4xl xl:max-w-[58rem]">
          <motion.p
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/25 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-white/90 uppercase backdrop-blur-md sm:mb-8 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.24em]"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-white"
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Live from the studio
          </motion.p>

          <h1 className="text-left text-white">
            <RevealLine
              delay={0.12}
              className="font-sans text-[10px] font-semibold tracking-[0.32em] text-white/70 uppercase sm:text-xs sm:tracking-[0.4em] md:text-sm"
            >
              On the glass board
            </RevealLine>
            <RevealLine
              delay={0.28}
              className="font-display mt-3 text-4xl leading-[1.12] font-semibold tracking-tight sm:mt-5 sm:text-6xl md:text-7xl lg:text-[5.25rem]"
            >
              English,
            </RevealLine>
            <RevealLine
              delay={0.42}
              className="font-display mt-2 text-[2.15rem] leading-[1.12] font-light tracking-tight italic sm:mt-3 sm:text-5xl md:text-6xl lg:text-[4.75rem]"
            >
              taught live.
            </RevealLine>
            <RevealLine
              delay={0.56}
              className="mt-4 font-sans text-lg font-medium tracking-tight text-white/90 sm:mt-6 sm:text-2xl md:text-3xl"
            >
              Then put to work.
            </RevealLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease }}
            className="mt-5 max-w-xl text-left text-base leading-7 text-white/80 sm:mt-8 sm:max-w-none sm:text-xl sm:leading-8 md:text-[1.375rem] md:leading-9 lg:text-[1.5rem] lg:leading-10"
          >
            <span className="block">
              A real classroom for grammar, writing, and speaking.
            </span>
            <span className="mt-2 block sm:mt-3">
              The same lesson you see on screen, marked, corrected, and
              practiced, whether that&apos;s a sentence you write or a sentence
              you say.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.86, ease }}
            className="mt-7 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <a
              href="#free-stuff"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90 sm:justify-start sm:px-7 sm:py-4 sm:text-base"
            >
              Browse free stuff
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a
              href={googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mx-auto inline-flex h-[48px] w-[200px] shrink-0 overflow-hidden rounded-[7px] transition hover:-translate-y-0.5 sm:mx-0 sm:h-[56px] sm:w-[238px]"
              aria-label="Get it on Google Play"
            >
              <Image
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                width={646}
                height={250}
                className="absolute top-1/2 left-1/2 h-[105px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 sm:h-[123px]"
              />
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease }}
            className="mt-8 grid max-w-3xl grid-cols-3 gap-3 border-t border-white/15 pt-6 text-left sm:mt-12 sm:gap-6 sm:pt-8 lg:max-w-4xl"
          >
            {[
              ["2.4k", "Learners"],
              ["12", "Weekly labs"],
              ["8 yrs", "On the floor"],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.05 + index * 0.1, ease }}
                className="min-w-0"
              >
                <dt className="font-display text-2xl text-white sm:text-3xl md:text-4xl">{value}</dt>
                <dd className="mt-1 text-[10px] tracking-[0.12em] text-white/55 uppercase sm:mt-1.5 sm:text-xs sm:tracking-[0.16em] md:text-sm">{label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>

      <a
        href="#why"
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 sm:bottom-7 sm:flex"
      >
        <span className="text-[10px] font-semibold tracking-[0.28em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDownIcon className="h-5 w-5" />
        </motion.span>
      </a>
    </section>
  );
}
