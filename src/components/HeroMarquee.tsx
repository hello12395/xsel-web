const items = [
  "Grammar that clicks",
  "Real speaking practice",
  "Feedback that helps",
  "Write with clarity",
  "English for real life",
];

function Star() {
  return (
    <span aria-hidden className="mx-4 inline-flex shrink-0 text-[#152F29] sm:mx-6">
      <svg viewBox="0 0 16 16" className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="currentColor">
        <path d="M8 0l1.4 5.2L14.8 6.6l-5.2 1.4L8 13.2 6.6 8 1.2 6.6l5.2-1.4L8 0z" />
      </svg>
    </span>
  );
}

function Track() {
  return (
    <span className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap text-[12px] font-extrabold tracking-[0.14em] text-[#152F29] uppercase sm:text-[13px] sm:tracking-[0.16em]">
            {item}
          </span>
          <Star />
        </span>
      ))}
    </span>
  );
}

export function HeroMarquee() {
  return (
    <div
      className="hero-marquee overflow-hidden border-y border-[#152F29]/10 bg-[#EFAA93] py-3.5 sm:py-4"
      aria-label="Lab highlights"
    >
      <div className="hero-marquee__track flex w-max items-center">
        <Track />
        <Track />
      </div>
    </div>
  );
}
