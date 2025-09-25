// Example: How to integrate skeleton loading with existing components

import { CardGridSkeleton, ServicesSkeleton } from '@/components/ui/skeleton-components';
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper';
import { motion } from 'motion/react';
import { Suspense, useEffect, useState } from 'react';

// ==================== ENHANCED SERVICE COMPONENT EXAMPLE ====================

// Example of how to add skeleton loading to your ISSIServicesShowcase
export const EnhancedISSIServicesShowcase = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);

    // Simulate data loading
    useEffect(() => {
        const loadServices = async () => {
            setIsLoading(true);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Load your actual services data here
            setServices([/* your services data */]);
            setIsLoading(false);
        };

        loadServices();
    }, []);

    return (
        <SkeletonWrapper
            isLoading={isLoading}
            skeleton={<ServicesSkeleton />}
            loadingDelay={100} // Show skeleton after 100ms to prevent flash
        >
            {/* Your existing ISSIServicesShowcase content */}
            <motion.section className="py-16">
                {/* Your actual component content here */}
            </motion.section>
        </SkeletonWrapper>
    );
};

// ==================== COMPONENT-SPECIFIC SKELETONS ====================

// Custom skeleton that matches your exact service card layout
export const ISSIServiceCardSkeleton = () => (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg">
        {/* Icon skeleton */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <div className="h-6 w-6 animate-pulse rounded bg-primary/20" />
        </div>

        {/* Title skeleton */}
        <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-foreground/10" />

        {/* Description skeleton */}
        <div className="mb-4 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted-foreground/10" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted-foreground/10" />
            <div className="h-4 w-3/5 animate-pulse rounded bg-muted-foreground/10" />
        </div>

        {/* Learn more link skeleton */}
        <div className="flex items-center">
            <div className="h-4 w-20 animate-pulse rounded bg-primary/20" />
            <div className="ml-1 h-4 w-4 animate-pulse rounded bg-primary/20" />
        </div>
    </div>
);

// ==================== PERFORMANCE OPTIMIZATION PATTERNS ====================

// Pattern 1: Intersection Observer Loading
export const LazyLoadedSection = ({ children }: { children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [ref, setRef] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' } // Start loading 200px before visible
        );

        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref]);

    return (
        <div ref={setRef}>
            {isVisible ? (
                <Suspense fallback={<ServicesSkeleton />}>
                    {children}
                </Suspense>
            ) : (
                <ServicesSkeleton />
            )}
        </div>
    );
};

// Pattern 2: Progressive Loading
export const ProgressiveServiceShowcase = () => {
    const [loadingStage, setLoadingStage] = useState<'skeleton' | 'basic' | 'full'>('skeleton');

    useEffect(() => {
        // Stage 1: Show skeleton immediately
        const timer1 = setTimeout(() => setLoadingStage('basic'), 500);

        // Stage 2: Show basic content
        const timer2 = setTimeout(() => setLoadingStage('full'), 1500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    if (loadingStage === 'skeleton') {
        return <ServicesSkeleton />;
    }

    if (loadingStage === 'basic') {
        return (
            <div className="space-y-8 p-8">
                {/* Show titles first, then load content */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Our Services</h2>
                    <p className="text-muted-foreground">Professional IT solutions</p>
                </div>
                <CardGridSkeleton count={6} columns={3} />
            </div>
        );
    }

    // Full content loaded
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Your full component content */}
        </motion.section>
    );
};

// ==================== DATA FETCHING WITH SKELETONS ====================

// Custom hook for data fetching with skeleton states
export const useServicesData = () => {
    const [state, setState] = useState<{
        data: unknown;
        isLoading: boolean;
        error: Error | null;
        showSkeleton: boolean;
    }>({
        data: null,
        isLoading: true,
        error: null,
        showSkeleton: false
    });

    useEffect(() => {
        let mounted = true;

        // Show skeleton after small delay to prevent flash
        const skeletonTimer = setTimeout(() => {
            if (mounted) {
                setState(prev => ({ ...prev, showSkeleton: true }));
            }
        }, 100);

        // Fetch data
        const fetchData = async () => {
            try {
                // Your API call here
                const response = await fetch('/api/services');
                const data = await response.json();

                if (mounted) {
                    setState({
                        data,
                        isLoading: false,
                        error: null,
                        showSkeleton: false
                    });
                }
            } catch (error) {
                if (mounted) {
                    setState(prev => ({
                        ...prev,
                        isLoading: false,
                        error: error as Error,
                        showSkeleton: false
                    }));
                }
            }
        };

        fetchData();

        return () => {
            mounted = false;
            clearTimeout(skeletonTimer);
        };
    }, []);

    return state;
};

// Usage example:
export const DataDrivenServicesShowcase = () => {
    const { data: _data, isLoading, error, showSkeleton } = useServicesData();

    if (error) {
        return <div className="text-center text-red-500">Error loading services</div>;
    }

    if (isLoading && showSkeleton) {
        return <ServicesSkeleton />;
    }

    if (isLoading) {
        return null; // Prevent flash before skeleton appears
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Render your actual services */}
        </motion.section>
    );
};

// ==================== PERFORMANCE BEST PRACTICES ====================

/*
PERFORMANCE OPTIMIZATION STRATEGIES:

1. **Skeleton Timing**:
   - Use 100-200ms delay before showing skeleton
   - Prevents flash for quick loads
   - Improves perceived performance

2. **Progressive Loading**:
   - Load critical content first (titles, structure)
   - Load images and interactive elements second
   - Load non-essential features last

3. **Intersection Observer**:
   - Only load components when they're about to be visible
   - Reduces initial bundle size and parsing time
   - Improves Core Web Vitals scores

4. **Content-Aware Skeletons**:
   - Match skeleton structure to actual content layout
   - Use same spacing, sizes, and proportions
   - Prevents layout shift when content loads

5. **Memory Management**:
   - Clean up timers and observers
   - Avoid memory leaks in loading states
   - Use proper dependency arrays in useEffect

6. **Error Boundaries**:
   - Wrap skeleton components in error boundaries
   - Provide fallback UI if skeleton fails
   - Graceful degradation for edge cases

IMPLEMENTATION CHECKLIST:
✅ Add skeleton delay to prevent flash
✅ Match skeleton layout to actual content
✅ Use intersection observer for below-fold content
✅ Implement progressive loading stages
✅ Add proper cleanup in useEffect
✅ Test on slow connections and devices
✅ Measure performance improvements with metrics
*/