"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { whyCards } from "@/data/site";
import { Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { WhyCardsSkeleton } from "./Shimmer";
import { ShimmerGate } from "./ShimmerGate";

const cardAccents = [
  {
    numberClass: "text-mark",
    accentBar: "from-mark/80 via-mark/30 to-transparent",
    border:
      "linear-gradient(135deg, rgba(249, 34, 39, 0.9) 0%, rgba(249, 34, 39, 0.35) 45%, rgba(249, 34, 39, 0.75) 100%)",
    glow: "rgba(249, 34, 39, 0.16)",
    ring: "ring-mark/10",
  },
  {
    numberClass: "text-forest",
    accentBar: "from-forest/80 via-forest/30 to-transparent",
    border:
      "linear-gradient(135deg, rgba(28, 48, 190, 0.9) 0%, rgba(28, 48, 190, 0.35) 45%, rgba(28, 48, 190, 0.75) 100%)",
    glow: "rgba(28, 48, 190, 0.18)",
    ring: "ring-forest/10",
  },
  {
    numberClass: "text-gold",
    accentBar: "from-gold/80 via-gold-soft/40 to-transparent",
    border:
      "linear-gradient(135deg, rgba(2, 171, 213, 0.9) 0%, rgba(2, 171, 213, 0.35) 45%, rgba(2, 171, 213, 0.75) 100%)",
    glow: "rgba(2, 171, 213, 0.18)",
    ring: "ring-gold/15",
  },
] as const;

function MethodCard3D({
  number,
  title,
  body,
  index,
}: {
  number: string;
  title: string;
  body: string;
  index: number;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const shineX = useMotionValue("50%");
  const shineY = useMotionValue("50%");

  const spring = { stiffness: 220, damping: 20, mass: 0.65 };
  const rotateX = useSpring(useTransform(y, [0, 1], [18, -18]), spring);
  const rotateY = useSpring(useTransform(x, [0, 1], [-22, 22]), spring);
  const liftZ = useSpring(useTransform(y, [0, 0.5, 1], [28, 48, 28]), spring);
  const scale = useSpring(1, spring);
  const glareX = useSpring(useTransform(x, [0, 1], [-14, 14]), spring);
  const glareY = useSpring(useTransform(y, [0, 1], [-14, 14]), spring);
  const shineBackground = useTransform(
    [shineX, shineY],
    ([sx, sy]) =>
      `radial-gradient(circle at ${sx} ${sy}, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.22) 28%, transparent 64%)`,
  );

  const accent = cardAccents[index % cardAccents.length];

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;

    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    x.set(px);
    y.set(py);
    shineX.set(`${px * 100}%`);
    shineY.set(`${py * 100}%`);
    scale.set(1.045);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
    shineX.set("50%");
    shineY.set("50%");
    scale.set(1);
  }

  return (
    <div
      ref={sceneRef}
      className="method-card-scene h-full py-2"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.article
        className="method-card-3d relative h-full"
        style={{
          rotateX,
          rotateY,
          z: liftZ,
          scale,
          transformStyle: "preserve-3d",
          ["--method-glow" as string]: accent.glow,
        }}
      >
        <div
          className="method-card-float rounded-[24px]"
          style={{ background: `linear-gradient(180deg, ${accent.glow}, transparent)` }}
          aria-hidden
        />

        <div className="method-card-base rounded-[24px]" aria-hidden />

        <div
          className={`method-card-face relative flex h-full min-h-[20rem] flex-col overflow-hidden rounded-[20px] p-5 ring-1 ring-inset sm:min-h-[24rem] sm:rounded-[24px] sm:p-7 md:min-h-[27rem] md:p-8 ${accent.ring}`}
        >
          <div className="method-card-edge" aria-hidden />
          <div className="method-card-rim" aria-hidden />
          <motion.div
            className="method-card-shine"
            style={{ background: shineBackground }}
            aria-hidden
          />

          <motion.div
            className="method-card-glare pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              x: glareX,
              y: glareY,
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.55) 0%, transparent 42%, transparent 100%)",
            }}
            aria-hidden
          />

          <div
            className="method-card-accent-border"
            style={{ background: accent.border }}
            aria-hidden
          />

          <span
            className="pointer-events-none absolute top-5 right-5 font-display text-[5.5rem] leading-none text-ink/[0.05] select-none"
            aria-hidden
          >
            {number}
          </span>

          <div className="method-card-copy relative flex min-h-0 flex-1 flex-col">
            <div className="relative flex items-center gap-3">
              <span className={`font-display text-3xl leading-none ${accent.numberClass}`}>
                {number}
              </span>
              <span className={`h-px flex-1 bg-gradient-to-r ${accent.accentBar}`} />
            </div>

            <h3 className="font-display relative mt-8 text-[1.5rem] leading-[1.2] text-ink md:text-[1.65rem]">
              {title}
            </h3>

            <p className="relative mt-5 flex-1 text-[0.98rem] leading-[1.7] text-ink/80 md:text-base md:leading-[1.7]">
              {body}
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function WhySarwarLab() {
  return (
    <section id="why" className="relative scroll-mt-24 overflow-hidden border-b border-ink/8 bg-method-section">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20 md:px-10 md:py-28 lg:px-12 lg:py-32">
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] xl:gap-16">
          <div className="method-intro-panel min-w-0">
            <SectionHeader
              className="max-w-none"
              title="Why Sarwar English Lab?"
              copy="English isn't something you memorize in a lecture. It's something you work on, like a lab, where you
                  practice, get corrected, and leave with something better than you walked in with."
            />
          </div>

          <ShimmerGate minMs={450} skeleton={<WhyCardsSkeleton />}>
            <Stagger className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-5">
              {whyCards.map((card, index) => (
                <StaggerItem key={card.number} className="h-full">
                  <MethodCard3D
                    number={card.number}
                    title={card.title}
                    body={card.body}
                    index={index}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </ShimmerGate>
        </div>
      </div>
    </section>
  );
}
