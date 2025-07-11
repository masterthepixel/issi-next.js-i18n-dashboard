"use client";

import { cn } from "@/lib/utils";
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

// Custom hook for creating transform styles based on direction
function useGetTransform(baseX: any, contentWidth: number, baseVelocity: number, isClone = false) {
    // Create transform value outside conditional logic to comply with React hooks rules
    const rightToLeftTransform = useTransform(baseX, x => `calc(${x}px + ${contentWidth}px)`);
    const leftToRightTransform = useTransform(baseX, x => `calc(${x}px - ${contentWidth}px)`);

    if (baseVelocity > 0) { // Right to left
        return isClone
            ? { x: rightToLeftTransform }
            : { x: baseX };
    } else { // Left to right
        return isClone
            ? { x: leftToRightTransform }
            : { x: baseX };
    }
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
    // Prefix with underscore to indicate it's kept for future use but currently unused
    const _smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useRef(false);
    const [isPaused, setIsPaused] = useState(false);
    // Keep containerWidth for future use but prefix with underscore to avoid linting warnings
    const [_containerWidth, setContainerWidth] = useState(0);
    const [contentWidth, setContentWidth] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

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

    // Measure container and content width for proper looping
    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        const measureWidths = () => {
            if (!containerRef.current || !contentRef.current) return;
            setContainerWidth(containerRef.current.offsetWidth);
            setContentWidth(contentRef.current.offsetWidth);
        };

        measureWidths();
        window.addEventListener('resize', measureWidths);
        return () => window.removeEventListener('resize', measureWidths);
    }, []);

    // Animation frame loop with looping logic
    useAnimationFrame((t, delta) => {
        // Don't animate if user prefers reduced motion or if manually paused
        if (prefersReducedMotion.current || isPaused || contentWidth === 0) return;

        // Even faster animation with optimized timing
        let moveBy = baseVelocity * (delta / 500);

        if (delay > 0 && t < delay) {
            moveBy = 0;
        }

        let newX = baseX.get() + moveBy;

        // Improved looping logic - reset position when fully out of view for continuous flow
        if (baseVelocity > 0) { // Right to left
            if (newX <= -contentWidth) {
                // Ensure perfect looping by resetting exactly
                newX = 0;
            }
        } else { // Left to right
            if (newX >= contentWidth) {
                // Ensure perfect looping by resetting exactly
                newX = 0;
            }
        }

        baseX.set(newX);
    });

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    // Use our custom hook to get the transform styles
    const primaryTransform = useGetTransform(baseX, contentWidth, baseVelocity);
    const cloneTransform = useGetTransform(baseX, contentWidth, baseVelocity, true);

    return (
        <div className="flex flex-nowrap overflow-visible relative whitespace-nowrap py-6 group" ref={containerRef}>
            <div className="absolute inset-0 flex w-full overflow-visible">
                <motion.div
                    ref={contentRef}
                    className={cn("flex flex-nowrap whitespace-nowrap items-center overflow-visible min-w-max", clasname || className)}
                    style={primaryTransform}
                >
                    {children}
                </motion.div>

                <motion.div
                    className={cn("flex flex-nowrap whitespace-nowrap items-center overflow-visible min-w-max", clasname || className)}
                    style={cloneTransform}
                >
                    {children}
                </motion.div>
            </div>

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
