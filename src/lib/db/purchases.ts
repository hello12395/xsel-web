import type { SupabaseClient } from "@supabase/supabase-js";
import { createServiceClient } from "@/lib/supabase/admin";
import type { Purchase } from "@/types/course";

async function getPaymentDbClient(): Promise<SupabaseClient> {
  const service = createServiceClient();
  if (!service) {
    throw new Error(
      "Payment requires SUPABASE_SERVICE_ROLE_KEY in server config."
    );
  }
  return service;
}

async function getActiveEnrollmentForBatch(
  userId: string,
  batchId: string,
  client: SupabaseClient
) {
  const { data, error } = await client
    .from("course_enrollments")
    .select("id")
    .eq("user_id", userId)
    .eq("batch_id", batchId)
    .eq("status", "active")
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getUserPurchaseForCourse(
  userId: string,
  courseId: string,
  batchId?: string | null
): Promise<Purchase | null> {
  const supabase = await getPaymentDbClient();

  let query = supabase
    .from("purchases")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (batchId) {
    query = query.eq("batch_id", batchId);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    if (error.code === "PGRST116" || error.code === "42501") return null;
    throw error;
  }
  return data as Purchase | null;
}

export async function createPurchaseRequest(
  userId: string,
  courseId: string,
  amount: number,
  receiptUrl: string,
  batchId: string
): Promise<Purchase> {
  if (!userId?.trim()) throw new Error("User ID is required to save a purchase.");
  if (!courseId?.trim()) throw new Error("Course ID is required to save a purchase.");
  if (!batchId?.trim()) throw new Error("Batch ID is required to save a purchase.");
  if (!receiptUrl?.trim()) throw new Error("Receipt is required to save a purchase.");

  const supabase = await getPaymentDbClient();

  const existing = await getUserPurchaseForCourse(userId, courseId, batchId);
  if (existing?.status === "pending") {
    throw new Error("You already have a payment pending review for this batch.");
  }
  if (existing?.status === "approved") {
    throw new Error("You have already purchased this batch.");
  }

  const enrollment = await getActiveEnrollmentForBatch(userId, batchId, supabase);
  if (enrollment) {
    throw new Error("You are already enrolled in this batch.");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();
  if (profileError) throw profileError;
  if (!profile) {
    throw new Error("Your account profile was not found. Please sign in again.");
  }

  const { data, error } = await supabase
    .from("purchases")
    .insert({
      user_id: userId,
      course_id: courseId,
      batch_id: batchId,
      amount,
      receipt_url: receiptUrl,
      status: "pending",
    })
    .select()
    .single();
  if (error) throw error;
  return data as Purchase;
}

export async function uploadPurchaseReceipt(
  userId: string,
  courseId: string,
  file: File
): Promise<string> {
  const service = createServiceClient();
  if (!service) {
    throw new Error(
      "Receipt upload requires SUPABASE_SERVICE_ROLE_KEY in server config."
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const path = `${userId}/${courseId}/${Date.now()}.${ext}`;
  const { error } = await service.storage
    .from("purchase-receipts")
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;

  const { data, error: signedError } = await service.storage
    .from("purchase-receipts")
    .createSignedUrl(path, 60 * 60 * 24 * 365);
  if (signedError) throw signedError;
  return data.signedUrl;
}
