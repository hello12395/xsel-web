import { Blogs } from "@/components/Blogs";
import { Footer } from "@/components/Footer";
import { FreeStuff } from "@/components/FreeStuff";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { PendingDiscussions } from "@/components/PendingDiscussions";
import { PremiumCourses } from "@/components/PremiumCourses";
import { Reviews } from "@/components/Reviews";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SocialMedia } from "@/components/SocialMedia";
import { WhySarwarLab } from "@/components/WhySarwarLab";
import { mapCoursesToPremium } from "@/data/premium-courses";
import { getPublishedCourses } from "@/lib/db/courses";

export default async function Home() {
  let premiumCourses: ReturnType<typeof mapCoursesToPremium> = [];
  try {
    premiumCourses = mapCoursesToPremium(await getPublishedCourses());
  } catch {
    premiumCourses = [];
  }

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <Hero />
        <WhySarwarLab />
        <PremiumCourses courses={premiumCourses} />
        <FreeStuff />
        <Reviews />
        <PendingDiscussions />
        <SocialMedia />
        <Blogs />
        <Location />
      </main>
      <Footer />
    </>
  );
}
