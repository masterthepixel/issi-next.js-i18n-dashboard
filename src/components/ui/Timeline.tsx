"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useTransform
} from "motion/react";
import React, { useLayoutEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  subtitle?: string;
}

export const Timeline = ({ data, title = "Timeline", subtitle = "A timeline overview" }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Use useLayoutEffect to measure DOM size synchronously after render.
  useLayoutEffect(() => {
    function measure() {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height || 0);
      }
    }

    // Measure once after mount
    measure();

    // Re-measure on window resize as a conservative fallback
    if (typeof window !== "undefined") {
      window.addEventListener("resize", measure);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", measure);
      }
    };
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-foreground max-w-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-sm mb-8">
          {subtitle}
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex justify-start md:gap-10",
              index === 0 ? "pt-4 md:pt-8" : "pt-10 md:pt-40"
            )}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-muted-foreground border border-border p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-muted-foreground">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-muted-foreground">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        {/* eslint-disable react/forbid-dom-props */}
        <div
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-border to-transparent"
          style={{ height: `${height}px` }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-primary to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
        {/* eslint-enable react/forbid-dom-props */}
      </div>
    </div>
  );
};
