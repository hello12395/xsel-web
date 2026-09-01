import { Blogs } from "@/components/Blogs";
import { Footer } from "@/components/Footer";
import { FreeStuff } from "@/components/FreeStuff";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { PendingDiscussions } from "@/components/PendingDiscussions";
import { Reviews } from "@/components/Reviews";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SocialMedia } from "@/components/SocialMedia";
import { WhySarwarLab } from "@/components/WhySarwarLab";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <Hero />
        <WhySarwarLab />
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
