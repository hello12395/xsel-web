"use client";

import { LoginPage } from "./LoginPage";

/** Signup uses the same auth card as login; form switches in place. */
export function SignupPage() {
  return <LoginPage initialMode="signup" />;
}
