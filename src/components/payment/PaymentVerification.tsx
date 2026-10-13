"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { submitPurchaseReceiptAction } from "@/app/actions/payment";
import {
  bankDetails,
  easyPaisaDetails,
  jazzCashDetails,
  RECEIPT_ACCEPT,
  RECEIPT_MAX_BYTES,
} from "@/lib/payment-config";
import type { Course, CourseBatch, Purchase } from "@/types/course";

const ACCEPTED_TYPES = Object.keys(RECEIPT_ACCEPT);

type PaymentTab = "bank" | "easypaisa" | "jazzcash";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function formatAmount(price: number) {
  return `PKR ${Math.round(Number(price) || 0).toLocaleString("en-PK")}`;
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" strokeLinecap="round" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" strokeLinecap="round" />
    </svg>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path d="M12 16V6M8 9l4-4 4 4M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PAYMENT_TABS: { id: PaymentTab; label: string; short: string; icon: ReactNode }[] = [
  { id: "bank", label: "Bank Transfer", short: "Bank", icon: <BuildingIcon className="h-4 w-4" /> },
  { id: "easypaisa", label: "EasyPaisa", short: "EasyPaisa", icon: <PhoneIcon className="h-4 w-4" /> },
  { id: "jazzcash", label: "JazzCash", short: "JazzCash", icon: <PhoneIcon className="h-4 w-4" /> },
];

function CopyField({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ""));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <div
      className={cn(
        "group flex items-center justify-between gap-3 rounded-xl border border-ink/8 bg-white px-4 py-3.5 transition hover:border-ink/15",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium tracking-wider text-ink/40 uppercase">{label}</p>
        <p className="mt-0.5 break-all font-medium text-ink">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink/40 transition hover:bg-forest/10 hover:text-forest"
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
      >
        {copied ? <CheckIcon className="h-3.5 w-3.5 text-forest" /> : <CopyIcon className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

function PaymentMethodsPanel() {
  const [activeTab, setActiveTab] = useState<PaymentTab>("bank");

  const tabContent: Record<
    PaymentTab,
    { label: string; value: string; fullWidth?: boolean }[]
  > = {
    bank: [
      { label: "Bank Name", value: bankDetails.bankName },
      { label: "Account Title", value: bankDetails.accountHolder },
      {
        label: "IBAN / Account Number",
        value: bankDetails.iban,
        fullWidth: true,
      },
    ],
    easypaisa: [
      { label: "Account Title", value: easyPaisaDetails.accountName },
      { label: "Account Number", value: easyPaisaDetails.accountNumber },
    ],
    jazzcash: [
      { label: "Account Title", value: jazzCashDetails.accountName },
      { label: "Account Number", value: jazzCashDetails.accountNumber },
    ],
  };

  const hints: Record<PaymentTab, string> = {
    bank: "Transfer the exact course amount to the account below.",
    easypaisa: "Send payment via EasyPaisa mobile wallet.",
    jazzcash: "Send payment via JazzCash mobile wallet.",
  };

  return (
    <section className="card-surface overflow-hidden rounded-[22px]">
      <div className="border-b border-ink/8 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">
            1
          </span>
          <div>
            <h2 className="text-base font-semibold text-ink">Send payment</h2>
            <p className="text-sm text-ink/50">Choose a method and copy the account details</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-b border-ink/8 bg-[#f4f7fb] p-2 sm:gap-2.5 sm:p-2.5">
        {PAYMENT_TABS.map((tab) => {
          const active = activeTab === tab.id;
          const tone =
            tab.id === "bank"
              ? active
                ? "bg-[#1c30be] text-white shadow-[0_10px_22px_-12px_rgba(28,48,190,0.7)]"
                : "bg-[#e8ecff] text-[#1c30be] hover:bg-[#dce3ff]"
              : tab.id === "easypaisa"
                ? active
                  ? "bg-[#14804a] text-white shadow-[0_10px_22px_-12px_rgba(20,128,74,0.7)]"
                  : "bg-[#e6f6ec] text-[#14804a] hover:bg-[#d7f0e0]"
                : active
                  ? "bg-[#b42318] text-white shadow-[0_10px_22px_-12px_rgba(180,35,24,0.7)]"
                  : "bg-[#fde8e6] text-[#b42318] hover:bg-[#f9d7d3]";

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs font-semibold transition sm:py-3 sm:text-sm",
                tone,
              )}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.short}</span>
            </button>
          );
        })}
      </div>

      <div className="p-5 sm:p-6">
        <p className="mb-4 text-sm text-ink/50">{hints[activeTab]}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {tabContent[activeTab].map((field) => (
            <CopyField
              key={field.label}
              label={field.label}
              value={field.value}
              className={field.fullWidth ? "sm:col-span-2" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseSummaryBar({
  course,
  batchName,
}: {
  course: Course;
  batchName?: string;
}) {
  return (
    <div className="card-surface flex items-center gap-4 rounded-[22px] p-4 sm:p-5">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ink/5 ring-1 ring-ink/8 sm:h-16 sm:w-16">
        {course.thumbnail_url ? (
          <Image
            src={course.thumbnail_url}
            alt={course.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-xl text-forest">
            {course.title.charAt(0)}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium tracking-wider text-ink/40 uppercase">Course</p>
        <h2 className="mt-0.5 truncate text-base font-semibold text-ink sm:text-lg">{course.title}</h2>
        {batchName ? <p className="mt-0.5 truncate text-sm text-ink/50">{batchName}</p> : null}
      </div>
      <div className="shrink-0 text-right">
        <p className="text-xs text-ink/40">Amount due</p>
        <p className="font-display text-xl tracking-tight text-forest tabular-nums sm:text-2xl">
          {formatAmount(Number(course.price))}
        </p>
      </div>
    </div>
  );
}

function StatusMessage({
  purchase,
  courseId,
}: {
  purchase: Purchase;
  courseId?: string;
}) {
  if (purchase.status === "pending") {
    return (
      <div className="rounded-[22px] border border-[#c9a227]/35 bg-[#fbf6e8] p-5 sm:p-6">
        <div className="flex items-start gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/20 text-[#8a6a08]">
            <ClockIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#8a6a08] uppercase">
              Status · Pending
            </p>
            <h2 className="mt-1 text-lg font-semibold text-ink">Payment under review</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              We received your receipt. Verification usually takes 24–48 hours. You will see the
              result on this page once an admin reviews it.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (purchase.status === "approved") {
    return (
      <div className="rounded-[22px] border border-forest/25 bg-forest/5 p-5 sm:p-6">
        <div className="flex items-start gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-white">
            <CheckIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-forest uppercase">
              Status · Approved
            </p>
            <h2 className="mt-1 text-lg font-semibold text-ink">Payment approved</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Your enrollment is active. You can open the course and start learning.
            </p>
            {courseId ? (
              <Link
                href={`/premium/${courseId}`}
                className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-forest px-5 text-sm font-semibold text-white transition hover:bg-forest-deep"
              >
                View course
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[22px] border border-red-200 bg-red-50/90 p-5 sm:p-6">
      <div className="flex items-start gap-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
          <CloseIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-red-700 uppercase">
            Status · Rejected
          </p>
          <h2 className="mt-1 text-lg font-semibold text-ink">Payment rejected</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">
            Your receipt was not approved. Please review the reason below, then submit a new
            receipt.
          </p>
          <div className="mt-4 rounded-xl border border-red-200/80 bg-white px-4 py-3.5">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-red-700/80 uppercase">
              Reason
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink">
              {purchase.admin_note?.trim() ||
                "No reason was provided. Contact support if you need more detail."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReceiptUploadForm({
  course,
  courseId,
  batchId,
  isResubmit = false,
}: {
  course: Course;
  courseId: string;
  batchId: string;
  isResubmit?: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const validateFile = useCallback((next: File) => {
    if (!ACCEPTED_TYPES.includes(next.type)) {
      setError("Please upload a JPG, PNG, or PDF file.");
      return false;
    }
    if (next.size > RECEIPT_MAX_BYTES) {
      setError("File must be 5MB or smaller.");
      return false;
    }
    setError(null);
    return true;
  }, []);

  function setReceiptFile(next: File) {
    if (!validateFile(next)) return;
    setFile(next);
    if (preview) URL.revokeObjectURL(preview);
    if (next.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(next));
    } else {
      setPreview(null);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setReceiptFile(dropped);
  }

  async function onSubmit() {
    if (!file) {
      setError("Please select a receipt to upload.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.set("courseId", courseId);
      formData.set("batchId", batchId);
      formData.set("file", file);
      const result = await submitPurchaseReceiptAction(formData);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setSubmitted(true);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to submit payment");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <StatusMessage
        purchase={{
          id: "",
          user_id: "",
          course_id: courseId,
          batch_id: batchId,
          amount: Number(course.price),
          status: "pending",
          receipt_url: null,
          admin_note: null,
          created_at: new Date().toISOString(),
          approved_at: null,
        }}
        courseId={courseId}
      />
    );
  }

  return (
    <section className="card-surface rounded-[22px]">
      <div className="border-b border-ink/8 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">
            2
          </span>
          <div>
            <h2 className="text-base font-semibold text-ink">
              {isResubmit ? "Upload a new receipt" : "Upload receipt"}
            </h2>
            <p className="text-sm text-ink/50">JPG, PNG or PDF · Max 5MB</p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 transition",
            dragOver
              ? "border-forest bg-forest/8"
              : "border-ink/15 bg-cream/40 hover:border-forest/40 hover:bg-forest/5"
          )}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest/15 text-forest">
            <UploadIcon className="h-5 w-5" />
          </div>
          <p className="mt-3 text-sm font-medium text-ink">
            {file ? file.name : "Drop receipt here or click to browse"}
          </p>
          <p className="mt-1 text-xs text-ink/40">JPG, PNG or PDF · Max 5MB</p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (selected) setReceiptFile(selected);
            }}
          />
        </div>

        {preview && (
          <div className="relative mt-4 overflow-hidden rounded-xl border border-ink/10 bg-cream/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Receipt preview"
              className="max-h-40 w-full object-contain p-2"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                if (preview) URL.revokeObjectURL(preview);
                setPreview(null);
              }}
              className="absolute top-2 right-2 rounded-full bg-black/50 p-1 text-white"
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {file && !preview && (
          <p className="mt-3 text-center text-sm text-ink/50">PDF ready: {file.name}</p>
        )}

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            disabled={loading || !file}
            onClick={onSubmit}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-forest px-5 text-sm font-semibold text-white transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : isResubmit ? "Resubmit for verification" : "Submit for verification"}
            {!loading && <SendIcon className="h-4 w-4" />}
          </button>
          <Link
            href={`/premium/${courseId}`}
            className="inline-flex h-11 items-center justify-center rounded-full border border-ink/15 bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/25"
          >
            Cancel
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PaymentVerification({
  course,
  batches,
  selectedBatchId,
  existingPurchase,
}: {
  course: Course;
  batches: CourseBatch[];
  selectedBatchId: string;
  existingPurchase: Purchase | null;
}) {
  const selectedBatch =
    batches.find((b) => b.id === selectedBatchId) ?? batches[0] ?? null;
  const batchId = selectedBatch?.id ?? selectedBatchId;
  const status = existingPurchase?.status ?? null;
  const showPaymentSteps = !status || status === "rejected";
  const showUpload = !existingPurchase || status === "rejected";

  if (!selectedBatch) {
    return (
      <div className="card-surface rounded-[24px] p-6 sm:p-8">
        <h2 className="font-display text-2xl tracking-tight text-ink">No open batches</h2>
        <p className="mt-3 text-[15px] leading-7 text-ink/60">
          This course has no active or upcoming batches for enrollment right now. Check back soon
          or ask about the next cohort.
        </p>
        <a
          href="/#location"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-deep"
        >
          Ask about enrollment
        </a>
      </div>
    );
  }

  const heading =
    status === "approved"
      ? "Enrollment confirmed"
      : status === "pending"
        ? "Verification in progress"
        : status === "rejected"
          ? "Action needed"
          : "Complete your enrollment";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:items-stretch lg:gap-5">
        <div className="relative overflow-hidden rounded-[22px] border border-[#0a2340]/10 bg-gradient-to-br from-[#0a2340] via-[#122a4a] to-[#0c4a66] p-5 shadow-[0_20px_40px_-24px_rgba(10,35,64,0.55)] sm:rounded-[24px] sm:p-6">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#37ccf8]/15 blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-12 left-8 h-28 w-28 rounded-full bg-white/10 blur-2xl"
            aria-hidden
          />
          <p className="relative text-[11px] font-semibold tracking-[0.24em] text-[#37ccf8]/90 uppercase">
            Enrollment checkout
          </p>
          <h2 className="font-display relative mt-3 text-2xl leading-tight tracking-tight text-white sm:text-[2rem]">
            {heading}
          </h2>
          <p className="relative mt-3 max-w-md text-sm leading-6 text-white/65">
            Secure your seat with a quick payment and receipt upload.
          </p>
        </div>

        {!status ? (
          <div className="rounded-[22px] bg-[#1f7a38] px-4 py-4 text-sm leading-relaxed font-medium text-white shadow-[0_16px_32px_-18px_rgba(31,122,56,0.55)] sm:rounded-[24px] sm:px-5 sm:py-5">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-white/75 uppercase">
              How to enroll
            </p>
            <ol className="mt-3 space-y-2">
              <li className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[11px] font-bold">
                  1
                </span>
                <span>Pay the course fee</span>
              </li>
              <li className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[11px] font-bold">
                  2
                </span>
                <span>Upload the receipt</span>
              </li>
              <li className="flex gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[11px] font-bold">
                  3
                </span>
                <span>
                  Wait for verification by admins
                  <span className="mt-0.5 block text-[12px] font-normal text-white/85">
                    (Might take up to 24 hours)
                  </span>
                </span>
              </li>
            </ol>
          </div>
        ) : (
          <div className="flex items-center rounded-[22px] bg-[#1f7a38] px-4 py-4 text-sm leading-relaxed font-medium text-white shadow-[0_16px_32px_-18px_rgba(31,122,56,0.55)] sm:rounded-[24px] sm:px-5">
            {status === "approved"
              ? "Your payment was approved and your seat is confirmed."
              : status === "pending"
                ? "Your receipt is with our team. Check back here for the decision."
                : "Your previous submission was rejected. Review the reason and upload a new receipt."}
          </div>
        )}
      </div>

      <CourseSummaryBar course={course} batchName={selectedBatch.name} />

      {existingPurchase ? (
        <StatusMessage purchase={existingPurchase} courseId={course.id} />
      ) : null}

      {showPaymentSteps ? (
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3">
            <PaymentMethodsPanel />
          </div>
          <div className="lg:col-span-2">
            {showUpload ? (
              <ReceiptUploadForm
                course={course}
                courseId={course.id}
                batchId={batchId}
                isResubmit={status === "rejected"}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
