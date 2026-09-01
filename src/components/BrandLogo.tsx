import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

export function BrandLogo({ className = "", size = 44, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/xsel-logo.jpg"
      alt="Xsel"
      width={size}
      height={size}
      className={`rounded-xl object-cover ${className}`}
      priority={priority}
    />
  );
}
