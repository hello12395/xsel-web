import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginPage } from "@/components/LoginPage";


export const metadata: Metadata = {
  title: "Sign in | Sarwar English Lab",
  description: "Sign in to Sarwar English Lab to track lessons and enroll in paid courses.",
};

export default function LoginRoutePage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#f7f9fc]" />}>
      <LoginPage />
    </Suspense>
  );
}
