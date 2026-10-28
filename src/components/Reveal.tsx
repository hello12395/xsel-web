"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const viewport = { once: true, amount: 0.12, margin: "0px 0px -8% 0px" } as const;

type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "fade";

const revealFrom: Record<
  RevealVariant,
  { opacity: number; x?: number; y?: number; scale?: number }
> = {
  up: { opacity: 0, y: 36 },
  down: { opacity: 0, y: -28 },
  left: { opacity: 0, x: -36 },
  right: { opacity: 0, x: 36 },
  scale: { opacity: 0, y: 24, scale: 0.94 },
  fade: { opacity: 0 },
};

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
  variant?: RevealVariant;
};

/**
 * Fade/slide-in when scrolled into view.
 * Long safety timeout only — short force-show would skip scroll animations.
 */
export function Reveal({
  children,
  delay = 0,
  y,
  variant = "up",
  className,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewport);
  const reduceMotion = useReducedMotion();
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setForceShow(true), 6000);
    return () => window.clearTimeout(t);
  }, []);

  const show = inView || forceShow || !!reduceMotion;
  const from = revealFrom[variant];
  const initial = reduceMotion
    ? { opacity: 1 }
    : {
        opacity: from.opacity,
        x: from.x ?? 0,
        y: y ?? from.y ?? 0,
        scale: from.scale ?? 1,
      };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={
        show
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : initial
      }
      transition={{
        duration: reduceMotion ? 0.01 : 0.7,
        delay: show && !reduceMotion ? delay : 0,
        ease,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0.09,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewport);
  const reduceMotion = useReducedMotion();
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setForceShow(true), 6000);
    return () => window.clearTimeout(t);
  }, []);

  const show = inView || forceShow || !!reduceMotion;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={show ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduceMotion ? 0 : delay,
            delayChildren: reduceMotion ? 0 : 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 32, scale: 0.96 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: reduceMotion ? 0.01 : 0.65,
            ease,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
