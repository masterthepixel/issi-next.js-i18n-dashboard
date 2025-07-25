"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useState } from "react";

interface InfiniteMovingBadgesProps {
    items: string[] | { name: string; icon: React.ElementType }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
    badgeClassName?: (_index: number) => string;
    itemClassName?: string;
}

export const InfiniteMovingBadges = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
    badgeClassName = () => "", // Default empty function
    itemClassName,
}: InfiniteMovingBadgesProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(false);

    // Set the animation direction
    const getDirection = useCallback(() => {
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
    }, [direction]);

    // Set the animation speed
    const getSpeed = useCallback(() => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    }, [speed]);

    // Clone items for a seamless infinite scroll effect
    const addAnimation = useCallback(() => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            // Clone each item and append to create the infinite effect
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            // Set direction and speed
            getDirection();
            getSpeed();
            setStart(true);
        }
    }, [getDirection, getSpeed]);

    // Setup the animation when component mounts
    useEffect(() => {
        addAnimation();
    }, [addAnimation]);


    // Set the animation direction
    const getDirection = useCallback(() => {
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
    }, [direction]);

    // Set the animation speed
    const getSpeed = useCallback(() => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    }, [speed]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 flex-nowrap gap-4 py-2",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]",
                    itemClassName
                )}
            >
                {items.map((item, idx) => {
                    // Check if item is a string or an object with name and icon
                    const isObject = typeof item !== 'string';
                    const ItemIcon = isObject ? item.icon : null;
                    const itemText = isObject ? item.name : item;

                    return (
                        <li
                            className="shrink-0"
                            key={`${isObject ? item.name : item}-${idx}`}
                        >
                            <span
                                className={cn(
                                    "inline-flex items-center rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-base sm:text-lg font-medium whitespace-nowrap shadow-sm backdrop-blur-md transition-colors dark:backdrop-blur-md",
                                    badgeClassName(idx)
                                )}
                            >
                                {isObject && ItemIcon && (
                                    <ItemIcon className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
                                )}
                                {itemText}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default InfiniteMovingBadges;
