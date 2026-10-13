import { createPublicClient } from "@/lib/supabase/public";
import { createServiceClient } from "@/lib/supabase/admin";
import type { CourseBatch } from "@/types/course";

/** Open batches students can purchase for a course. */
export async function getOpenBatchesForCourse(
  courseId: string
): Promise<CourseBatch[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("course_batches")
    .select("*")
    .eq("course_id", courseId)
    .in("status", ["active", "upcoming"])
    .order("start_date", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as CourseBatch[];
}

/** Batch must belong to the given course. */
export async function getBatchForCourse(
  batchId: string,
  courseId: string
): Promise<CourseBatch | null> {
  const service = createServiceClient();
  const supabase = service ?? createPublicClient();
  const { data, error } = await supabase
    .from("course_batches")
    .select("*")
    .eq("id", batchId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (error) throw error;
  return data as CourseBatch | null;
}

export function pickDefaultBatch(batches: CourseBatch[]): CourseBatch | null {
  if (batches.length === 0) return null;
  return (
    batches.find((b) => b.status === "active") ??
    batches.find((b) => b.status === "upcoming") ??
    batches[0]
  );
}

function batchStartTime(batch: CourseBatch): number {
  if (!batch.start_date) return Number.NEGATIVE_INFINITY;
  const time = new Date(batch.start_date).getTime();
  return Number.isFinite(time) ? time : Number.NEGATIVE_INFINITY;
}

function isRunningBatch(batch: CourseBatch, now = Date.now()): boolean {
  if (batch.status === "cancelled") return false;
  if (batch.status === "active") return true;

  const start = batchStartTime(batch);
  if (!Number.isFinite(start) || start === Number.NEGATIVE_INFINITY) return false;
  if (start > now) return false;

  if (!batch.end_date) return batch.status !== "completed";
  const end = new Date(batch.end_date).getTime();
  if (!Number.isFinite(end)) return batch.status !== "completed";
  return now <= end;
}

/** Latest batch by start_date, preferring one that is currently running/active. */
export function pickLatestBatchByStartDate(
  batches: CourseBatch[],
): CourseBatch | null {
  if (batches.length === 0) return null;

  const now = Date.now();
  const running = batches.filter((batch) => isRunningBatch(batch, now));
  const pool = running.length > 0 ? running : batches;

  return [...pool].sort((a, b) => batchStartTime(b) - batchStartTime(a))[0] ?? null;
}
