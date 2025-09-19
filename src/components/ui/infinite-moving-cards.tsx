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
    avatar?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
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
    
    // Use requestIdleCallback for non-critical animation setup
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        addAnimation();
      });
    } else {
      setTimeout(addAnimation, 100);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [direction, speed]);
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
          start && !prefersReducedMotion && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
          prefersReducedMotion && "transform-none",
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
          } else if (className?.includes("job-marquee-cards")) {
            cardStyles += " border-primary/20 bg-primary/5 text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 cursor-pointer whitespace-nowrap mx-1";
          } else if (className?.includes("testimonial-cards")) {
            cardStyles += " border-border bg-card text-card-foreground shadow-md dark:border-border dark:bg-card dark:text-card-foreground";
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
                {/* Conditionally show US flag only for patriotic cards */}
                {className?.includes("patriotic-cards") ? (
                  <div className="flex items-start gap-3">
                    <span className="fi fi-us w-6 h-4 rounded-sm mt-1 flex-shrink-0"></span>
                    <span className="relative z-20 text-base leading-[1.6] font-serif font-normal">
                      {item.quote}
                    </span>
                  </div>
                ) : className?.includes("job-marquee-cards") ? (
                  <div className="flex flex-col gap-1">
                    <span className="relative z-20 text-xs font-semibold uppercase tracking-wide opacity-80 whitespace-nowrap">
                      {item.quote}
                    </span>
                    <span className="relative z-20 text-sm font-medium leading-tight whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className="relative z-20 text-xs opacity-60 whitespace-nowrap">
                      {item.title}
                    </span>
                  </div>
                ) : (
                  <span className="relative z-20 text-base leading-[1.6] font-normal">
                    {item.quote}
                  </span>
                )}

                {/* Only show name/title section for non-job cards */}
                {!className?.includes("job-marquee-cards") && (
                  <div className="relative z-20 mt-6 flex flex-row items-center">
                    {/* Show avatar for testimonial cards */}
                    {className?.includes("testimonial-cards") && item.avatar && (
                      <div className="mr-4 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.avatar}
                          alt={`Avatar of ${item.name}`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="absolute inset-0 rounded-full ring-2 ring-gray-300 ring-offset-2 ring-offset-background pointer-events-none"></div>
                      </div>
                    )}
                    <span className="flex flex-col gap-0">
                      <span className="text-xl leading-[1.4] font-serif font-[400]">
                        {item.name}
                      </span>
                      <span className="text-sm leading-[1.6] font-semibold opacity-80">
                        {item.title}
                      </span>
                    </span>
                  </div>
                )}
              </blockquote>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
