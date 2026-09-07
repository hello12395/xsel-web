import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedCourseById } from "@/lib/db/courses";
import { getOpenBatchesForCourse, pickDefaultBatch } from "@/lib/db/batches";
import { getUserPurchaseForCourse } from "@/lib/db/purchases";
import { createClient } from "@/lib/supabase/server";
import { ArrowIcon } from "@/components/Icons";
import { PaymentVerification } from "@/components/payment/PaymentVerification";
import type { Course, Purchase } from "@/types/course";

type EnrollPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ batchId?: string }>;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function generateMetadata({
  params,
}: EnrollPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const row = await getPublishedCourseById(id);
    if (!row) return { title: "Enroll | English Sarwar Lab" };
    return {
      title: `Enroll · ${row.title} | English Sarwar Lab`,
      description: `Complete payment to enroll in ${row.title}.`,
    };
  } catch {
    return { title: "Enroll | English Sarwar Lab" };
  }
}

export default async function PremiumEnrollPage({
  params,
  searchParams,
}: EnrollPageProps) {
  const { id } = await params;
  const { batchId: batchIdParam } = await searchParams;

  if (!UUID_RE.test(id)) notFound();

  const row = await getPublishedCourseById(id);
  if (!row) notFound();

  const paymentCourse: Course = {
    id: row.id,
    title: row.title,
    description: row.description,
    course_type: row.course_type,
    category: row.category,
    price: row.price,
    thumbnail_url: row.thumbnail_url,
    instructor_id: row.instructor_id,
    status: row.status,
    registration_deadline: row.registration_deadline,
    course_start_date: row.course_start_date,
    fake_enrollments: row.fake_enrollments,
    learning_outcomes: row.learning_outcomes,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/login?next=${encodeURIComponent(`/premium/${id}/enroll`)}&required=1`
    );
  }

  const batches = await getOpenBatchesForCourse(id);
  const requestedBatch =
    batchIdParam && UUID_RE.test(batchIdParam)
      ? batches.find((b) => b.id === batchIdParam)
      : undefined;
  const selectedBatch = requestedBatch ?? pickDefaultBatch(batches);
  const selectedBatchId = selectedBatch?.id ?? "";

  let existingPurchase: Purchase | null = null;
  if (selectedBatchId) {
    try {
      existingPurchase = await getUserPurchaseForCourse(
        user.id,
        id,
        selectedBatchId
      );
    } catch {
      existingPurchase = null;
    }
  }

  return (
    <main className="min-h-dvh bg-[linear-gradient(180deg,#f7f4ec_0%,#f3efe6_45%,#efe9df_100%)]">
      <div className="border-b border-white/10 bg-forest">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 pt-24 md:px-8 md:pt-28">
          <Link
            href={`/premium/${id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white"
          >
            <ArrowIcon className="h-4 w-4 -scale-x-100" />
            Back to course
          </Link>
          <p className="hidden text-sm font-medium text-white/60 sm:block">
            Secure enrollment · English Sarwar Lab
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-12">
        <PaymentVerification
          course={paymentCourse}
          batches={batches}
          selectedBatchId={selectedBatchId}
          existingPurchase={existingPurchase}
        />
      </div>
    </main>
  );
}
