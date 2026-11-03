"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowIcon } from "./Icons";

const googlePlayUrl = "https://play.google.com/store/apps/details?id=app.xsel";
const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  ["2.4k", "Learners and growing"],
  ["12", "Weekly learning labs"],
  ["8 yrs", "On the floor"],
] as const;

function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.28em] ${className}`}>
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

function AccentUnderline({ children }: { children: string }) {
  return (
    <span className="relative inline-block pb-[0.18em]">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 320 18"
        preserveAspectRatio="none"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-[0.28em] w-full overflow-visible"
      >
        <path
          d="M4 13.5 C70 15.5, 150 11, 230 8.5 C270 7.2, 300 6.5, 316 7.2 L316 9.8 C280 11.8, 220 13.5, 150 14.8 C90 16, 40 15.5, 4 13.5 Z"
          fill="#EFAA93"
        />
      </svg>
    </span>
  );
}

function HeroVisual({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: 4 }}
      animate={{ opacity: 1, y: 0, rotate: compact ? 2 : 3 }}
      transition={{ duration: 0.9, delay: 0.35, ease }}
      className={`relative mx-auto w-full ${
        compact ? "max-w-[17.5rem]" : "max-w-[22rem] lg:max-w-[26rem]"
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute rounded-full border border-white/10 ${
          compact
            ? "-top-8 -right-6 h-28 w-28"
            : "-top-10 -right-8 h-40 w-40 sm:-top-14 sm:-right-10 sm:h-52 sm:w-52"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute rounded-full border border-white/10 ${
          compact
            ? "-bottom-10 -left-8 h-32 w-32"
            : "-bottom-12 -left-10 h-44 w-44 sm:-bottom-16 sm:-left-14 sm:h-56 sm:w-56"
        }`}
      />

      <div
        className={`relative overflow-hidden bg-[#FFFCF6] shadow-[0_28px_60px_-28px_rgba(0,0,0,0.55)] ${
          compact ? "rounded-[1.25rem] p-4" : "rounded-[1.35rem] p-5 sm:rounded-[1.6rem] sm:p-6"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-3 font-bold tracking-[0.16em] text-[#152F29]/45 uppercase ${
            compact ? "text-[9px]" : "text-[10px] sm:text-[11px]"
          }`}
        >
          <span>Sarwar Lab</span>
          <span>Live class</span>
        </div>

        <p
          className={`font-display leading-[1.15] tracking-[-0.04em] text-[#152F29] ${
            compact ? "mt-4 text-[1.25rem]" : "mt-5 text-[1.45rem] sm:mt-6 sm:text-[1.7rem]"
          }`}
        >
          Grammar.
          <br />
          Writing. Speaking.
        </p>

        <div className={`space-y-2 ${compact ? "mt-4" : "mt-5 sm:mt-6 sm:space-y-2.5"}`}>
          <div className={`rounded-xl bg-[#152F29]/[0.05] ${compact ? "px-3 py-2.5" : "px-3.5 py-3"}`}>
            <p className="text-[10px] font-bold tracking-[0.14em] text-[#152F29]/40 uppercase">
              Rule
            </p>
            <p className={`mt-1 leading-snug text-[#152F29]/55 ${compact ? "text-[12px]" : "text-[13px]"}`}>
              Learn it clearly in class.
            </p>
          </div>
          <div
            className={`rounded-xl border border-[#EFAA93]/45 bg-[#EFAA93]/15 ${
              compact ? "px-3 py-2.5" : "px-3.5 py-3"
            }`}
          >
            <p className="text-[10px] font-bold tracking-[0.14em] text-[#B86B52] uppercase">
              Practice
            </p>
            <p className={`mt-1 leading-snug text-[#152F29]/80 ${compact ? "text-[12px]" : "text-[13px]"}`}>
              Get corrected. Leave more confident.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`absolute flex rotate-6 items-center justify-center rounded-full border border-dashed border-[#152F29]/25 bg-[#EFAA93] shadow-[0_16px_30px_-14px_rgba(184,107,82,0.55)] ${
          compact
            ? "-top-4 -right-2 h-[4.5rem] w-[4.5rem]"
            : "-top-5 -right-3 h-[5.5rem] w-[5.5rem] sm:-top-6 sm:-right-4 sm:h-[6.5rem] sm:w-[6.5rem]"
        }`}
      >
        <div className="text-center leading-tight text-[#152F29]">
          <span className={`mb-0.5 block font-bold ${compact ? "text-[12px]" : "text-[14px]"}`}>*</span>
          <span
            className={`block font-extrabold tracking-[0.08em] uppercase ${
              compact ? "text-[8px]" : "text-[9px] sm:text-[10px]"
            }`}
          >
            Learn.
            <br />
            Practise.
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function HeroMobile() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-6 pt-2 lg:hidden">
      <div className="min-w-0">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          className="mb-3 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-white/90 uppercase"
        >
          <span aria-hidden className="text-[#EFAA93]">
            *
          </span>
          An English lab, not just a class
        </motion.p>

        <h1 className="text-left text-white">
          <RevealLine
            delay={0.12}
            className="font-display text-[clamp(2.15rem,9vw,2.75rem)] leading-[1.02] tracking-[-0.07em]"
          >
            English,
          </RevealLine>
          <RevealLine
            delay={0.42}
            className="font-display mt-0.5 text-[clamp(1.85rem,8vw,2.4rem)] leading-[1.02] tracking-[-0.07em]"
          >
            taught live &
          </RevealLine>
          <RevealLine
            delay={0.56}
            className="em-serif mt-1 text-[clamp(1.85rem,8vw,2.4rem)] leading-[1.02] text-[#EFAA93]"
          >
            <AccentUnderline>Put to work.</AccentUnderline>
          </RevealLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72, ease }}
          className="mt-3 max-w-[34ch] text-left text-[14px] font-normal leading-[1.5] tracking-[-0.01em] text-white/75"
        >
          A real classroom for grammar, writing and speaking. Learn the rule,
          practise it, get corrected, and leave every lesson a little more
          confident.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.86, ease }}
          className="mt-4 flex flex-col items-stretch gap-2.5"
        >
          <a
            href="#free-lessons"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#EFAA93] px-6 py-3 text-[15px] font-semibold text-[#152F29] transition hover:-translate-y-0.5 hover:bg-[#F2BAA1]"
          >
            Browse free lessons
            <ArrowIcon className="h-4 w-4" />
          </a>
          <a
            href={googlePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mx-auto inline-flex h-[46px] w-[min(100%,190px)] shrink-0 overflow-hidden rounded-[7px] transition hover:-translate-y-0.5"
            aria-label="Get it on Google Play"
          >
            <Image
              src="/google-play-badge.png"
              alt="Get it on Google Play"
              width={646}
              height={250}
              className="absolute top-1/2 left-1/2 h-[100px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
            />
          </a>
        </motion.div>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center py-5">
        <HeroVisual compact />
      </div>

      <motion.dl
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1, ease }}
        className="grid grid-cols-3 gap-3 border-t border-white/15 pt-4 text-left"
      >
        {stats.map(([value, label], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.05 + index * 0.1, ease }}
            className="flex min-w-0 flex-col gap-0.5"
          >
            <dt className="font-display text-[1.35rem] tracking-[-0.04em] text-white">
              {value}
            </dt>
            <dd className="max-w-[5.5rem] text-[10px] leading-[1.3] text-white/70">
              {label}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </div>
  );
}

function HeroDesktop() {
  return (
    <div className="relative z-10 mx-auto hidden w-full max-w-6xl flex-1 grid-cols-[1.05fr_0.95fr] items-center gap-12 px-8 py-10 md:px-10 lg:grid lg:px-8 lg:py-12 xl:gap-16">
      <div className="min-w-0">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          className="mb-5 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-[12px] font-semibold tracking-[0.14em] text-white/90 uppercase"
        >
          <span aria-hidden className="text-[#EFAA93]">
            *
          </span>
          An English lab, not just a class
        </motion.p>

        <h1 className="text-left text-white">
          <RevealLine
            delay={0.12}
            className="font-display text-[clamp(2.4rem,5vw+1rem,4.4rem)] leading-[1.02] tracking-[-0.07em]"
          >
            English,
          </RevealLine>
          <RevealLine
            delay={0.42}
            className="font-display mt-1.5 text-[clamp(2.05rem,4.4vw+0.85rem,3.9rem)] leading-[1.02] tracking-[-0.07em]"
          >
            taught live &
          </RevealLine>
          <RevealLine
            delay={0.56}
            className="em-serif mt-2 text-[clamp(2.05rem,4.4vw+0.85rem,3.9rem)] leading-[1.02] text-[#EFAA93]"
          >
            <AccentUnderline>Put to work.</AccentUnderline>
          </RevealLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72, ease }}
          className="mt-5 max-w-xl text-left text-[17px] font-normal leading-[1.55] tracking-[-0.01em] text-white/75 md:text-[1.125rem] md:leading-[1.6]"
        >
          A real classroom for grammar, writing and speaking. Learn the rule,
          practise it, get corrected, and leave every lesson a little more
          confident.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.86, ease }}
          className="mt-6 flex flex-row flex-wrap items-center gap-4"
        >
          <a
            href="#free-lessons"
            className="inline-flex min-h-12 items-center justify-start gap-2 rounded-full bg-[#EFAA93] px-7 py-3.5 text-base font-semibold text-[#152F29] transition hover:-translate-y-0.5 hover:bg-[#F2BAA1]"
          >
            Browse free lessons
            <ArrowIcon className="h-4 w-4" />
          </a>
          <a
            href={googlePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex h-[52px] w-[220px] shrink-0 overflow-hidden rounded-[7px] transition hover:-translate-y-0.5"
            aria-label="Get it on Google Play"
          >
            <Image
              src="/google-play-badge.png"
              alt="Get it on Google Play"
              width={646}
              height={250}
              className="absolute top-1/2 left-1/2 h-[114px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
            />
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease }}
          className="mt-8 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-6 text-left"
        >
          {stats.map(([value, label], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.05 + index * 0.1, ease }}
              className="flex min-w-0 items-center gap-2.5"
            >
              <dt className="font-display shrink-0 text-[1.85rem] tracking-[-0.04em] text-white">
                {value}
              </dt>
              <dd className="max-w-[6.5rem] text-[12px] leading-[1.3] text-white/70">
                {label}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      <div className="min-w-0">
        <HeroVisual />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-[#152F29]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-[-12%] left-[-8%] h-[28rem] w-[28rem] rounded-full border border-white/[0.07]" />
        <div className="absolute top-[18%] left-[8%] h-[18rem] w-[18rem] rounded-full border border-white/[0.05]" />
        <div className="absolute right-[-10%] bottom-[-18%] h-[34rem] w-[34rem] rounded-full border border-white/[0.07]" />
        <div className="absolute right-[12%] bottom-[8%] h-[16rem] w-[16rem] rounded-full border border-white/[0.05]" />
      </div>

      <div
        className="shrink-0 pt-[env(safe-area-inset-top)]"
        aria-hidden
      >
        <div className="h-14 sm:h-16 lg:h-[4.5rem]" />
      </div>

      <HeroMobile />
      <HeroDesktop />
    </section>
  );
}
