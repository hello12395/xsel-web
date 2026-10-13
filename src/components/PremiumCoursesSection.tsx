import { mapCoursesToPremium } from "@/data/premium-courses";
import { getPublishedCourses } from "@/lib/db/courses";
import { PremiumCourses } from "./PremiumCourses";

/** Server-fetched paid courses — wrap in Suspense for shimmer while loading. */
export async function PremiumCoursesSection() {
  let premiumCourses: ReturnType<typeof mapCoursesToPremium> = [];
  try {
    premiumCourses = mapCoursesToPremium(await getPublishedCourses());
  } catch (error) {
    console.error("Failed to load paid courses", error);
    premiumCourses = [];
  }

  return <PremiumCourses courses={premiumCourses} />;
}
