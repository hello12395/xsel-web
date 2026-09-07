import type { CourseCategory, CourseType, CourseWithLessons } from "@/types/course";

export type PremiumCourse = {
  id: string;
  tag: string;
  title: string;
  blurb: string;
  lessons: number;
  duration: string;
  price: string;
  href: string;
  thumbnail: string;
};

const FALLBACK_THUMBNAIL = "https://i.ytimg.com/vi/FmZvmztTP70/hqdefault.jpg";

const CATEGORY_LABELS: Record<CourseCategory, string> = {
  design: "Design",
  coding: "Coding",
  business: "Business",
};

function formatPrice(price: number): string {
  return `PKR ${Math.round(Number(price) || 0).toLocaleString("en-PK")}`;
}

function formatDuration(
  totalSeconds: number,
  courseType: CourseType
): string {
  if (totalSeconds > 0) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.round((totalSeconds % 3600) / 60);
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes} min`;
  }
  return courseType === "live" ? "Live cohort" : "Self-paced";
}

function countLessons(course: CourseWithLessons): {
  lessons: number;
  totalSeconds: number;
} {
  let lessons = 0;
  let totalSeconds = 0;

  for (const chapter of course.chapters ?? []) {
    for (const lesson of chapter.lessons ?? []) {
      lessons += 1;
      totalSeconds += lesson.duration_seconds ?? 0;
    }
  }

  return { lessons, totalSeconds };
}

export function mapCourseToPremium(course: CourseWithLessons): PremiumCourse {
  const { lessons, totalSeconds } = countLessons(course);
  const blurb = course.description?.trim() || "Premium course from English Sarwar Lab.";

  return {
    id: course.id,
    tag: CATEGORY_LABELS[course.category] ?? course.category,
    title: course.title,
    blurb,
    lessons,
    duration: formatDuration(totalSeconds, course.course_type),
    price: formatPrice(course.price),
    href: `/premium/${course.id}`,
    thumbnail: course.thumbnail_url?.trim() || FALLBACK_THUMBNAIL,
  };
}

export function mapCoursesToPremium(courses: CourseWithLessons[]): PremiumCourse[] {
  return courses.map(mapCourseToPremium);
}
