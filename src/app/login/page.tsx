import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginPage } from "@/components/LoginPage";
import { AuthPageSkeleton } from "@/components/Shimmer";

export const metadata: Metadata = {
  title: "Sign in | Sarwar English Lab",
  description: "Sign in to Sarwar English Lab to track lessons and enroll in paid courses.",
};

export default function LoginRoutePage() {
  return (
    <Suspense fallback={<AuthPageSkeleton />}>
      <LoginPage />
    </Suspense>
  );
}
