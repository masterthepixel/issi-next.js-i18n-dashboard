"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number).fill(true);
  
  return (
    <>      {meteors.map((_, idx) => {
        // Position meteors across a large area to cover various screen sizes
        const top = Math.floor(Math.random() * 1400 - 200); // -200px to 1200px
        const left = Math.floor(Math.random() * 2120 - 200); // -200px to 1920px
        const delay = Math.random() * (0.8 - 0.2) + 0.2;
        const duration = Math.floor(Math.random() * (10 - 2) + 2);
        
        return (
          <span
            key={idx}            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
              "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
              className
            )}
            style={{
              "--top": `${top}px`,
              "--left": `${left}px`,
              "--animation-delay": `${delay}s`,
              "--animation-duration": `${duration}s`,
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
