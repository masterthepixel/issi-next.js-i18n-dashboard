"use client";

import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

type MeteorDef = {
  id: string;
  top: number;
  left: number;
  delay: number;
  duration: number;
};

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  // Generate meteor positions once per mount / when `number` changes so layout
  // is stable across renders and doesn't trigger accidental animations or
  // hydration mismatches.
  const meteors = useMemo<MeteorDef[]>(() => {
    return new Array(number).fill(true).map((_, idx) => {
      const top = Math.floor(Math.random() * 1400 - 200); // -200px to 1200px
      const left = Math.floor(Math.random() * 2120 - 200); // -200px to 1920px
      const delay = Math.random() * (0.8 - 0.2) + 0.2;
      const duration = Math.floor(Math.random() * (10 - 2) + 2);

      return {
        id: String(idx),
        top,
        left,
        delay,
        duration,
      };
    });
  }, [number]);

  return (
    <>
      {meteors.map((m) => {
        // Decorative animation: mark it as presentation for assistive tech.
        return (
          <span
            key={m.id}
            aria-hidden={true}
            role="presentation"
            className={cn(
              // Keep existing util classes for now; this class list is intentionally
              // grouped so we can switch to design tokens/CSS variables later.
              "animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-muted-foreground shadow-[0_0_0_1px_hsl(var(--muted-foreground))] rotate-[215deg]",
              "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-primary before:to-transparent",
              className
            )}
            style={{
              // inline CSS custom props are used to drive animation and position
              // without introducing additional DOM complexity.
              "--top": `${m.top}px`,
              "--left": `${m.left}px`,
              "--animation-delay": `${m.delay}s`,
              "--animation-duration": `${m.duration}s`,
              top: `var(--top)`,
              left: `var(--left)`,
              animationDelay: `var(--animation-delay)`,
              animationDuration: `var(--animation-duration)`,
            } as React.CSSProperties}
          />
        );
      })}
    </>
  );
};
