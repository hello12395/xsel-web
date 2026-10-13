export const whyCards = [
  {
    number: "01",
    title: "Taught by him, not a handoff",
    body: "Every class and every correction come from Sir Mahmood Sarwar himself. No substitutes — you learn directly from him, every session.",
  },
  {
    number: "02",
    title: "A room built for speaking",
    body: "Small groups, real-time correction, and a fear-free room where mistakes help you improve. Speak freely, get fixed fast, grow with confidence.",
  },
  {
    number: "03",
    title: "In the room, or on the screen",
    body: "Join live in G-11 Markaz, Islamabad, or on Zoom from anywhere. Miss a class and catch the recording on the app whenever you need it.",
  },
];

export const reviews = [
  {
    name: "Haseeb Ur Rehman",
    role: "CSS aspirant",
    avatar: "/reviews/haseeb-ur-rehman.jpg",
    quote:
      "The best mentor for aspirants. I was stuck on English prep for three years until Fundamentals of Grammar course turned things around.",
  },
  {
    name: "Ayesha Ayaz",
    role: "Learner",
    avatar: "/reviews/ayesha-ayaz.jpg",
    quote:
      "I went in for literature and came out loving grammar too. The way he explains things, it just sticks.",
  },
  {
    name: "Rahmeen Aslam",
    role: "Learner",
    avatar: "/reviews/rahmeen-aslam.jpg",
    quote:
      "He has a rare ability to start from the basics and build all the way up, without leaving anyone behind.",
  },
  {
    name: "Aneela Yaqoub",
    role: "Spoken English Program",
    avatar: "/reviews/aneela-yaqoub.jpg",
    quote:
      "I couldn't speak a line of English before. Two months later, I speak with confidence and without hesitation.",
  },
  {
    name: "Zulal Kakakhel",
    role: "CSS aspirant",
    avatar: "/reviews/zulal-kakakhel.jpg",
    quote:
      "I couldn't write a proper precis before this. Now I actually can, and grammar finally makes sense.",
  },
];

export const discussions = [
  {
    title: "Do we drop “the” in “go to hospital”?",
    excerpt:
      "British notes say one thing, American notes another. What should we use in the lab — and in the exam hall?",
    replies: 14,
    author: "Nadia R.",
    time: "2 hours ago",
  },
  {
    title: "Few vs a few — still tripping me up",
    excerpt:
      "I know the rule on paper. In speaking I still mix them. Looking for a memory trick that actually sticks.",
    replies: 9,
    author: "Bilal K.",
    time: "Yesterday",
  },
  {
    title: "Formal vs informal email closings",
    excerpt:
      "Is “Best,” too casual for a professor? What about “Kind regards” when you are chasing a late reply?",
    replies: 21,
    author: "Hira S.",
    time: "3 days ago",
  },
  {
    title: "Since vs for — which sounds natural?",
    excerpt:
      "I have been here since three years sounds wrong to me, but I cannot explain why to my study partner.",
    replies: 11,
    author: "Omar T.",
    time: "4 hours ago",
  },
  {
    title: "Present perfect in job interviews",
    excerpt:
      "How do you answer “Tell me about a challenge you faced” without switching tenses halfway through?",
    replies: 18,
    author: "Fatima A.",
    time: "6 hours ago",
  },
  {
    title: "Article errors in academic essays",
    excerpt:
      "My mentor keeps marking “research” and “the research.” Is there a rule, or is it just context?",
    replies: 7,
    author: "Usman J.",
    time: "1 day ago",
  },
  {
    title: "How do you practice shadowing at home?",
    excerpt:
      "The lab drill works in class, but alone I feel silly repeating to a screen. What do you actually do?",
    replies: 15,
    author: "Zainab M.",
    time: "2 days ago",
  },
  {
    title: "Is “regards” still professional in 2026?",
    excerpt:
      "My manager writes “Rgds” and my professor wants “Yours sincerely.” Which camp is the exam board in?",
    replies: 12,
    author: "Ali R.",
    time: "5 days ago",
  },
];

export const whatsappLinks = [
  {
    label: "WhatsApp Channel",
    description: "Updates & announcements",
    href: "https://whatsapp.com/channel/0029VaOFixGDTkKAGpDqZK2L",
  },
  {
    label: "WhatsApp Community",
    description: "Join the learner circle",
    href: "https://chat.whatsapp.com/HYJBs1XhXsi6mCDyFwCmSc",
  },
] as const;

export const socials = [
  {
    name: "Instagram",
    handle: "Two lab accounts",
    stat: "Daily clips",
    icon: "instagram" as const,
    links: [
      {
        label: "English with Mahmood Sarwar",
        href: "https://www.instagram.com/english.with.mahmood.sarwar/",
      },
      {
        label: "xSEL",
        href: "https://www.instagram.com/sarwar.english.lab/",
      },
    ],
  },
  {
    name: "Facebook",
    handle: "Pages & updates",
    stat: "Daily prompts",
    icon: "facebook" as const,
    links: [
      {
        label: "English with Mahmood Sarwar",
        href: "https://www.facebook.com/EnglishWithMahmoodSarwar",
      },
      {
        label: "xSEL",
        href: "https://www.facebook.com/share/1LT3AyUubh/",
      },
    ],
  },
  {
    name: "WhatsApp",
    handle: "Channel & community",
    stat: "Open Chats",
    icon: "whatsapp" as const,
    links: whatsappLinks.map(({ label, href }) => ({ label, href })),
  },
  {
    name: "TikTok",
    handle: "@english_with_mahmood",
    stat: "Short lessons",
    icon: "tiktok" as const,
    links: [
      {
        label: "English with Mahmood",
        href: "https://www.tiktok.com/@english_with_mahmood",
      },
    ],
  },
];

export const blogs = [
  {
    category: "Speaking",
    title: "How to think in English without translating first",
    excerpt:
      "A ten-minute drill we use in lab to quiet the inner translator and start forming sentences in place.",
    date: "12 Aug 2026",
    read: "6 min",
    playlistId: "spoken-english",
    height: "tall" as const,
  },
  {
    category: "Writing",
    title: "The grammar traps Urdu speakers hit most",
    excerpt:
      "Articles, prepositions, and tense pairs — with the exact rewrites we mark on student pages every week.",
    date: "28 Jul 2026",
    read: "8 min",
    playlistId: "fog",
    height: "medium" as const,
  },
  {
    category: "Study habit",
    title: "A speaking drill you can finish in ten minutes",
    excerpt:
      "Shadow, pause, record, compare. The loop that beats another hour of silent highlighting.",
    date: "4 Jul 2026",
    read: "5 min",
    playlistId: "vocabulary-boost",
    height: "short" as const,
  },
];

export const location = {
  name: "Sarwar English Lab",
  addressLines: ["G-11 Markaz", "Islamabad, Pakistan"],
  hours: "Mon–Sat · 9:00 AM – 8:00 PM",
  phone: "+92 301 5095042",
  email: "hello@englishsarwarlab.com",
  coordinates: { lat: 33.66943, lng: 73.000109 },
  mapUrl: "https://share.google/MFcGPe8XDTitAVMVg",
  mapSrc:
    "https://maps.google.com/maps?q=G-11%20Markaz%20Islamabad&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapSatelliteSrc:
    "https://maps.google.com/maps?q=33.66943,73.000109&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  directionsUrl: "https://share.google/MFcGPe8XDTitAVMVg",
  studios: [
    {
      label: "Studio",
      name: "Sarwar English Lab",
      addressLines: ["G-11 Markaz", "Islamabad, Pakistan"],
    },
  ],
};
