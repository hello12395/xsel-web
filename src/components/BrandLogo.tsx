import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

/** Same logo asset as login — original colors, no filters. */
export function BrandLogo({ className = "", size = 44, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/xsel-web-logo.png"
      alt="Sarwar English Lab"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority={priority}
      unoptimized
    />
  );
}
