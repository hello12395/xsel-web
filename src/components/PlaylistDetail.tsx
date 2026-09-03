import Image from "next/image";
import Link from "next/link";
import type { Playlist } from "@/data/playlists";
import { premiumCourses } from "@/data/premium-courses";
import { ArrowIcon, PremiumIcon } from "./Icons";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

function PremiumCoursesSidebar() {
  return (
    <aside className="lg:sticky lg:top-28">
      <Reveal delay={0.08}>
        <div className="card-surface overflow-hidden rounded-[24px]">
          <div className="border-b border-ink/8 bg-gradient-to-br from-[#f7fbff] via-white to-[#eef6ff] px-5 py-5 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#f5e6b8] text-[#b8860b]">
                <PremiumIcon className="h-4 w-4" />
              </span>
              <p className="text-[11px] font-semibold tracking-[0.24em] text-[#b8860b] uppercase">
                Premium · Paid
              </p>
            </div>
            <h3 className="font-display mt-2 text-2xl tracking-tight text-ink">Premium courses</h3>
            <p className="mt-2 text-sm leading-6 text-ink/55">
              Live cohorts and mentor-marked tracks — not free YouTube playlists.
            </p>
          </div>

          <ul className="divide-y divide-ink/6 bg-white/70">
            {premiumCourses.map((course) => (
              <li key={course.id}>
                <Link
                  href={course.href}
                  className="group flex gap-3.5 px-5 py-4 transition hover:bg-forest/[0.03] sm:px-6"
                >
                  <div className="relative h-[4.25rem] w-[4.75rem] shrink-0 overflow-hidden rounded-xl bg-ink/5 ring-1 ring-ink/6">
                    <Image
                      src={course.thumbnail}
                      alt=""
                      fill
                      sizes="76px"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <span
                      className="absolute top-1.5 left-1.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-[#f0d060] to-[#c9a227] text-white shadow-[0_2px_6px_rgba(185,134,11,0.45)]"
                      title="Premium course"
                      aria-label="Premium course"
                    >
                      <PremiumIcon className="h-3 w-3" />
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-forest/8 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-forest uppercase">
                        {course.tag}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-ink tabular-nums">
                        <PremiumIcon className="h-3.5 w-3.5 text-[#c9a227]" />
                        {course.price}
                      </span>
                    </div>
                    <h4 className="mt-1.5 line-clamp-2 text-sm leading-5 font-semibold text-ink transition group-hover:text-forest">
                      {course.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-ink/45">
                      {course.lessons} lessons · {course.duration}
                    </p>
                    <p className="mt-1 text-[10px] font-medium tracking-wide text-ink/35 uppercase">
                      Sign in required
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-ink/8 bg-[#f7fbff]/80 px-5 py-4 sm:px-6">
            <a
              href="#location"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-white transition hover:bg-forest-deep"
            >
              Ask about enrollment
              <ArrowIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Reveal>
    </aside>
  );
}

export function PlaylistDetail({ playlist }: { playlist: Playlist }) {
  const unit = playlist.isCourse ? "lesson" : "video";
  const countLabel = `${playlist.videos.length} ${unit}${playlist.videos.length === 1 ? "" : "s"}`;
  const sectionTitle = playlist.isCourse ? "Course contents" : "Playlist contents";

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

        <div className="relative mx-auto max-w-7xl px-5 py-10 pt-28 md:px-8 md:py-14 md:pt-32">
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

            <a
              href={playlist.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video overflow-hidden rounded-[24px] border border-white/15 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]"
              aria-label={`Watch ${playlist.title} on YouTube`}
            >
              <Image
                src={playlist.thumbnail}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-forest shadow-xl transition duration-300 group-hover:scale-105">
                  <PlayIcon className="ml-1 h-7 w-7" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-ink/8 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] text-gold uppercase">All videos</p>
              <h2 className="font-display mt-2 text-3xl tracking-tight text-ink sm:text-4xl">{sectionTitle}</h2>
            </div>
            <div className="flex flex-col gap-1 sm:items-end">
              <span className="w-fit rounded-full bg-forest/8 px-3 py-1 text-[11px] font-semibold tracking-wide text-forest uppercase">
                {countLabel}
              </span>
              <p className="text-sm text-ink/55">Tap any lesson to watch on YouTube</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:gap-10">
          <Stagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" delay={0.06}>
            {playlist.videos.map((video, index) => {
              const lessonNo = String(index + 1).padStart(2, "0");

              return (
                <StaggerItem key={video.id} className="h-full">
                  <a
                    href={video.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-surface group relative flex h-full flex-col overflow-hidden rounded-[22px] transition duration-300 hover:-translate-y-1 hover:border-forest/20 hover:shadow-[0_22px_44px_-22px_rgba(28,48,190,0.32)]"
                  >
                    <div className="relative aspect-video overflow-hidden bg-ink/5">
                      <Image
                        src={video.thumbnail}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-forest shadow-lg">
                          <PlayIcon className="ml-0.5 h-5 w-5" />
                        </span>
                      </div>
                      <span className="absolute top-3 left-3 font-display text-lg leading-none text-white/90 tabular-nums">
                        {lessonNo}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[11px] font-semibold tracking-[0.18em] text-ink/40 uppercase">
                        {playlist.isCourse ? "Lesson" : "Video"} {lessonNo}
                      </p>
                      <h3 className="mt-2 line-clamp-3 text-[15px] leading-6 font-semibold text-ink transition group-hover:text-forest">
                        {video.title}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-forest">
                        Watch on YouTube
                        <ArrowIcon className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </a>
                </StaggerItem>
              );
            })}
          </Stagger>

          <PremiumCoursesSidebar />
        </div>
      </div>
    </article>
  );
}
