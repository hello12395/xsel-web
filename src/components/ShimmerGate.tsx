"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

type ShimmerGateProps = {
  children: ReactNode;
  skeleton: ReactNode;
  /** Minimum time to show shimmer so it is visible (ms). */
  minMs?: number;
  className?: string;
};

/**
 * Shows a shimmer skeleton on first paint, then swaps to real content
 * after a short delay — covers hydration gaps and empty sections.
 */
export function ShimmerGate({
  children,
  skeleton,
  minMs = 550,
  className,
}: ShimmerGateProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), minMs);
    return () => window.clearTimeout(t);
  }, [minMs]);

  return (
    <div className={className} aria-busy={!ready}>
      <AnimatePresence mode="wait">
        {!ready ? (
          <motion.div
            key="shimmer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {skeleton}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
