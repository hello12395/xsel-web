import { Suspense } from "react";
import type { Metadata } from "next";
import { SignupPage } from "@/components/SignupPage";
import { AuthPageSkeleton } from "@/components/Shimmer";

export const metadata: Metadata = {
  title: "Sign up | Sarwar English Lab",
  description: "Create your Sarwar English Lab account to track lessons and join paid courses.",
};

export default function SignupRoutePage() {
  return (
    <Suspense fallback={<AuthPageSkeleton />}>
      <SignupPage />
    </Suspense>
  );
}
