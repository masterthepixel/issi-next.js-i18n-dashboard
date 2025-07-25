"use client";

import { cn } from "@/lib/utils";
import { wrap } from "@/utils/wrap";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface ScrollBaseAnimationProps {
    children: React.ReactNode;
    baseVelocity?: number;
    delay?: number;
    clasname?: string;
    className?: string;
    showPauseControl?: boolean;
}

export default function ScrollBaseAnimation({
    children,
    baseVelocity = 3,
    delay = 0,
    clasname,
    className,
    showPauseControl = true
}: ScrollBaseAnimationProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    // const smoothVelocity = useSpring(scrollVelocity, {
    //     damping: 50,
    //     stiffness: 400
    // }); // Currently unused
    // const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    //     clamp: false
    // }); // Currently unused

    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useRef(false);
    const [isPaused, setIsPaused] = useState(false);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        prefersReducedMotion.current = mediaQuery.matches;

        const handleChange = () => {
            prefersReducedMotion.current = mediaQuery.matches;
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const x = useTransform(baseX, (v) => `${wrap(0, -100, v)}%`);

    const directionFactor = baseVelocity < 0 ? -1 : 1;

    useAnimationFrame((t, delta) => {
        // Don't animate if user prefers reduced motion or if manually paused
        if (prefersReducedMotion.current || isPaused) return;

        let moveBy = directionFactor * baseVelocity * (delta / 1000);

        if (delay > 0 && t < delay) {
            moveBy = 0;
        }

        baseX.set(baseX.get() + moveBy);
    });

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    return (
        <div className="flex flex-nowrap overflow-hidden relative whitespace-nowrap py-1.5 group" ref={containerRef}>
            <motion.div
                className={cn("flex flex-nowrap gap-4 whitespace-nowrap", clasname || className)}
                style={{ x }}
            >
                {children}
                {children}
                {children}
            </motion.div>

            {showPauseControl && (
                <button
                    onClick={togglePause}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md hover:scale-110 active:scale-95 z-10"
                    aria-label={isPaused ? "Play scrolling animation" : "Pause scrolling animation"}
                    title={isPaused ? "Play" : "Pause"}
                >
                    {isPaused ? (
                        <PlayIcon className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                    ) : (
                        <PauseIcon className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                    )}
                </button>
            )}
        </div>
    );
}
