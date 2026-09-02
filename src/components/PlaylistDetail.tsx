import Image from "next/image";
import Link from "next/link";
import type { Playlist } from "@/data/playlists";
import { ArrowIcon } from "./Icons";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

export function PlaylistDetail({ playlist }: { playlist: Playlist }) {
  const countLabel = playlist.isCourse
    ? `${playlist.videos.length} lessons`
    : `${playlist.videos.length} videos`;

  return (
    <article className="border-b border-ink/8 bg-cream">
      <div className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Image
            src={playlist.thumbnail}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/75" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-10 pt-28 md:px-8 md:py-14 md:pt-32">
          <Link
            href="/#free-stuff"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            <ArrowIcon className="h-4 w-4 -scale-x-100" />
            Back to Free Stuff
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] text-gold-soft uppercase">
                {playlist.tag}
              </p>
              <h1 className="font-display mt-3 text-3xl leading-tight text-white sm:text-5xl">
                {playlist.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{playlist.body}</p>
              <p className="mt-4 text-sm font-semibold tracking-wide text-white/55 uppercase">{countLabel}</p>

              <a
                href={playlist.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white/90"
              >
                Watch full playlist on YouTube
                <ArrowIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-[24px] border border-white/15 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]">
              <Image
                src={playlist.thumbnail}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-forest shadow-xl">
                  <PlayIcon className="ml-1 h-7 w-7" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-gold uppercase">All videos</p>
            <h2 className="font-display mt-2 text-2xl text-ink sm:text-3xl">Course contents</h2>
          </div>
          <p className="text-sm text-ink/55">Tap any lesson to watch on YouTube</p>
        </div>

        <ol className="mt-10 space-y-4">
          {playlist.videos.map((video, index) => (
            <li key={video.id}>
              <a
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface group flex gap-4 overflow-hidden rounded-[20px] p-3 transition duration-300 hover:-translate-y-0.5 sm:gap-5 sm:p-4"
              >
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-[14px] bg-ink/5 sm:h-24 sm:w-40">
                  <Image
                    src={video.thumbnail}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/25">
                    <PlayIcon className="h-6 w-6 text-white opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <span className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
                  <h3 className="line-clamp-2 text-[15px] leading-6 font-semibold text-ink sm:text-base sm:leading-7">
                    {video.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                    Watch on YouTube
                    <ArrowIcon className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
