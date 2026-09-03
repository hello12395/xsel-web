"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowIcon } from "./Icons";

const SLIDE_INTERVAL_MS = 3500;
const ease = [0.22, 1, 0.36, 1] as const;

const slides = [
  {
    src: "/auth-slides/slide-1.jpg",
    alt: "Mahmood Sarwar — English instructor portrait",
    fit: "cover" as const,
  },
  {
    src: "/auth-slides/slide-2.jpg",
    alt: "Mahmood Sarwar in studio",
    fit: "cover" as const,
  },
  {
    src: "/auth-slides/slide-3.jpg",
    alt: "Mahmood Sarwar with London backdrop",
    fit: "cover" as const,
  },
  {
    src: "/auth-slides/slide-4.jpg",
    alt: "Mahmood Sarwar at desk",
    fit: "cover" as const,
  },
  {
    src: "/auth-slides/slide-5.jpg",
    alt: "English with Mahmood Sarwar — confidence and success",
    fit: "contain" as const,
  },
  {
    src: "/auth-slides/slide-6.jpg",
    alt: "English with Mahmood Sarwar — lessons and fluency",
    fit: "contain" as const,
  },
  {
    src: "/auth-slides/slide-7.jpg",
    alt: "English with Mahmood Sarwar branding",
    fit: "contain" as const,
  },
  {
    src: "/auth-slides/slide-8.jpg",
    alt: "Mahmood Sarwar — mentor portrait",
    fit: "cover" as const,
  },
] as const;

export function AuthSideSlideshow() {
  const [index, setIndex] = useState(0);
  const active = slides[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

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
            sizes="48vw"
            className={
              active.fit === "contain"
                ? "object-contain object-center"
                : "object-cover object-center"
            }
          />
        </motion.div>
      </AnimatePresence>

      <div
        className={`pointer-events-none absolute inset-0 ${
          active.fit === "contain"
            ? "bg-gradient-to-t from-black/25 via-transparent to-transparent"
            : "bg-gradient-to-t from-black/45 via-transparent to-black/20"
        }`}
      />

      <Link
        href="/"
        className="absolute top-7 left-7 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-lg backdrop-blur-md transition hover:bg-black/45"
        aria-label="Back to home"
      >
        <ArrowIcon className="h-4 w-4 -scale-x-100" />
      </Link>

      <div className="absolute right-7 bottom-7 z-10 flex items-center gap-2">
        {slides.map((slide, slideIndex) => (
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
