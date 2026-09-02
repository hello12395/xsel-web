"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { discussions } from "@/data/site";
import { ArrowIcon, ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import { Reveal } from "./Reveal";

const CARD_GAP = 20;
const HOST_IMAGE = "/discussions/host.jpg";

const cardThemes = [
  { spine: "bg-mark", glow: "rgba(180, 110, 70, 0.12)", badge: "bg-mark/10 text-mark" },
  { spine: "bg-forest", glow: "rgba(120, 95, 60, 0.12)", badge: "bg-forest/10 text-forest" },
  { spine: "bg-gold", glow: "rgba(160, 130, 70, 0.14)", badge: "bg-gold/10 text-gold" },
] as const;

function authorInitials(name: string) {
  return name
    .replace(".", "")
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function ThreadCard3D({
  title,
  excerpt,
  replies,
  author,
  time,
  index,
  isActive,
}: {
  title: string;
  excerpt: string;
  replies: number;
  author: string;
  time: string;
  index: number;
  isActive: boolean;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const shineX = useMotionValue("50%");
  const shineY = useMotionValue("50%");

  const theme = cardThemes[index % cardThemes.length];

  const spring = { stiffness: 240, damping: 26, mass: 0.75 };
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), spring);
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), spring);
  const liftZ = useSpring(useTransform(y, [0, 0.5, 1], [8, 20, 8]), spring);
  const shineBackground = useTransform(
    [shineX, shineY],
    ([sx, sy]) =>
      `radial-gradient(circle at ${sx} ${sy}, rgba(255,255,255,0.65) 0%, transparent 58%)`,
  );

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!isActive) return;
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
    shineX.set(`${px * 100}%`);
    shineY.set(`${py * 100}%`);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
    shineX.set("50%");
    shineY.set("50%");
  }

  return (
    <motion.div
      ref={sceneRef}
      className="thread-card-scene h-full w-[min(78vw,280px)] shrink-0 sm:w-[300px] lg:w-[320px]"
      animate={{
        scale: isActive ? 1 : 0.92,
        opacity: isActive ? 1 : 0.72,
        y: isActive ? -6 : 0,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.article
        className="thread-card-3d relative h-full"
        style={{
          rotateX: isActive ? rotateX : 0,
          rotateY: isActive ? rotateY : 0,
          z: isActive ? liftZ : 0,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="thread-card-float rounded-[20px]"
          style={{ background: `linear-gradient(180deg, ${theme.glow}, transparent)` }}
          aria-hidden
        />
        <div className="thread-card-base rounded-[20px]" aria-hidden />

        <div
          className="thread-card-face relative flex min-h-[22rem] flex-col overflow-hidden rounded-[20px] pl-5 pr-6 pt-6 pb-6 sm:min-h-[24rem] sm:pl-6 sm:pr-7 sm:pt-7"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className={`thread-card-spine ${theme.spine}`} aria-hidden />
          <motion.div
            className="thread-card-shine"
            style={{ background: shineBackground, opacity: isActive ? 0.5 : 0 }}
            aria-hidden
          />

          <div className="flex items-center justify-between gap-3" style={{ transform: "translateZ(24px)" }}>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] uppercase ${theme.badge}`}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
              Open
            </span>
            <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${theme.badge}`}>
              {replies} replies
            </span>
          </div>

          <h3
            className="font-display mt-6 text-[1.25rem] leading-snug text-ink sm:text-[1.4rem]"
            style={{ transform: "translateZ(32px)" }}
          >
            {title}
          </h3>

          <p
            className="mt-4 flex-1 text-[14px] leading-7 text-ink/62"
            style={{ transform: "translateZ(20px)" }}
          >
            {excerpt}
          </p>

          <div
            className="mt-6 flex items-center justify-between gap-4 border-t border-[#5a462d]/10 pt-5"
            style={{ transform: "translateZ(28px)" }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#efe6d8] font-display text-sm text-ink">
                {authorInitials(author)}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{author}</p>
                <p className="text-xs text-ink/45">{time}</p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-forest"
            >
              Join
              <ArrowIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function CarouselArrow({
  direction,
  onClick,
  disabled,
  className = "",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  className?: string;
}) {
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous discussion" : "Next discussion"}
      disabled={disabled}
      onClick={onClick}
      className={`carousel-nav-btn absolute top-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full text-ink/70 sm:h-12 sm:w-12 ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5a462d]/[0.05] sm:h-9 sm:w-9">
        <Icon className="h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem]" />
      </span>
    </button>
  );
}

export function PendingDiscussions() {
  const [active, setActive] = useState(1);
  const [cardWidth, setCardWidth] = useState(320);
  const trackRef = useRef<HTMLDivElement>(null);
  const count = discussions.length;
  const totalReplies = discussions.reduce((sum, thread) => sum + thread.replies, 0);

  const goTo = useCallback(
    (index: number) => {
      setActive(Math.max(0, Math.min(index, count - 1)));
    },
    [count],
  );

  useEffect(() => {
    const measure = () => {
      const firstCard = trackRef.current?.querySelector<HTMLElement>("[data-thread-card]");
      if (firstCard) setCardWidth(firstCard.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(active + 1);
      if (event.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, goTo]);

  const slideOffset = active * (cardWidth + CARD_GAP);

  return (
    <section id="discussions" className="relative scroll-mt-24 overflow-hidden border-b border-ink/8">
      <div className="grid lg:min-h-[720px] lg:grid-cols-[minmax(0,42%)_minmax(0,1fr)] xl:grid-cols-[minmax(0,44%)_minmax(0,1fr)]">
        <Reveal className="relative min-h-[22rem] sm:min-h-[28rem] lg:min-h-full">
          <Image
            src={HOST_IMAGE}
            alt="Mahmood Sarwar leading a lab discussion"
            fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover object-top"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-ink/10 lg:to-ink/20"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-white/90 uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mark" />
              05 — Open floor
            </span>
            <p className="font-display mt-4 text-2xl text-white sm:text-3xl">Mahmood Sarwar</p>
            <p className="mt-1 text-sm text-white/70">Hosts the open floor every week</p>
          </div>
        </Reveal>

        <div className="relative bg-discussions-floor px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24 xl:px-14">
          <div className="pointer-events-none absolute right-[6%] top-10 font-display text-[8rem] leading-none text-[#5a462d]/[0.06] select-none sm:text-[10rem]">
            05
          </div>

          <Reveal className="relative text-left">
            <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
              Pending Discussions
            </h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {[
                `${discussions.length} threads open`,
                `${totalReplies} replies waiting`,
                "Live board",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[#5a462d]/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink/75 shadow-[0_1px_2px_rgba(70,50,30,0.06)]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-10 min-w-0 lg:mt-12">
            <CarouselArrow
              direction="prev"
              className="left-0 sm:left-1"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
            />
            <CarouselArrow
              direction="next"
              className="right-0 sm:right-1"
              onClick={() => goTo(active + 1)}
              disabled={active === count - 1}
            />

            <div className="overflow-hidden px-9 py-4 sm:px-11 md:px-12">
              <motion.div
                ref={trackRef}
                className="flex"
                style={{ gap: CARD_GAP }}
                animate={{ x: `calc(50% - ${cardWidth / 2}px - ${slideOffset}px)` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {discussions.map((thread, index) => (
                  <div key={thread.title} data-thread-card>
                    <ThreadCard3D
                      title={thread.title}
                      excerpt={thread.excerpt}
                      replies={thread.replies}
                      author={thread.author}
                      time={thread.time}
                      index={index}
                      isActive={index === active}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {discussions.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to discussion ${index + 1}`}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === active ? "w-8 bg-ink" : "w-1.5 bg-[#5a462d]/25 hover:bg-[#5a462d]/45"
                  }`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
