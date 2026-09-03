import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginPage } from "@/components/LoginPage";

export const metadata: Metadata = {
  title: "Sign in | English Sarwar Lab",
  description: "Sign in to English Sarwar Lab to track lessons and enroll in premium courses.",
};

export default function LoginRoutePage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#f7f9fc]" />}>
      <LoginPage />
    </Suspense>
  );
}
