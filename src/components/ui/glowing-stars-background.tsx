"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

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

  const { stars, columns } = densityConfig[starDensity];
  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const highlightedStars = useRef<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3000);

    return () => clearInterval(interval);
  }, [stars]);

  const glowColorClasses = {
    blue: 'bg-blue-500 shadow-blue-400',
    purple: 'bg-purple-500 shadow-purple-400',
    green: 'bg-green-500 shadow-green-400',
    pink: 'bg-pink-500 shadow-pink-400',
    yellow: 'bg-yellow-500 shadow-yellow-400',
  };
  const gridClass = `glowing-stars-grid-${starDensity}`;

  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden", className)}>
      {/* Stars Pattern */}
      <div className={cn("absolute inset-0 opacity-60 dark:opacity-80", gridClass)}>
        {[...Array(stars)].map((_, starIdx) => {
          const isGlowing = glowingStars.includes(starIdx);
          const delay = (starIdx % 10) * 0.1;
          return (
            <div
              key={`star-${starIdx}`}
              className="relative flex items-center justify-center"
            >
              <BackgroundStar
                isGlowing={isGlowing}
                delay={delay}
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

const BackgroundStar = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [1, 1.5, 3, 2.5, 1.5] : 1,
        background: isGlowing ? "#ffffff" : "#94a3b8",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className="bg-slate-400 dark:bg-slate-600 h-[2px] w-[2px] rounded-full relative z-20"
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
