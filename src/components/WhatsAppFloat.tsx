"use client";

import { motion } from "motion/react";

const WHATSAPP_CHAT_URL = "https://wa.me/923714059245";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={WHATSAPP_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="fixed right-4 bottom-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_32px_-10px_rgba(37,211,102,0.75)] ring-4 ring-white/70 transition hover:bg-[#1ebe57] sm:right-5 sm:bottom-5"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2.04c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.39 1.24 4.82L2.06 21.9l5.3-1.39A9.86 9.86 0 0 0 12 21.86c5.46 0 9.9-4.44 9.9-9.9 0-5.47-4.44-9.92-9.9-9.92Zm4.86 14.1c-.2.56-1.16 1.03-1.6 1.1-.41.06-.93.08-1.5-.09-.35-.11-.79-.26-1.36-.5-2.4-1.03-3.95-3.44-4.07-3.6-.12-.16-.99-1.32-.99-2.52 0-1.2.63-1.78.85-2.02.22-.25.49-.3.65-.3h.47c.15 0 .35-.06.55.42.2.5.68 1.7.74 1.83.06.12.1.27.02.43-.08.16-.12.27-.25.41-.12.14-.25.31-.35.42-.12.12-.24.24-.1.47.13.22.6.98 1.28 1.59.88.78 1.63 1.03 1.86 1.15.23.11.36.1.5-.06.14-.16.58-.67.73-.9.15-.22.3-.19.52-.11.21.08 1.36.64 1.6.76.23.11.39.17.44.27.06.1.06.56-.14 1.12Z"
        />
      </svg>
    </motion.a>
  );
}
