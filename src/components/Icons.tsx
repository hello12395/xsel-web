type IconProps = { className?: string };

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M14 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M10 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuoteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M7.2 18c-2.4 0-4.2-1.9-4.2-4.5C3 9.3 5.8 6.2 10 4.8l.8 1.6C8.2 7.5 6.7 9.3 6.6 11.4c.5-.4 1.2-.6 2-.6 1.8 0 3.1 1.2 3.1 3 0 2-1.6 4.2-4.5 4.2Zm10.3 0c-2.4 0-4.2-1.9-4.2-4.5 0-4.2 2.8-7.3 7-8.7l.8 1.6c-2.6 1.1-4.1 2.9-4.2 5 .5-.4 1.2-.6 2-.6 1.8 0 3.1 1.2 3.1 3 0 2-1.6 4.2-4.5 4.2Z" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 3.4 14.5 9l6 .6-4.6 4 1.4 5.9L12 16.8 6.7 19.5l1.4-5.9L3.5 9.6 9.5 9 12 3.4Z" />
    </svg>
  );
}

export function PremiumIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 16.5h14l-1.1 3.2a1.4 1.4 0 0 1-1.3.9H7.4a1.4 1.4 0 0 1-1.3-.9L5 16.5Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M4.2 8.2 7.8 12l4.2-6.5L16.2 12l3.6-3.8L18.5 15H5.5L4.2 8.2Z"
        fill="currentColor"
      />
      <circle cx="4.2" cy="7.2" r="1.35" fill="currentColor" />
      <circle cx="12" cy="4.6" r="1.35" fill="currentColor" />
      <circle cx="19.8" cy="7.2" r="1.35" fill="currentColor" />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function EyeOffIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 3l18 18M10.5 6.2A9.7 9.7 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16 16 0 0 1-3.3 3.5M7.1 7.3C4.4 9 2.5 12 2.5 12S6 18.5 12 18.5c1.3 0 2.5-.3 3.6-.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9 10.2a2.6 2.6 0 0 0 3.8 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v4.2l2.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M8.2 3.8h2.4l1.2 3.1-1.6 1.2a12.5 12.5 0 0 0 6.7 6.7l1.2-1.6 3.1 1.2v2.4c0 .7-.6 1.4-1.3 1.5-8.3.9-15.1-5.9-14.2-14.2.1-.7.8-1.3 1.5-1.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="ig-brand" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f58529" />
          <stop offset="45%" stopColor="#dd2a7b" />
          <stop offset="100%" stopColor="#515bd4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-brand)" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.25" fill="#fff" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#FF0000"
        d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.5 4.5 12 4.5 12 4.5s-7.5 0-9.4.6A3 3 0 0 0 .5 7.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-4.8Z"
      />
      <path fill="#fff" d="M9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
    </svg>
  );
}

export function ThreadsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="#F2F2F2" />
      <path
        fill="#111111"
        transform="translate(4.9 4.9) scale(0.5917)"
        d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586c-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543c1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735c.798.361 1.348 1.204 1.348 2.47c0 3.387-3.907 5.232-7.22 5.232c-4.885 0-8.077-3.207-8.077-8.424c0-6.392 4.223-10.487 9.9-10.487c3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0C6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066c4.878 0 9.809-2.846 9.809-7.716c0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453c0-1.483 1.822-1.934 3.606-1.934c.678 0 1.34.045 1.927.173c-.422 1.927-1.671 3.215-3.508 3.214Z"
      />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.3 17.5v-5.2h1.75l.26-2.02H13.3V9c0-.58.16-1 .98-1h1.05V6.18C15.15 6.12 14.5 6 13.7 6c-1.88 0-3.16 1.15-3.16 3.26v1.82H8.7v2.02h1.84v5.4h2.76Z"
      />
    </svg>
  );
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#25D366"
        d="M12 2.04c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.39 1.24 4.82L2.06 21.9l5.3-1.39A9.86 9.86 0 0 0 12 21.86c5.46 0 9.9-4.44 9.9-9.9 0-5.47-4.44-9.92-9.9-9.92Z"
      />
      <path
        fill="#fff"
        d="M17.1 14.48c-.24.68-1.4 1.25-1.93 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.78-4.17-4.93-4.36-.14-.2-1.2-1.6-1.2-3.05s.76-2.16 1.03-2.45c.27-.3.59-.37.79-.37h.57c.18 0 .43-.07.67.51.24.6.82 2.07.89 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.16.27.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.17-.2.7-.81.88-1.09.19-.27.37-.23.63-.14.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36Z"
      />
    </svg>
  );
}

export function TiktokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="#111111" />
      <path
        fill="#25F4EE"
        d="M14.7 6.2c.5 1.5 1.6 2.7 3.1 3.1v2.05a5.2 5.2 0 0 1-3.1-1.05v4.55a4.35 4.35 0 1 1-4.35-4.35c.24 0 .48.02.7.07v2.15a2.25 2.25 0 1 0 1.55 2.14V5.5h2.1v.7Z"
      />
      <path
        fill="#FE2C55"
        d="M14.2 6.7c.5 1.5 1.6 2.7 3.1 3.1v2.05a5.2 5.2 0 0 1-3.1-1.05v4.55a4.35 4.35 0 1 1-4.35-4.35c.24 0 .48.02.7.07v2.15a2.25 2.25 0 1 0 1.55 2.14V6h2.1v.7Z"
        opacity="0.85"
        transform="translate(0.35 0.35)"
      />
      <path
        fill="#fff"
        d="M13.85 6.35c.5 1.5 1.6 2.7 3.1 3.1v2.05a5.2 5.2 0 0 1-3.1-1.05v4.55a4.35 4.35 0 1 1-4.35-4.35c.24 0 .48.02.7.07v2.15a2.25 2.25 0 1 0 1.55 2.14V5.65h2.1v.7Z"
      />
    </svg>
  );
}
