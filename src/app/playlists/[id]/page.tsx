import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PlaylistDetail } from "@/components/PlaylistDetail";
import { getAllPlaylistIds, getPlaylistById } from "@/data/playlists";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getAllPlaylistIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const playlist = getPlaylistById(id);

  if (!playlist) {
    return { title: "Playlist not found" };
  }

  return {
    title: `${playlist.title} | English Sarwar Lab`,
    description: playlist.body,
  };
}

export default async function PlaylistPage({ params }: PageProps) {
  const { id } = await params;
  const playlist = getPlaylistById(id);

  if (!playlist) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <PlaylistDetail playlist={playlist} />
      </main>
      <Footer />
    </>
  );
}
