"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowIcon } from "./Icons";

const SLIDE_INTERVAL_MS = 3500;
const ease = [0.22, 1, 0.36, 1] as const;

export const authSlides = [
  {
    src: "/auth-slides/lab-1.jpg",
    alt: "Sarwar English Lab classroom with screen and podium",
  },
  {
    src: "/auth-slides/lab-2.jpg",
    alt: "Sarwar English Lab seating and teaching setup",
  },
  {
    src: "/auth-slides/lab-3.jpg",
    alt: "Mahmood Sarwar — English instructor portrait",
  },
  {
    src: "/auth-slides/lab-4.jpg",
    alt: "Mahmood Sarwar teaching in the classroom",
  },
  {
    src: "/auth-slides/lab-5.jpg",
    alt: "Mahmood Sarwar at the chalkboard",
  },
  {
    src: "/auth-slides/lab-6.jpg",
    alt: "Mahmood Sarwar at the studio podium",
  },
] as const;

function useAuthSlideIndex() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % authSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  return [index, setIndex] as const;
}

/** Full-bleed photo stack for mobile auth — desktop keeps the side panel. */
export function AuthMobileBackdrop({
  children,
}: {
  children?: ReactNode;
}) {
  const [index, setIndex] = useAuthSlideIndex();
  const active = authSlides[index];

  return (
    <div className="relative isolate min-h-[42dvh] overflow-hidden lg:hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease }}
        >
          <Image
            src={active.src}
            alt={active.alt}
            fill
            priority={index === 0}
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,16,14,0.55) 0%, rgba(21,47,41,0.45) 42%, rgba(21,47,41,0.92) 100%)",
        }}
        aria-hidden
      />

      <Link
        href="/"
        className="absolute top-[max(1rem,env(safe-area-inset-top))] left-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md"
        aria-label="Back to home"
      >
        <ArrowIcon className="h-3.5 w-3.5 -scale-x-100" />
      </Link>

      <div className="absolute right-4 bottom-16 z-10 flex items-center gap-1.5">
        {authSlides.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${slideIndex + 1}`}
            aria-current={slideIndex === index ? "true" : undefined}
            onClick={() => setIndex(slideIndex)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              slideIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>

      {children ? (
        <div className="relative z-10 flex min-h-[42dvh] flex-col justify-end px-5 pb-10 pt-16">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function AuthSideSlideshow() {
  const [index, setIndex] = useAuthSlideIndex();
  const active = authSlides[index];

  return (
    <aside className="relative hidden overflow-hidden bg-[#08101f] lg:flex lg:w-[46%] xl:w-[48%]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.85, ease }}
        >
          <Image
            src={active.src}
            alt={active.alt}
            fill
            priority={index === 0}
            unoptimized
            sizes="48vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />

      <Link
        href="/"
        className="absolute top-7 left-7 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-lg backdrop-blur-md transition hover:bg-black/45"
        aria-label="Back to home"
      >
        <ArrowIcon className="h-4 w-4 -scale-x-100" />
      </Link>

      <div className="absolute right-7 bottom-7 z-10 flex items-center gap-2">
        {authSlides.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${slideIndex + 1}`}
            aria-current={slideIndex === index ? "true" : undefined}
            onClick={() => setIndex(slideIndex)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              slideIndex === index
                ? "w-7 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </aside>
  );
}
