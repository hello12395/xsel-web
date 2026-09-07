"use server";

import { revalidatePath } from "next/cache";
import { getBatchForCourse } from "@/lib/db/batches";
import { getPublishedCourseById } from "@/lib/db/courses";
import {
  createPurchaseRequest,
  uploadPurchaseReceipt,
} from "@/lib/db/purchases";
import { RECEIPT_ACCEPT, RECEIPT_MAX_BYTES } from "@/lib/payment-config";
import { createClient } from "@/lib/supabase/server";

export async function submitPurchaseReceiptAction(
  formData: FormData
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { ok: false, message: "Please sign in to submit a payment receipt." };
    }

    const courseId = String(formData.get("courseId") ?? "").trim();
    const batchId = String(formData.get("batchId") ?? "").trim();
    const file = formData.get("file");
    const userId = user.id;

    if (!courseId) return { ok: false, message: "Course ID is required." };
    if (!batchId) return { ok: false, message: "Batch ID is required." };
    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, message: "Please select a receipt to upload." };
    }

    const acceptedTypes = Object.keys(RECEIPT_ACCEPT);
    if (!acceptedTypes.includes(file.type)) {
      return { ok: false, message: "Please upload a JPG, PNG, or PDF file." };
    }
    if (file.size > RECEIPT_MAX_BYTES) {
      return { ok: false, message: "File must be 5MB or smaller." };
    }

    const course = await getPublishedCourseById(courseId);
    if (!course) {
      return {
        ok: false,
        message: "Course not found or not available for purchase.",
      };
    }

    const batch = await getBatchForCourse(batchId, courseId);
    if (!batch) {
      return { ok: false, message: "Batch not found for this course." };
    }

    const receiptUrl = await uploadPurchaseReceipt(userId, courseId, file);
    await createPurchaseRequest(
      userId,
      courseId,
      Number(course.price),
      receiptUrl,
      batchId
    );

    revalidatePath(`/premium/${courseId}`);
    revalidatePath(`/premium/${courseId}/enroll`);
    return { ok: true };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Failed to submit payment receipt.";
    return { ok: false, message };
  }
}
