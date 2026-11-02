"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowIcon } from "./Icons";

const googlePlayUrl = "https://play.google.com/store/apps/details?id=app.xsel";
const ease = [0.22, 1, 0.36, 1] as const;

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

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: 4 }}
      animate={{ opacity: 1, y: 0, rotate: 3 }}
      transition={{ duration: 0.9, delay: 0.35, ease }}
      className="relative mx-auto w-full max-w-[22rem] lg:max-w-[26rem]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-8 h-40 w-40 rounded-full border border-white/10 sm:-top-14 sm:-right-10 sm:h-52 sm:w-52"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-10 h-44 w-44 rounded-full border border-white/10 sm:-bottom-16 sm:-left-14 sm:h-56 sm:w-56"
      />

      <div className="relative overflow-hidden rounded-[1.35rem] bg-[#FFFCF6] p-5 shadow-[0_28px_60px_-28px_rgba(0,0,0,0.55)] sm:rounded-[1.6rem] sm:p-6">
        <div className="flex items-center justify-between gap-3 text-[10px] font-bold tracking-[0.16em] text-[#152F29]/45 uppercase sm:text-[11px]">
          <span>Sarwar Lab</span>
          <span>Live class</span>
        </div>

        <p className="font-display mt-5 text-[1.45rem] leading-[1.15] tracking-[-0.04em] text-[#152F29] sm:mt-6 sm:text-[1.7rem]">
          Grammar.
          <br />
          Writing. Speaking.
        </p>

        <div className="mt-5 space-y-2.5 sm:mt-6">
          <div className="rounded-xl bg-[#152F29]/[0.05] px-3.5 py-3">
            <p className="text-[10px] font-bold tracking-[0.14em] text-[#152F29]/40 uppercase">
              Rule
            </p>
            <p className="mt-1 text-[13px] leading-snug text-[#152F29]/55">
              Learn it clearly in class.
            </p>
          </div>
          <div className="rounded-xl border border-[#EFAA93]/45 bg-[#EFAA93]/15 px-3.5 py-3">
            <p className="text-[10px] font-bold tracking-[0.14em] text-[#B86B52] uppercase">
              Practice
            </p>
            <p className="mt-1 text-[13px] leading-snug text-[#152F29]/80">
              Get corrected. Leave more confident.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -top-5 -right-3 flex h-[5.5rem] w-[5.5rem] rotate-6 items-center justify-center rounded-full border border-dashed border-[#152F29]/25 bg-[#EFAA93] shadow-[0_16px_30px_-14px_rgba(184,107,82,0.55)] sm:-top-6 sm:-right-4 sm:h-[6.5rem] sm:w-[6.5rem]">
        <div className="text-center leading-tight text-[#152F29]">
          <span className="mb-0.5 block text-[14px] font-bold">*</span>
          <span className="block text-[9px] font-extrabold tracking-[0.08em] uppercase sm:text-[10px]">
            Learn.
            <br />
            Practise.
          </span>
        </div>
      </div>
    </motion.div>
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

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-4 py-8 sm:gap-12 sm:px-8 sm:py-10 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-12 xl:gap-16">
        <div className="min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease }}
            className="mb-4 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] text-white/90 uppercase sm:mb-5 sm:px-4 sm:text-[12px]"
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
              className="font-display mt-1 text-[clamp(2.05rem,4.4vw+0.85rem,3.9rem)] leading-[1.02] tracking-[-0.07em] sm:mt-1.5"
            >
              taught live &
            </RevealLine>
            <RevealLine
              delay={0.56}
              className="em-serif mt-1.5 text-[clamp(2.05rem,4.4vw+0.85rem,3.9rem)] leading-[1.02] text-[#EFAA93] sm:mt-2"
            >
              <AccentUnderline>Put to work.</AccentUnderline>
            </RevealLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease }}
            className="mt-4 max-w-xl text-left text-[15px] font-normal leading-[1.55] tracking-[-0.01em] text-white/75 sm:mt-5 sm:text-[17px] sm:leading-[1.55] md:text-[1.125rem] md:leading-[1.6]"
          >
            A real classroom for grammar, writing and speaking. Learn the rule,
            practise it, get corrected, and leave every lesson a little more
            confident.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.86, ease }}
            className="mt-5 flex flex-col items-stretch gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <a
              href="#free-lessons"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#EFAA93] px-6 py-3 text-[15px] font-semibold text-[#152F29] transition hover:-translate-y-0.5 hover:bg-[#F2BAA1] sm:min-h-12 sm:justify-start sm:px-7 sm:py-3.5 sm:text-base"
            >
              Browse free lessons
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a
              href={googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mx-auto inline-flex h-[46px] w-[min(100%,190px)] shrink-0 overflow-hidden rounded-[7px] transition hover:-translate-y-0.5 sm:mx-0 sm:h-[52px] sm:w-[220px]"
              aria-label="Get it on Google Play"
            >
              <Image
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                width={646}
                height={250}
                className="absolute top-1/2 left-1/2 h-[100px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 sm:h-[114px]"
              />
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease }}
            className="mt-6 grid max-w-xl grid-cols-3 gap-3 border-t border-white/15 pt-5 text-left sm:mt-8 sm:gap-6 sm:pt-6"
          >
            {[
              ["2.4k", "Learners and growing"],
              ["12", "Weekly learning labs"],
              ["8 yrs", "On the floor"],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.05 + index * 0.1, ease }}
                className="flex min-w-0 items-center gap-2 sm:gap-2.5"
              >
                <dt className="font-display shrink-0 text-[1.4rem] tracking-[-0.04em] text-white sm:text-[1.85rem]">
                  {value}
                </dt>
                <dd className="max-w-[5.5rem] text-[10px] leading-[1.3] text-white/70 sm:max-w-[6.5rem] sm:text-[12px]">
                  {label}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <div className="hidden min-w-0 lg:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
