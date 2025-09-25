import { ReactNode, Suspense, useEffect, useState } from 'react';

// Higher-order component for adding skeleton loading to any component
export interface WithSkeletonProps {
    isLoading?: boolean;
    fallback: ReactNode;
    children: ReactNode;
    className?: string;
}

export const WithSkeleton = ({
    isLoading = false,
    fallback,
    children,
    className
}: WithSkeletonProps) => {
    if (isLoading) {
        return <div className={className}>{fallback}</div>;
    }

    return <>{children}</>;
};

// Hook for managing skeleton loading states
export const useSkeletonLoading = (initialState = true) => {
    const [isLoading, setIsLoading] = useState(initialState);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return { isLoading, startLoading, stopLoading };
};

// Suspense wrapper with skeleton fallback
export interface SuspenseSkeletonProps {
    fallback: ReactNode;
    children: ReactNode;
    className?: string;
}

export const SuspenseSkeleton = ({
    fallback,
    children,
    className
}: SuspenseSkeletonProps) => (
    <Suspense fallback={<div className={className}>{fallback}</div>}>
        {children}
    </Suspense>
);

// Performance-optimized skeleton wrapper
export interface SkeletonWrapperProps {
    isLoading: boolean;
    skeleton: ReactNode;
    children: ReactNode;
    loadingDelay?: number; // Delay before showing skeleton (prevents flash)
    className?: string;
}

export const SkeletonWrapper = ({
    isLoading,
    skeleton,
    children,
    loadingDelay = 200,
    className
}: SkeletonWrapperProps) => {
    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isLoading) {
            timeoutId = setTimeout(() => setShowSkeleton(true), loadingDelay);
        } else {
            setShowSkeleton(false);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isLoading, loadingDelay]);

    if (isLoading && showSkeleton) {
        return <div className={className}>{skeleton}</div>;
    }

    if (isLoading && !showSkeleton) {
        return null; // Prevent flash of skeleton for quick loads
    }

    return <>{children}</>;
};