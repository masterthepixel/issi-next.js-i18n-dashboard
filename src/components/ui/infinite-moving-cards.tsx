"use client";

import { cn } from "@/lib/utils";
import 'flag-icons/css/flag-icons.min.css';
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
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
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
        containerRef.current.style.setProperty("--animation-duration", "26s"); // 30% slower than 20s
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "55s"); // 30% slower than 40s  
      } else {
        containerRef.current.style.setProperty("--animation-duration", "104s"); // 30% slower than 80s
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, _idx) => {
          // Determine patriotic colors based on container class
          let cardStyles = "relative min-w-[200px] max-w-[400px] shrink-0 rounded-2xl border border-b-0 px-6 py-4 w-fit";

          if (className?.includes("patriotic-cards-blue")) {
            cardStyles += " border-blue-600 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white";
          } else if (className?.includes("patriotic-cards-red")) {
            cardStyles += " border-red-600 bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white";
          } else if (className?.includes("patriotic-cards-white")) {
            cardStyles += " border-gray-300 bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 dark:border-gray-600 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 dark:text-white";
          } else {
            cardStyles += " border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]";
          }

          return (
            <li
              className={cardStyles}
              key={item.name}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <div className="flex items-start gap-3">
                  <span className="fi fi-us w-6 h-4 rounded-sm mt-1 flex-shrink-0"></span>
                  <span className="relative z-20 text-base leading-[1.6] font-serif font-normal">
                    {item.quote}
                  </span>
                </div>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-base leading-[1.6] font-semibold">
                      {item.name}
                    </span>
                    <span className="text-sm leading-[1.6] font-normal opacity-80">
                      {item.title}
                    </span>
                  </span>
                </div>
              </blockquote>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
