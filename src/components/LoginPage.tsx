"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signInAction } from "@/app/actions/auth";
import { safeNextPath } from "@/lib/auth-redirect";
import { AuthMobileBackdrop, AuthSideSlideshow } from "./AuthSideSlideshow";
import { EyeIcon, EyeOffIcon } from "./Icons";

const fieldClass =
  "w-full rounded-[12px] border border-[#d9e2d8] bg-[#F3F7F0] px-3.5 py-3.5 text-[15px] leading-none text-ink outline-none transition-all duration-200 placeholder:text-ink/30 hover:border-[#c5d4c4] focus:border-[#152F29]/40 focus:bg-white focus:shadow-[0_0_0_4px_rgba(21,47,41,0.1)] sm:rounded-[14px] sm:px-[18px] sm:py-[15px]";

export function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") === "1";
  const confirmEmail = searchParams.get("confirm") === "1";
  const loginRequired = searchParams.get("required") === "1";
  const nextPath = safeNextPath(searchParams.get("next"));
  const signupHref =
    nextPath !== "/"
      ? `/signup?next=${encodeURIComponent(nextPath)}`
      : "/signup";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signInAction(formData.email, formData.password);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const alerts = (
    <>
      {loginRequired ? (
        <p className="mb-4 rounded-[12px] border border-[#e8d59a] bg-[#fff8e6] px-3.5 py-3 text-[13px] leading-5 text-[#8a6d1a] sm:mb-5 sm:rounded-[14px] sm:px-4">
          Sign in to enroll in paid courses. New here? Create an account first.
        </p>
      ) : null}

      {registered ? (
        <p className="mb-4 rounded-[12px] border border-forest/20 bg-forest/5 px-3.5 py-3 text-[13px] leading-5 text-forest sm:mb-5 sm:rounded-[14px] sm:px-4">
          Account created. You can sign in now.
        </p>
      ) : null}

      {confirmEmail ? (
        <p className="mb-4 rounded-[12px] border border-forest/20 bg-forest/5 px-3.5 py-3 text-[13px] leading-5 text-forest sm:mb-5 sm:rounded-[14px] sm:px-4">
          Check your email to confirm your account, then sign in.
        </p>
      ) : null}

      {error ? (
        <p className="mb-4 rounded-[12px] border border-red-200 bg-red-50 px-3.5 py-3 text-[13px] leading-5 text-red-700 sm:mb-5 sm:rounded-[14px] sm:px-4">
          {error}
        </p>
      ) : null}
    </>
  );

  const formFields = (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="space-y-1.5 sm:space-y-2">
        <label
          htmlFor="email"
          className="block text-[13px] font-medium tracking-wide text-ink/55"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="you@example.com"
          autoComplete="email"
          className={fieldClass}
          required
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label
          htmlFor="password"
          className="block text-[13px] font-medium tracking-wide text-ink/55"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            className={`${fieldClass} pr-12`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute top-1/2 right-3.5 -translate-y-1/2 rounded-lg p-1.5 text-ink/35 transition hover:bg-ink/[0.04] hover:text-ink/70"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOffIcon className="h-[18px] w-[18px]" />
            ) : (
              <EyeIcon className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-0.5 sm:pt-1">
        <label className="group flex cursor-pointer items-center gap-2.5 text-[13px] text-ink/50">
          <span className="relative flex h-[18px] w-[18px] items-center justify-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
            />
            <span className="h-[18px] w-[18px] rounded-[5px] border border-[#c8d3e6] bg-white transition peer-checked:border-forest peer-checked:bg-forest peer-focus-visible:ring-2 peer-focus-visible:ring-forest/25" />
            <svg
              className="pointer-events-none absolute h-2.5 w-2.5 text-white opacity-0 transition peer-checked:opacity-100"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M2.5 6.2 4.8 8.5 9.5 3.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="transition group-hover:text-ink/70">Remember me</span>
        </label>

        <button
          type="button"
          className="text-[13px] font-semibold text-forest underline decoration-forest/20 underline-offset-[3px] transition hover:decoration-forest"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 flex h-12 w-full items-center justify-center rounded-full bg-[#152F29] text-[15px] font-semibold tracking-[0.01em] text-white shadow-[0_14px_30px_-14px_rgba(21,47,41,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a3d35] hover:shadow-[0_18px_36px_-14px_rgba(21,47,41,0.5)] active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 sm:mt-2 sm:h-[52px]"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );

  return (
    <div className="flex min-h-dvh w-full bg-[#FFFCF6]">
      <AuthSideSlideshow />

      {/* —— Mobile: full-bleed photo + sheet (lg hidden) —— */}
      <div className="flex min-h-dvh w-full flex-col bg-[#152F29] lg:hidden">
        <div className="relative">
          <Image
            src="/app_logo.png"
            alt="Sarwar English Lab"
            width={72}
            height={72}
            priority
            unoptimized
            className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-20 h-10 w-10 rounded-[10px] object-contain shadow-[0_8px_20px_-8px_rgba(0,0,0,0.55)] ring-1 ring-white/30"
          />
          <AuthMobileBackdrop>
            <div className="flex flex-col items-start text-left">
              <p className="text-[10px] font-semibold tracking-[0.22em] text-[#EFAA93] uppercase">
                Sarwar English Lab
              </p>
              <h1 className="font-display mt-2 text-[1.85rem] leading-[1.08] tracking-tight text-white">
                Welcome back
              </h1>
            </div>
          </AuthMobileBackdrop>
        </div>

        <div className="relative z-10 -mt-5 flex flex-1 flex-col rounded-t-[28px] bg-[#FFFCF6] px-5 pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-12px_40px_-16px_rgba(0,0,0,0.35)]">
          {alerts}
          {formFields}

          <p className="mt-6 text-center text-[14px] leading-5 text-ink/50">
            Don&apos;t have an account?{" "}
            <Link
              href={signupHref}
              className="font-semibold text-forest underline decoration-forest/25 underline-offset-[3px] transition hover:decoration-forest"
            >
              Sign up
            </Link>
          </p>

          <p className="mt-3 text-center text-[11px] leading-4 text-ink/35">
            By signing in you agree to our learning community guidelines.
          </p>
        </div>
      </div>

      {/* —— Desktop / large: unchanged card layout —— */}
      <main className="relative hidden flex-1 items-center justify-center overflow-hidden px-10 py-14 lg:flex lg:px-14">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 70% 20%, rgba(21,47,41,0.06), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 90%, rgba(239,170,147,0.1), transparent 55%)",
          }}
        />

        <div className="relative w-full max-w-[440px]">
          <div className="overflow-hidden rounded-[28px] border border-[#e6e6d9] bg-white shadow-[0_24px_60px_-28px_rgba(21,47,41,0.28),0_8px_20px_-12px_rgba(21,47,41,0.08)]">
            <div className="border-b border-white/10 bg-gradient-to-b from-[#1a3d35] to-[#152F29] px-8 py-9">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/app_logo.png"
                  alt="Sarwar English Lab"
                  width={200}
                  height={200}
                  priority
                  unoptimized
                  className="h-36 w-auto rounded-2xl object-contain"
                />
              </div>
              <p className="text-center text-[11px] font-semibold tracking-[0.22em] text-[#EFAA93] uppercase">
                Sarwar English Lab
              </p>
              <h1 className="font-display mt-3 text-center text-[2.35rem] leading-[1.08] tracking-tight text-white">
                Welcome back
              </h1>
            </div>

            <div className="px-8 py-8">
              {alerts}
              {formFields}
            </div>
          </div>

          <p className="mt-7 text-center text-[15px] leading-6 text-ink/50">
            Don&apos;t have an account?{" "}
            <Link
              href={signupHref}
              className="font-semibold text-forest underline decoration-forest/25 underline-offset-[3px] transition hover:decoration-forest"
            >
              Sign up
            </Link>
          </p>

          <p className="mt-5 text-center text-[12px] leading-5 text-ink/35">
            By signing in you agree to our learning community guidelines.
          </p>
        </div>
      </main>
    </div>
  );
}
