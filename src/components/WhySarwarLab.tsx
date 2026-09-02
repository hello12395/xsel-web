"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { whyCards } from "@/data/site";
import { Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const cardAccents = [
  {
    numberClass: "text-mark",
    accentBar: "from-mark/80 via-mark/30 to-transparent",
    glow: "rgba(249, 34, 39, 0.16)",
    ring: "ring-mark/10",
  },
  {
    numberClass: "text-forest",
    accentBar: "from-forest/80 via-forest/30 to-transparent",
    glow: "rgba(28, 48, 190, 0.18)",
    ring: "ring-forest/10",
  },
  {
    numberClass: "text-gold",
    accentBar: "from-gold/80 via-gold-soft/40 to-transparent",
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

  const spring = { stiffness: 260, damping: 24, mass: 0.7 };
  const rotateX = useSpring(useTransform(y, [0, 1], [20, -20]), spring);
  const rotateY = useSpring(useTransform(x, [0, 1], [-20, 20]), spring);
  const liftZ = useSpring(useTransform(y, [0, 0.5, 1], [18, 32, 18]), spring);
  const glareX = useSpring(useTransform(x, [0, 1], [-12, 12]), spring);
  const glareY = useSpring(useTransform(y, [0, 1], [-12, 12]), spring);
  const shineBackground = useTransform(
    [shineX, shineY],
    ([sx, sy]) =>
      `radial-gradient(circle at ${sx} ${sy}, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.2) 28%, transparent 64%)`,
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
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
    shineX.set("50%");
    shineY.set("50%");
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
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="method-card-float rounded-[24px]"
          style={{ background: `linear-gradient(180deg, ${accent.glow}, transparent)` }}
          aria-hidden
        />

        <div className="method-card-base rounded-[24px]" aria-hidden />

        <div
          className={`method-card-face relative flex min-h-[24rem] flex-col overflow-hidden rounded-[24px] p-7 ring-1 ring-inset md:min-h-[27rem] md:p-8 ${accent.ring}`}
          style={{ transform: "translateZ(28px)" }}
        >
          <div className="method-card-edge" aria-hidden />
          <div className="method-card-rim" aria-hidden />
          <motion.div
            className="method-card-shine"
            style={{ background: shineBackground }}
            aria-hidden
          />

          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-60"
            style={{
              x: glareX,
              y: glareY,
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.45) 0%, transparent 42%, transparent 100%)",
            }}
            aria-hidden
          />

          <div
            className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${accent.accentBar}`}
            style={{ transform: "translateZ(4px)" }}
            aria-hidden
          />

          <span
            className="pointer-events-none absolute top-5 right-5 font-display text-[5.5rem] leading-none text-ink/[0.05] select-none"
            style={{ transform: "translateZ(8px)" }}
            aria-hidden
          >
            {number}
          </span>

          <div className="relative flex items-center gap-3" style={{ transform: "translateZ(42px)" }}>
            <span className={`font-display text-3xl leading-none drop-shadow-sm ${accent.numberClass}`}>
              {number}
            </span>
            <span className={`h-px flex-1 bg-gradient-to-r ${accent.accentBar}`} />
          </div>

          <h3
            className="font-display relative mt-8 text-[1.5rem] leading-[1.2] text-ink drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] md:text-[1.65rem]"
            style={{ transform: "translateZ(56px)" }}
          >
            {title}
          </h3>

          <p
            className="relative mt-5 flex-1 text-[0.98rem] leading-[1.75] text-ink/62 md:text-base"
            style={{ transform: "translateZ(36px)" }}
          >
            {body}
          </p>
        </div>
      </motion.article>
    </div>
  );
}

export function WhySarwarLab() {
  return (
    <section id="why" className="relative scroll-mt-24 overflow-hidden border-b border-ink/8 bg-method-section">
      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-28 lg:px-12 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] xl:gap-16">
          <div className="method-intro-panel">
            <SectionHeader
              className="max-w-none"
              kicker="02 — The method"
              title="Why Sarwar Lab?"
              copy="Because English is not a subject you watch. It is a lab you walk into, speak in, and leave with work in your hands."
            />
          </div>

          <Stagger className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-5">
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
        </div>
      </div>
    </section>
  );
}
