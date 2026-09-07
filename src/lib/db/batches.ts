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
