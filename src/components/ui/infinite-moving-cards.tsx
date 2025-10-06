"use client";

import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableContent,
  ExpandableTrigger,
} from "@/components/ui/expandable";
import { cn } from "@/lib/utils";
import 'flag-icons/css/flag-icons.min.css';
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
  const [start, setStart] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    const addAnimation = () => {
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
    };

    const getDirection = () => {
      if (containerRef.current) {
        if (direction === "left") {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "forwards"
          );
        } else {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "reverse"
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

    if (!prefersReducedMotion) {
      addAnimation();
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [direction, speed, prefersReducedMotion]);

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
          let cardStyles = "relative min-w-[200px] max-w-[400px] shrink-0 rounded-3xl border border-b-0 px-6 pt-8 pb-12 w-fit";
          let cardInlineStyle: React.CSSProperties | undefined = undefined;

          if (className?.includes("patriotic-cards-blue")) {
            cardStyles += " border-blue-600 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white";
          } else if (className?.includes("patriotic-cards-red")) {
            cardStyles += " border-red-600 bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white";
          } else if (className?.includes("patriotic-cards-white")) {
            cardStyles += " border-gray-300 bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 dark:border-gray-600 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 dark:text-white";
          } else if (className?.includes("job-marquee-cards")) {
            cardStyles += " border-primary/20 bg-primary/5 text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 cursor-pointer whitespace-nowrap mx-1";
          } else if (className?.includes("testimonial-cards")) {
            // Apply card design tokens: subtle border, elevated shadow, and smooth hover/focus states
            cardStyles +=
              " border-border bg-card text-card-foreground shadow-lg md:shadow-xl overflow-hidden rounded-3xl transition-shadow duration-200 hover:shadow-xl focus-within:ring-2 focus-within:ring-emerald-500 focus-within:outline-none dark:border-border dark:bg-card dark:text-card-foreground";

            // Move decorative rim/shadow into the card's own boxShadow to avoid overflow clipping
            // Use inset bottom shadow so the shadow is rendered inside the card and not clipped by ancestor overflow
            cardInlineStyle = {
              boxShadow:
                'inset 0 0 0 1px rgba(255,255,255,0.85), inset 0 -18px 40px rgba(2,6,23,0.08)'
            };
          } else {
            cardStyles += " border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]";
          }

          return (
            <li
              className={cardStyles}
              key={item.name}
              style={cardInlineStyle}
            >
              {className?.includes("testimonial-cards") ? (
                <Expandable
                  expandDirection="both"
                  expandBehavior="replace"
                  onExpandStart={() => {
                    if (containerRef.current) containerRef.current.style.animationPlayState = "paused";
                  }}
                  onCollapseEnd={() => {
                    if (containerRef.current) containerRef.current.style.animationPlayState = "running";
                  }}
                >
                  <ExpandableTrigger>
                    <ExpandableCard collapsedSize={{ width: 320, height: 220 }} expandedSize={{ width: 520, height: 320 }} hoverToExpand={false}>
                      <ExpandableCardContent>
                        <blockquote>
                          <span className="relative z-20 block text-base leading-[1.6] font-normal line-clamp-3">
                            {item.quote}
                          </span>
                          <div className="relative z-20 mt-6 flex flex-row items-center">
                            {item.avatar && (
                              <div className="mr-4 relative">
                                <Image
                                  src={item.avatar}
                                  alt={`Avatar of ${item.name}`}
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="absolute inset-0 rounded-full ring-2 ring-white/75 dark:ring-black/25 ring-offset-2 ring-offset-background shadow-sm pointer-events-none"></div>
                              </div>
                            )}
                            <span className="flex flex-col gap-0">
                              <span className="text-xl leading-[1.4] font-serif font-[400]">{item.name}</span>
                              <span className="text-sm leading-[1.6] font-semibold opacity-80">{item.title}</span>
                            </span>
                          </div>
                        </blockquote>
                      </ExpandableCardContent>
                      <ExpandableContent>
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground">{item.quote}</p>
                        </div>
                      </ExpandableContent>
                    </ExpandableCard>
                  </ExpandableTrigger>
                </Expandable>
              ) : (
                <blockquote>
                  {/* Shadows & rim are applied directly on the card element to avoid clipping by the scroller */}
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
                            loading={_idx < 2 ? "eager" : "lazy"}
                            decoding="async"
                            fetchPriority={_idx === 0 ? "high" : "auto"}
                          />
                          <div className="absolute inset-0 rounded-full ring-2 ring-white/75 dark:ring-black/25 ring-offset-2 ring-offset-background shadow-sm pointer-events-none"></div>
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
              )}
              {/* Internal floor shadow placed inside the li so it won't be clipped by ancestor overflow */}
              {className?.includes("testimonial-cards") && (
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 bottom-3 -translate-x-1/2 w-[70%] h-6 rounded-full blur-xl opacity-40 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(2,6,23,0.12), transparent)' }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
