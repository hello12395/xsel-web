import { createPublicClient } from "@/lib/supabase/public";
import type { Course, CourseWithLessons } from "@/types/course";

const COURSE_LIST_SELECT = `
  id,
  title,
  description,
  course_type,
  category,
  price,
  thumbnail_url,
  instructor_id,
  status,
  registration_deadline,
  course_start_date,
  fake_enrollments,
  learning_outcomes,
  created_at,
  updated_at,
  chapters:course_chapters(
    id,
    lessons:course_lessons(id, duration_seconds, status)
  )
`;

/** Published courses — same Supabase `courses` table as the admin portal. */
export async function getPublishedCourses(): Promise<CourseWithLessons[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("courses")
    .select(COURSE_LIST_SELECT)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as CourseWithLessons[];
}

export async function getPublishedCourseById(
  id: string
): Promise<CourseWithLessons | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("courses")
    .select(COURSE_LIST_SELECT)
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data as CourseWithLessons | null;
}

export type { Course, CourseWithLessons };
