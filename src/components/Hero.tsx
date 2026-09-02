"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowIcon, ChevronDownIcon } from "./Icons";

const googlePlayUrl = "https://play.google.com/store";

const ease = [0.22, 1, 0.36, 1] as const;
const lessons = ["grammar", "speaking", "writing", "exams"];

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

function CycleWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % lessons.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span
      className="relative mx-1.5 inline-block h-[1.35em] w-[9.5rem] overflow-hidden align-baseline border-b border-white/40"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={lessons[index]}
          initial={{ y: "90%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-90%", opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="absolute top-0 left-0 font-display whitespace-nowrap italic"
        >
          {lessons[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative h-dvh min-h-dvh w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="English teacher leading a studio lesson"
      >
        <source src="/studio-hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      <div className="relative z-10 flex h-full items-center px-6 pt-20 pb-16 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-3xl text-left lg:max-w-4xl xl:max-w-[58rem]">
          <motion.p
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/90 backdrop-blur-md"
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
              className="font-sans text-xs font-semibold tracking-[0.4em] text-white/70 uppercase sm:text-sm"
            >
              On the glass board
            </RevealLine>
            <RevealLine
              delay={0.28}
              className="font-display mt-5 text-5xl leading-[1.12] font-semibold tracking-tight sm:text-7xl lg:text-[5.25rem]"
            >
              English,
            </RevealLine>
            <RevealLine
              delay={0.42}
              className="font-display mt-3 text-[2.75rem] leading-[1.12] font-light tracking-tight italic sm:text-6xl lg:text-[4.75rem]"
            >
              taught live.
            </RevealLine>
            <RevealLine
              delay={0.56}
              className="mt-6 font-sans text-xl font-medium tracking-tight text-white/90 sm:text-3xl"
            >
              Then spoken in the room.
            </RevealLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease }}
            className="mt-8 text-left text-xl leading-8 text-white/80 sm:text-[1.375rem] sm:leading-9 lg:text-[1.5rem] lg:leading-10"
          >
            <span className="block">
              A real classroom for
              <CycleWord />.
            </span>
            <span className="mt-3 block">
              The same lesson you see on screen, marked, corrected, and said out loud.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.86, ease }}
            className="mt-10 flex flex-wrap items-center justify-start gap-3 sm:gap-4"
          >
            <a
              href="#free-stuff"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Browse free stuff
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a
              href={googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex h-[52px] w-[220px] shrink-0 overflow-hidden rounded-[7px] transition hover:-translate-y-0.5 sm:h-[56px] sm:w-[238px]"
              aria-label="Get it on Google Play"
            >
              <Image
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                width={646}
                height={250}
                className="absolute top-1/2 left-1/2 h-[114px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 sm:h-[123px]"
              />
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease }}
            className="mt-12 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/15 pt-8 text-left lg:max-w-4xl"
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
              >
                <dt className="font-display text-3xl text-white sm:text-4xl">{value}</dt>
                <dd className="mt-1.5 text-xs tracking-[0.16em] text-white/55 uppercase sm:text-sm">{label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>

      <a
        href="#why"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70"
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
