"use client";

import { useState, type ReactNode } from "react";

/**
 * Aceternity 3D Pin — flip only (no title / pulse / beam).
 * Exact transforms from @aceternity/3d-pin PinContainer.
 */
export function PinContainer({
  children,
  className,
  containerClassName,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
}) {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)",
  );

  return (
    <div
      className={`group/pin relative z-10 h-full w-full cursor-pointer ${containerClassName ?? ""}`}
      onMouseEnter={() => {
        if (disabled) return;
        setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
      }}
      onMouseLeave={() => {
        setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
      }}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute top-1/2 left-1/2 mt-4 ml-[0.09375rem] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{ transform }}
          className={`absolute top-1/2 left-1/2 flex items-start justify-start overflow-hidden transition duration-700 ${className ?? ""}`}
        >
          <div className="relative z-50 w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
