import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarwar English Lab",
  description:
    "A living classroom for grammar, speaking, writing, and exam-ready English.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-cream text-ink" suppressHydrationWarning>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
