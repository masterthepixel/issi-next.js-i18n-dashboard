import Image from "next/image";
import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";

interface TeamMemberImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

/**
 * Professional team member image component with loading states
 * Reused across both featured and standard team cards
 */
export function TeamMemberImage({
    src,
    alt,
    className,
    priority = false,
}: TeamMemberImageProps) {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false);

    // Show loader after short delay to prevent flash
    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setShowLoader(true);
            }, 150);

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (hasError) {
        // Professional fallback with initials
        return (
            <div
                className={`w-full h-full ${className} bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center`}
            >
                <div className="text-slate-600 dark:text-slate-300 text-4xl font-serif font-normal">
                    {alt
                        .split(" ")
                        .map((word) => word.charAt(0).toUpperCase())
                        .join("")
                        .slice(0, 2)}
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Enhanced loading skeleton */}
            {isLoading && showLoader && (
                <div className="absolute inset-0 z-10">
                    <div className="w-full h-full bg-gradient-to-br from-slate-100/80 to-slate-200/80 dark:from-slate-800/80 dark:to-slate-900/80 animate-pulse">
                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
                            <Skeleton className="w-16 h-16 rounded-full bg-slate-300/50 dark:bg-slate-700/50" />
                            <Skeleton className="w-20 h-3 bg-slate-300/50 dark:bg-slate-700/50" />
                            <Skeleton className="w-16 h-2 bg-slate-300/50 dark:bg-slate-700/50" />
                        </div>
                    </div>
                </div>
            )}

            {/* Actual image */}
            <Image
                src={src}
                alt={alt}
                fill
                className={`${className} transition-all duration-500 ${isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
                    }`}
                onError={() => {
                    setHasError(true);
                    setIsLoading(false);
                }}
                onLoad={() => {
                    setIsLoading(false);
                    setShowLoader(false);
                }}
                priority={priority}
                loading={priority ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    );
}
