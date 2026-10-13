import { createPublicClient } from "@/lib/supabase/public";
import { createServiceClient } from "@/lib/supabase/admin";
import { pickLatestBatchByCreatedAt } from "@/lib/db/batches";
import type { CourseBatch } from "@/types/course";

function enrollmentClient() {
  return createServiceClient() ?? createPublicClient();
}

/** Active enrollments for a specific batch. */
export async function countActiveEnrollmentsForBatch(
  batchId: string,
): Promise<number> {
  const supabase = enrollmentClient();
  const { count, error } = await supabase
    .from("course_enrollments")
    .select("id", { count: "exact", head: true })
    .eq("batch_id", batchId)
    .eq("status", "active");

  if (error) throw error;
  return count ?? 0;
}

/** Active enrollments for a course (all batches). */
export async function countActiveEnrollmentsForCourse(
  courseId: string,
): Promise<number> {
  const supabase = enrollmentClient();
  const { count, error } = await supabase
    .from("course_enrollments")
    .select("id", { count: "exact", head: true })
    .eq("course_id", courseId)
    .eq("status", "active");

  if (error) throw error;
  return count ?? 0;
}

/**
 * Students shown on the course page:
 * `fake_enrollments` + active enrollments for the latest course batch
 * (picked by created_at; falls back to all course enrollments when there is no batch).
 */
export async function getDisplayedStudentCount(
  fakeEnrollments: number,
  batches: CourseBatch[] | null | undefined,
  courseId: string,
): Promise<number> {
  const fake = Math.max(0, Math.round(Number(fakeEnrollments) || 0));
  const latest = pickLatestBatchByCreatedAt(batches ?? []);

  try {
    const actual = latest
      ? await countActiveEnrollmentsForBatch(latest.id)
      : await countActiveEnrollmentsForCourse(courseId);
    return fake + actual;
  } catch (error) {
    console.error("Failed to count course enrollments", error);
    return fake;
  }
}
