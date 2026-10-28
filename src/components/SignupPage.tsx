"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signUpAction } from "@/app/actions/auth";
import { safeNextPath } from "@/lib/auth-redirect";
import { AuthMobileBackdrop, AuthSideSlideshow } from "./AuthSideSlideshow";
import { EyeIcon, EyeOffIcon } from "./Icons";

const fieldClass =
  "w-full rounded-[12px] border border-[#d7e0f0] bg-[#eef3fb] px-3.5 py-3.5 text-[15px] leading-none text-ink outline-none transition-all duration-200 placeholder:text-ink/30 hover:border-[#c5d1e6] focus:border-forest/45 focus:bg-white focus:shadow-[0_0_0_4px_rgba(28,48,190,0.1)] sm:rounded-[14px] sm:px-[18px] sm:py-[15px]";

export function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = safeNextPath(searchParams.get("next"));
  const nextQuery =
    nextPath !== "/" ? `&next=${encodeURIComponent(nextPath)}` : "";
  const loginHref =
    nextPath !== "/"
      ? `/login?next=${encodeURIComponent(nextPath)}&required=1`
      : "/login";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
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
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      const result = await signUpAction(
        formData.email,
        formData.password,
        formData.name,
      );

      if (!result.ok) {
        setError(result.message);
        return;
      }

      if (result.needsEmailConfirmation) {
        router.push(`/login?confirm=1${nextQuery}`);
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

  const errorAlert = error ? (
    <p className="mb-4 rounded-[12px] border border-red-200 bg-red-50 px-3.5 py-3 text-[13px] leading-5 text-red-700 sm:mb-5 sm:rounded-[14px] sm:px-4">
      {error}
    </p>
  ) : null;

  const formFields = (
    <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
      <div className="space-y-1.5 sm:space-y-2">
        <label
          htmlFor="name"
          className="block text-[13px] font-medium tracking-wide text-ink/55"
        >
          Full name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your name"
          autoComplete="name"
          className={fieldClass}
          required
        />
      </div>

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
            placeholder="Create a password"
            autoComplete="new-password"
            className={`${fieldClass} pr-12`}
            required
            minLength={8}
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

      <div className="space-y-1.5 sm:space-y-2">
        <label
          htmlFor="confirmPassword"
          className="block text-[13px] font-medium tracking-wide text-ink/55"
        >
          Confirm password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm password"
            autoComplete="new-password"
            className={`${fieldClass} pr-12`}
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((value) => !value)}
            className="absolute top-1/2 right-3.5 -translate-y-1/2 rounded-lg p-1.5 text-ink/35 transition hover:bg-ink/[0.04] hover:text-ink/70"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOffIcon className="h-[18px] w-[18px]" />
            ) : (
              <EyeIcon className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>

      <label className="group flex cursor-pointer items-start gap-2.5 pt-0.5 text-[13px] leading-5 text-ink/50 sm:pt-1">
        <span className="relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleInputChange}
            className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
            required
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
        <span>
          I agree to the{" "}
          <button
            type="button"
            className="font-semibold text-forest underline decoration-forest/20 underline-offset-[3px]"
          >
            Terms of Service
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="font-semibold text-forest underline decoration-forest/20 underline-offset-[3px]"
          >
            Privacy Policy
          </button>
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 flex h-12 w-full items-center justify-center rounded-full bg-ink text-[15px] font-semibold tracking-[0.01em] text-white shadow-[0_14px_30px_-14px_rgba(18,22,74,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest hover:shadow-[0_18px_36px_-14px_rgba(28,48,190,0.5)] active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 sm:mt-2 sm:h-[52px]"
      >
        {loading ? "Creating account…" : "Create account"}
      </button>
    </form>
  );

  return (
    <div className="flex min-h-dvh w-full bg-[#2d261e]">
      <AuthSideSlideshow />

      {/* —— Mobile: full-bleed photo + sheet —— */}
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
                Create account
              </h1>
            </div>
          </AuthMobileBackdrop>
        </div>

        <div className="relative z-10 -mt-5 flex flex-1 flex-col rounded-t-[28px] bg-[#f7f1e8] px-5 pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-12px_40px_-16px_rgba(0,0,0,0.35)]">
          {errorAlert}
          {formFields}

          <p className="mt-6 text-center text-[14px] leading-5 text-ink/50">
            Already have an account?{" "}
            <Link
              href={loginHref}
              className="font-semibold text-forest underline decoration-forest/25 underline-offset-[3px] transition hover:decoration-forest"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-3 text-center text-[11px] leading-4 text-ink/35">
            By creating an account you agree to our learning community guidelines.
          </p>
        </div>
      </div>

      {/* —— Desktop: unchanged card layout —— */}
      <main className="relative hidden flex-1 items-center justify-center overflow-hidden px-10 py-14 lg:flex lg:px-14">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(90,70,45,0.35), transparent 55%), radial-gradient(ellipse 70% 50% at 85% 15%, rgba(180,130,70,0.14), transparent 55%), radial-gradient(ellipse 55% 45% at 70% 90%, rgba(120,70,40,0.12), transparent 50%), linear-gradient(160deg, #3a3128 0%, #2d261e 45%, #241f19 100%)",
          }}
        />

        <div className="relative w-full max-w-[440px]">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#f7f1e8] shadow-[0_28px_64px_-24px_rgba(0,0,0,0.55),0_10px_24px_-12px_rgba(0,0,0,0.35)]">
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
                Create account
              </h1>
            </div>

            <div className="px-8 py-8">
              {errorAlert}
              {formFields}
            </div>
          </div>

          <p className="mt-7 text-center text-[15px] leading-6 text-white/55">
            Already have an account?{" "}
            <Link
              href={loginHref}
              className="font-semibold text-[#e0c070] underline decoration-[#e0c070]/30 underline-offset-[3px] transition hover:decoration-[#e0c070]"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-5 text-center text-[12px] leading-5 text-white/35">
            By creating an account you agree to our learning community guidelines.
          </p>
        </div>
      </main>
    </div>
  );
}
