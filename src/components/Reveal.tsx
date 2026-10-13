"use client";

import { motion, useInView, type HTMLMotionProps } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

/**
 * Fade/slide-in when visible. Falls back to visible after a short timeout
 * so remounts / Suspense client switches never leave sections blank.
 */
export function Reveal({ children, delay = 0, y = 24, className, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08, margin: "80px 0px" });
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setForceShow(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  const show = inView || forceShow;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.65, delay: show ? delay : 0, ease }}
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
  delay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.06, margin: "100px 0px" });
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setForceShow(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  const show = inView || forceShow;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={show ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: delay, delayChildren: 0.06 },
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
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
