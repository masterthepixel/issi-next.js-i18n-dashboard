"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface GlowingStarsBackgroundProps {
  className?: string;
  starDensity?: 'low' | 'medium' | 'high';
  glowColor?: string;
  children?: React.ReactNode;
}

export const GlowingStarsBackground = ({
  className,
  starDensity = 'medium',
  glowColor = 'blue',
  children,
}: GlowingStarsBackgroundProps) => {
  // Adjust star count and columns based on density
  const densityConfig = {
    low: { stars: 72, columns: 12 },
    medium: { stars: 108, columns: 18 },
    high: { stars: 144, columns: 24 }
  };

  const { stars } = densityConfig[starDensity];
  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const highlightedStars = useRef<number[]>([]);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const interval = setInterval(() => {
      const next = Array.from({ length: 5 }, () => Math.floor(Math.random() * stars));
      highlightedStars.current = next;
      // Avoid state updates after unmount
      if (mounted.current) setGlowingStars(next);
    }, 3000);

    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, [stars]);

  const glowColorClasses = useMemo(() => ({
    blue: 'bg-primary shadow-primary/50',
    purple: 'bg-secondary shadow-secondary/50',
    green: 'bg-success shadow-success/50',
    pink: 'bg-destructive shadow-destructive/50', // Replaced pink with destructive
    yellow: 'bg-warning shadow-warning/50',
  }), []);

  const gridClass = useMemo(() => `glowing-stars-grid-${starDensity}`, [starDensity]);

  return (
    <div
      className={cn("relative min-h-screen w-full overflow-hidden", className)}
      style={
        {
          "--star-color": "hsl(var(--muted-foreground))",
          "--star-glow": "hsl(var(--primary))",
        } as React.CSSProperties
      }
    >
      {/* Stars Pattern (decorative) */}
      <div aria-hidden={true} role="presentation" className={cn("absolute inset-0 opacity-60 dark:opacity-80", gridClass)}>
        {[...Array(stars)].map((_, starIdx) => {
          const isGlowing = glowingStars.includes(starIdx);
          const delay = (starIdx % 10) * 0.1;
          return (
            <div
              key={`star-${starIdx}`}
              data-testid="star-container"
              className="relative flex items-center justify-center"
            >
              <BackgroundStar
                isGlowing={isGlowing}
                delay={delay}
                starIdx={starIdx}
              />
              <AnimatePresence mode="wait">
                {isGlowing && (
                  <BackgroundGlow
                    delay={delay}
                    colorClass={glowColorClasses[glowColor as keyof typeof glowColorClasses] || glowColorClasses.blue}
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const BackgroundStar = ({ isGlowing, delay, starIdx }: { isGlowing: boolean; delay: number; starIdx?: number }) => {
  return (
    <motion.div
      // key is managed by the parent list; keep animation stable by using
      // a deterministic key when possible
      key={typeof starIdx === 'number' ? `bg-star-${starIdx}` : String(delay)}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [1, 1.5, 3, 2.5, 1.5] : 1,
        background: isGlowing ? "var(--star-glow)" : "var(--star-color)",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className="bg-[var(--star-color)] h-[2px] w-[2px] rounded-full relative z-20"
    />
  );
};

const BackgroundGlow = ({ delay, colorClass }: { delay: number; colorClass: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 0.9,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 z-10 h-[6px] w-[6px] rounded-full blur-[1px] shadow-2xl",
        colorClass
      )}
    />
  );
};
