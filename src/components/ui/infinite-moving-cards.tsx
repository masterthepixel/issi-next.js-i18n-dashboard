"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    avatar?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Instead of directly cloning DOM nodes (which risks React reconciliation
  // mismatches), render the list twice via JSX. This keeps the DOM under
  // React control and is safer during hydration and updates.
  const [start, setStart] = useState(false);
  useEffect(() => {
    // Set CSS vars for animation direction and speed on mount
    getDirection();
    getSpeed();
    // Start the CSS animation after mount to avoid initial jump
    setStart(true);
    // intentionally run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  // Render the items twice in a single list to create the infinite scroll
  const doubled = [...items, ...items];

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {doubled.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-border bg-card px-8 py-6 md:w-[450px]"
            key={`${item.name ?? 'item'}-${idx}`}
            aria-hidden={idx >= items.length} // mark the duplicated half as presentation for accessibility
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-sm leading-[1.6] font-normal text-foreground">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                {item.avatar && (
                  <div className="mr-4 flex-shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.avatar ? `${item.name} avatar` : ''}
                      className="w-12 h-12 rounded-full object-cover border-2 border-border"
                      width={48}
                      height={48}
                      loading="lazy"
                      unoptimized={item.avatar.includes('unsplash.com')}
                    />
                  </div>
                )}
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-normal text-muted-foreground">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] font-normal text-muted-foreground">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
