"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { whatsappLinks } from "@/data/site";
import { CloseIcon, WhatsappIcon } from "./Icons";

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-5 sm:bottom-5"
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            aria-label="WhatsApp options"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(100vw-2rem,18.5rem)] overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_18px_48px_-18px_rgba(0,0,0,0.45)]"
          >
            <div className="border-b border-ink/8 bg-[#25D366]/8 px-4 py-3">
              <p className="text-sm font-semibold text-ink">Chat with us</p>
              <p className="mt-0.5 text-xs text-ink/50">Choose Channel or Community</p>
            </div>
            <ul className="p-2">
              {whatsappLinks.map((item) => (
                <li key={item.href}>
                  <a
                    role="menuitem"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[#25D366]/10"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15">
                      <WhatsappIcon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink">{item.label}</span>
                      <span className="mt-0.5 block text-xs text-ink/50">{item.description}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Close WhatsApp options" : "Open WhatsApp options"}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_32px_-10px_rgba(37,211,102,0.75)] ring-4 ring-white/70 transition hover:bg-[#1ebe57]"
      >
        {open ? (
          <CloseIcon className="h-5 w-5" />
        ) : (
          <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
            <path
              fill="currentColor"
              d="M12 2.04c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.39 1.24 4.82L2.06 21.9l5.3-1.39A9.86 9.86 0 0 0 12 21.86c5.46 0 9.9-4.44 9.9-9.9 0-5.47-4.44-9.92-9.9-9.92Zm4.86 14.1c-.2.56-1.16 1.03-1.6 1.1-.41.06-.93.08-1.5-.09-.35-.11-.79-.26-1.36-.5-2.4-1.03-3.95-3.44-4.07-3.6-.12-.16-.99-1.32-.99-2.52 0-1.2.63-1.78.85-2.02.22-.25.49-.3.65-.3h.47c.15 0 .35-.06.55.42.2.5.68 1.7.74 1.83.06.12.1.27.02.43-.08.16-.12.27-.25.41-.12.14-.25.31-.35.42-.12.12-.24.24-.1.47.13.22.6.98 1.28 1.59.88.78 1.63 1.03 1.86 1.15.23.11.36.1.5-.06.14-.16.58-.67.73-.9.15-.22.3-.19.52-.11.21.08 1.36.64 1.6.76.23.11.39.17.44.27.06.1.06.56-.14 1.12Z"
            />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
