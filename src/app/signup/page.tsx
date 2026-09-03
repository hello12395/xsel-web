import { Suspense } from "react";
import type { Metadata } from "next";
import { SignupPage } from "@/components/SignupPage";

export const metadata: Metadata = {
  title: "Sign up | English Sarwar Lab",
  description: "Create your English Sarwar Lab account to track lessons and join premium courses.",
};

export default function SignupRoutePage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#f7f9fc]" />}>
      <SignupPage />
    </Suspense>
  );
}
