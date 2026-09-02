import playlistVideosData from "./playlist-videos.json";

export type PlaylistVideo = {
  id: string;
  title: string;
  href: string;
  thumbnail: string;
};

export type Playlist = {
  id: string;
  tag: string;
  title: string;
  body: string;
  videoCount: number;
  listId: string;
  href: string;
  thumbnail: string;
  isCourse?: boolean;
  videos: PlaylistVideo[];
};

const playlistMeta = [
  {
    id: "kp-pms",
    tag: "Exam prep",
    title: "KP PMS Preparation",
    body: "Focused English prep for KP PMS — past patterns, MCQs, and exam-ready practice.",
    videoCount: 8,
    listId: "PLQPKw6ae4dla-J8G9irsX_OmqK-x3G_0a",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dla-J8G9irsX_OmqK-x3G_0a",
    thumbnail: "https://i.ytimg.com/vi/NKMXQWlLOK0/hqdefault.jpg",
  },
  {
    id: "prepositions",
    tag: "Grammar",
    title: "Prepositions Deep Dive",
    body: "Prepositions made easy for all exams — rules, traps, and drills that actually stick.",
    videoCount: 6,
    listId: "PLQPKw6ae4dladEmV0HUxNNw4uC1r1KYlC",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dladEmV0HUxNNw4uC1r1KYlC",
    thumbnail: "https://i.ytimg.com/vi/umIIKIUtgRo/hqdefault.jpg",
  },
  {
    id: "short-stories",
    tag: "Stories",
    title: "Learn English with Short Stories",
    body: "Pick up grammar and vocabulary naturally through short, engaging stories.",
    videoCount: 2,
    listId: "PLQPKw6ae4dlZmC23KWsZBX6QAT6VrB7gb",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dlZmC23KWsZBX6QAT6VrB7gb",
    thumbnail: "https://i.ytimg.com/vi/pV4xmk5kzuY/hqdefault.jpg",
  },
  {
    id: "mdcat",
    tag: "Exam prep",
    title: "MDCAT English Preparation",
    body: "MDCAT past papers solved and targeted English prep for medical entry tests.",
    videoCount: 3,
    listId: "PLQPKw6ae4dlaoQyc6L6UaYqW68M_FoxzD",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dlaoQyc6L6UaYqW68M_FoxzD",
    thumbnail: "https://i.ytimg.com/vi/YonSfVY06ak/hqdefault.jpg",
  },
  {
    id: "factbook",
    tag: "Monthly",
    title: "Factbook Monthly",
    body: "Monthly fact-based English drills tied to current exam trends and patterns.",
    videoCount: 6,
    listId: "PLQPKw6ae4dlZiWBaRWCqWnQasAyjzbUkW",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dlZiWBaRWCqWnQasAyjzbUkW",
    thumbnail: "https://i.ytimg.com/vi/oP5dxp8SaYs/hqdefault.jpg",
  },
  {
    id: "fpsc",
    tag: "Exam prep",
    title: "FPSC Jobs Preparation",
    body: "One-paper exam English — past paper solutions and practice MCQs for FPSC jobs.",
    videoCount: 21,
    listId: "PLQPKw6ae4dla_ScdwcQuuhcZRccuN3O--",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dla_ScdwcQuuhcZRccuN3O--",
    thumbnail: "https://i.ytimg.com/vi/aX7ZwQY1VoY/hqdefault.jpg",
  },
  {
    id: "vocabulary-boost",
    tag: "Vocabulary",
    title: "Vocabulary Boost Series",
    body: "High-yield vocabulary for competitive exams, built in weekly boosts you can revise fast.",
    videoCount: 26,
    listId: "PLQPKw6ae4dlbY_hDd-UVRFz7RdDVtRh16",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dlbY_hDd-UVRFz7RdDVtRh16",
    thumbnail: "https://i.ytimg.com/vi/b2zZX3dQkok/hqdefault.jpg",
  },
  {
    id: "translation",
    tag: "Translation",
    title: "Urdu to English Passages",
    body: "Solved Urdu-to-English translation passages from past papers, step by step.",
    videoCount: 2,
    listId: "PLQPKw6ae4dlZ7N30D_AZB6ndy799VjEn_",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dlZ7N30D_AZB6ndy799VjEn_",
    thumbnail: "https://i.ytimg.com/vi/HJPLiuxTf9Y/hqdefault.jpg",
  },
  {
    id: "ppsc",
    tag: "Exam prep",
    title: "PPSC Test Preparation",
    body: "Complete English portion prep for PPSC one-paper exams and past paper practice.",
    videoCount: 12,
    listId: "PLQPKw6ae4dlb32mqzKJ5y9YXl1GSgszfX",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dlb32mqzKJ5y9YXl1GSgszfX",
    thumbnail: "https://i.ytimg.com/vi/aCoUOZyh6y8/hqdefault.jpg",
  },
  {
    id: "css-mpt",
    tag: "Course",
    title: "CSS MPT Preparation",
    body: "CSS MPT English — mocks, past papers, and MCQ practice for competitive tracks.",
    videoCount: 19,
    listId: "PLQPKw6ae4dlZL0vtW2oagpik40uK8yLXL",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dlZL0vtW2oagpik40uK8yLXL",
    thumbnail: "https://i.ytimg.com/vi/FmZvmztTP70/hqdefault.jpg",
    isCourse: true,
  },
  {
    id: "spoken-english",
    tag: "Speaking",
    title: "English Bol Chaal",
    body: "Spoken English for everyone — practical phrases and confidence in daily conversation.",
    videoCount: 67,
    listId: "PLQPKw6ae4dlY4ed4OHlu2uEmsw3ZDghLS",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dlY4ed4OHlu2uEmsw3ZDghLS",
    thumbnail: "https://i.ytimg.com/vi/mDooUygxtmU/hqdefault.jpg",
  },
  {
    id: "newspaper",
    tag: "Reading",
    title: "Learn English from Newspaper",
    body: "Dawn editorial breakdowns with grammar, vocabulary, and translation practice.",
    videoCount: 64,
    listId: "PLQPKw6ae4dlYPnoHYqDyjD1YGcG4hAbzD",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dlYPnoHYqDyjD1YGcG4hAbzD",
    thumbnail: "https://i.ytimg.com/vi/pCykO7lz460/hqdefault.jpg",
  },
  {
    id: "fog",
    tag: "Grammar",
    title: "FoG — Fundamentals of Grammar",
    body: "Core grammar foundations explained clearly from the ground up.",
    videoCount: 35,
    listId: "PLQPKw6ae4dlYaGeeJHh8oJABDVxCtS59h",
    href: "https://www.youtube.com/playlist?list=PLQPKw6ae4dlYaGeeJHh8oJABDVxCtS59h",
    thumbnail: "https://i.ytimg.com/vi/SqYSTJtTZYI/hqdefault.jpg",
  },
] as const;

const videosById = playlistVideosData as Record<string, PlaylistVideo[]>;

export const playlists: Playlist[] = playlistMeta.map((meta) => ({
  ...meta,
  videos: videosById[meta.id] ?? [],
}));

export function getPlaylistById(id: string): Playlist | undefined {
  return playlists.find((playlist) => playlist.id === id);
}

export function getAllPlaylistIds(): string[] {
  return playlists.map((playlist) => playlist.id);
}
