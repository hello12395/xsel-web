"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowIcon, ChevronDownIcon } from "./Icons";

const googlePlayUrl = "https://play.google.com/store/apps/details?id=app.xsel";
const DESKTOP_HERO_VIDEO = "/studio-hero.mp4";
const MOBILE_HERO_VIDEO = "/studio-hero-mobile.mp4";

const ease = [0.22, 1, 0.36, 1] as const;

function ScrollCue() {
  const reduceMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.a
      href="#why"
      aria-label="Scroll to explore the lab"
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: hidden ? 0 : 1,
        y: hidden ? 12 : 0,
      }}
      transition={{
        duration: 0.45,
        delay: hidden ? 0 : 1.15,
        ease,
      }}
      className={`hero-scroll-cue absolute right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-20 flex scale-90 flex-col items-center gap-1.5 sm:right-auto sm:bottom-8 sm:left-1/2 sm:scale-100 sm:-translate-x-1/2 sm:gap-3 ${
        hidden ? "pointer-events-none" : ""
      }`}
    >
      <span className="hero-scroll-cue__label hidden text-[10px] font-semibold tracking-[0.36em] text-white/70 uppercase sm:inline">
        Scroll
      </span>

      <span className="relative flex h-9 w-9 items-center justify-center sm:h-12 sm:w-12">
        {!reduceMotion ? (
          <>
            <span className="hero-scroll-cue__ring" aria-hidden />
            <span className="hero-scroll-cue__ring hero-scroll-cue__ring--delay" aria-hidden />
          </>
        ) : null}

        <span className="relative flex h-8 w-[18px] items-start justify-center rounded-full border border-white/45 bg-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-[2px] sm:h-10 sm:w-6">
          <motion.span
            className="mt-1.5 h-1.5 w-1 rounded-full bg-[#efaa93] shadow-[0_0_10px_rgba(239,170,147,0.85)]"
            aria-hidden
            animate={
              reduceMotion
                ? undefined
                : { y: [0, 12, 0], opacity: [1, 0.35, 1] }
            }
            transition={{
              duration: 1.55,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </span>
      </span>

      <span className="hidden flex-col items-center -space-y-2.5 text-white/55 sm:flex" aria-hidden>
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            animate={
              reduceMotion
                ? undefined
                : { opacity: [0.25, 1, 0.25], y: [0, 3, 0] }
            }
            transition={{
              duration: 1.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.18,
            }}
          >
            <ChevronDownIcon className="h-4 w-4" />
          </motion.span>
        ))}
      </span>
    </motion.a>
  );
}

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
  const [heroVideo, setHeroVideo] = useState(DESKTOP_HERO_VIDEO);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const sync = () => {
      setHeroVideo(media.matches ? MOBILE_HERO_VIDEO : DESKTOP_HERO_VIDEO);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <section id="hero" className="relative min-h-dvh w-full overflow-hidden bg-black">
      <video
        key={heroVideo}
        className="absolute inset-0 h-full w-full object-cover object-center sm:object-[72%_center]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="English teacher leading a studio lesson"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20 sm:from-black/80 sm:via-black/40 sm:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30 sm:from-black/55 sm:via-transparent sm:to-black/20" />

      <div className="relative z-10 flex min-h-dvh items-end px-4 pt-20 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:items-center sm:px-8 sm:pt-28 sm:pb-20 md:px-10 md:pb-16 lg:px-16 lg:pt-32 xl:px-24">
        <div className="w-full max-w-3xl pb-1 text-left sm:pb-0 lg:max-w-4xl xl:max-w-[58rem]">
          <h1 className="text-left text-white">
            <RevealLine
              delay={0.12}
              className="font-display text-[clamp(2.75rem,12vw,5.25rem)] leading-[1.02] tracking-[-0.07em] sm:text-[clamp(2.15rem,9vw,5.25rem)] sm:tracking-[-0.075em]"
            >
              English,
            </RevealLine>
            <RevealLine
              delay={0.42}
              className="font-display mt-1.5 text-[clamp(2.35rem,10.5vw,4.75rem)] leading-[1.02] tracking-[-0.07em] sm:mt-3 sm:text-[clamp(1.7rem,7.5vw,4.75rem)] sm:tracking-[-0.075em]"
            >
              taught live.
            </RevealLine>
            <RevealLine
              delay={0.56}
              className="em-serif mt-2.5 text-[clamp(2.35rem,10.5vw,4.75rem)] leading-[1.02] text-white sm:mt-6 sm:text-[clamp(1.7rem,7.5vw,4.75rem)]"
            >
              Put to work.
            </RevealLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease }}
            className="mt-5 max-w-xl text-left text-[16px] leading-7 text-white/85 sm:mt-8 sm:max-w-2xl sm:text-xl sm:leading-8 md:text-[1.375rem] md:leading-9 lg:max-w-none lg:text-[1.5rem] lg:leading-10"
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
              href="#free-lessons"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90 sm:justify-start sm:px-7 sm:py-4 sm:text-base"
            >
              Browse free lessons
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a
              href={googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mx-auto inline-flex h-[48px] w-[min(100%,200px)] shrink-0 overflow-hidden rounded-[7px] transition hover:-translate-y-0.5 sm:mx-0 sm:h-[56px] sm:w-[238px]"
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
            className="mt-7 grid max-w-3xl grid-cols-3 gap-3 border-t border-white/15 pt-5 text-left sm:mt-12 sm:gap-6 sm:pt-8 lg:max-w-4xl"
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
                <dt className="font-display text-[1.65rem] tracking-[-0.04em] text-white sm:text-3xl md:text-4xl">
                  {value}
                </dt>
                <dd className="mt-1 text-[11px] tracking-[0.1em] text-white/55 uppercase sm:mt-1.5 sm:text-xs sm:tracking-[0.16em] md:text-sm">
                  {label}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
