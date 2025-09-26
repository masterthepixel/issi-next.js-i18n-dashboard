"use client";

import { useEffect, useState } from 'react';

/**
 * Custom hook for debounced scroll-triggered animations using requestAnimationFrame
 * Reduces animation triggers during scroll events for better performance
 */
export function useScrollDebounce(threshold: number = 0.1) {
    const [isInView, setIsInView] = useState(false);
    const [element, setElement] = useState<Element | null>(null);

    useEffect(() => {
        if (!element) return;

        let rafId: number;
        let ticking = false;

        const checkVisibility = () => {
            if (!ticking) {
                rafId = requestAnimationFrame(() => {
                    const rect = element.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const elementTop = rect.top;
                    const elementBottom = rect.bottom;

                    // Check if element is in viewport with threshold
                    const isVisible = elementTop < windowHeight * (1 + threshold) &&
                        elementBottom > -windowHeight * threshold;

                    setIsInView(isVisible);
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Initial check
        checkVisibility();

        // Add scroll listener with passive option for better performance
        window.addEventListener('scroll', checkVisibility, { passive: true });

        return () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            window.removeEventListener('scroll', checkVisibility);
        };
    }, [element, threshold]);

    return { isInView, ref: setElement };
}