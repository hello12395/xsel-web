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

/** Dummy premium courses — replace with real offers when ready. */
export const premiumCourses: PremiumCourse[] = [
  {
    id: "css-english-mastery",
    tag: "CSS",
    title: "CSS English Mastery",
    blurb: "Live mocks, essay labs, and precis drills for the full CSS English paper.",
    lessons: 24,
    duration: "8 weeks",
    price: "Rs 12,000",
    href: "/premium/css-english-mastery",
    thumbnail: "https://i.ytimg.com/vi/FmZvmztTP70/hqdefault.jpg",
  },
  {
    id: "pms-screening-pro",
    tag: "PMS",
    title: "KP PMS Screening Pro",
    blurb: "Past-paper English MCQs with weekly live review and exam-day strategy.",
    lessons: 18,
    duration: "6 weeks",
    price: "Rs 9,500",
    href: "/premium/pms-screening-pro",
    thumbnail: "https://i.ytimg.com/vi/NKMXQWlLOK0/hqdefault.jpg",
  },
  {
    id: "spoken-fluency-lab",
    tag: "Speaking",
    title: "Spoken Fluency Lab",
    blurb: "Small-group conversation coaching with recorded feedback every session.",
    lessons: 16,
    duration: "4 weeks",
    price: "Rs 8,000",
    href: "/premium/spoken-fluency-lab",
    thumbnail: "https://i.ytimg.com/vi/mDooUygxtmU/hqdefault.jpg",
  },
  {
    id: "one-paper-sprint",
    tag: "One-paper",
    title: "One-Paper English Sprint",
    blurb: "FPSC & PPSC English portion — timed drills, vocab packs, and mentor Q&A.",
    lessons: 12,
    duration: "3 weeks",
    price: "Rs 6,500",
    href: "/premium/one-paper-sprint",
    thumbnail: "https://i.ytimg.com/vi/aCoUOZyh6y8/hqdefault.jpg",
  },
  {
    id: "mdcat-english-boost",
    tag: "MDCAT",
    title: "MDCAT English Boost",
    blurb: "High-yield vocab, grammar traps, and past-paper sprint sessions for entry tests.",
    lessons: 14,
    duration: "4 weeks",
    price: "Rs 7,500",
    href: "/premium/mdcat-english-boost",
    thumbnail: "https://i.ytimg.com/vi/YonSfVY06ak/hqdefault.jpg",
  },
  {
    id: "grammar-foundations-pro",
    tag: "Grammar",
    title: "Grammar Foundations Pro",
    blurb: "FoG live track — rules, drills, and weekly correction for lasting accuracy.",
    lessons: 20,
    duration: "5 weeks",
    price: "Rs 7,000",
    href: "/premium/grammar-foundations-pro",
    thumbnail: "https://i.ytimg.com/vi/SqYSTJtTZYI/hqdefault.jpg",
  },
  {
    id: "vocab-power-pack",
    tag: "Vocabulary",
    title: "Vocab Power Pack",
    blurb: "Exam-ready word lists, collocations, and revision quizzes every week.",
    lessons: 10,
    duration: "3 weeks",
    price: "Rs 5,500",
    href: "/premium/vocab-power-pack",
    thumbnail: "https://i.ytimg.com/vi/b2zZX3dQkok/hqdefault.jpg",
  },
  {
    id: "newspaper-reading-lab",
    tag: "Reading",
    title: "Newspaper Reading Lab",
    blurb: "Dawn editorial breakdowns with translation, précis, and discussion practice.",
    lessons: 12,
    duration: "4 weeks",
    price: "Rs 6,000",
    href: "/premium/newspaper-reading-lab",
    thumbnail: "https://i.ytimg.com/vi/pCykO7lz460/hqdefault.jpg",
  },
  {
    id: "translation-workshop",
    tag: "Translation",
    title: "Urdu–English Translation Workshop",
    blurb: "Past-paper passages solved live with structure templates you can reuse.",
    lessons: 8,
    duration: "2 weeks",
    price: "Rs 4,500",
    href: "/premium/translation-workshop",
    thumbnail: "https://i.ytimg.com/vi/HJPLiuxTf9Y/hqdefault.jpg",
  },
];

export function getPremiumCourse(id: string): PremiumCourse | undefined {
  return premiumCourses.find((course) => course.id === id);
}
