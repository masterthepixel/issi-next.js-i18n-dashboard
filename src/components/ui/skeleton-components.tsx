import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// ==================== HERO SECTION SKELETONS ====================

export const HeroSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("space-y-8 p-8", className)}>
        {/* Hero Title Skeleton */}
        <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-12 w-2/3 mx-auto" />
        </div>

        {/* Hero Description */}
        <div className="space-y-2 max-w-2xl mx-auto">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Hero Buttons */}
        <div className="flex gap-4 justify-center">
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
        </div>
    </div>
);

// ==================== GLOBE SECTION SKELETONS ====================

export const GlobeSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-center p-8", className)}>
        <div className="relative">
            {/* Globe Container */}
            <Skeleton className="h-96 w-96 rounded-full" />

            {/* Globe Details */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-2 text-center">
                    <Skeleton className="h-8 w-8 rounded-full mx-auto" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
        </div>
    </div>
);

// ==================== SERVICES SECTION SKELETONS ====================

export const ServicesSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("space-y-8 p-8", className)}>
        {/* Section Header */}
        <div className="text-center space-y-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <div className="space-y-2 max-w-xl mx-auto">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 justify-center flex-wrap">
            {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <ServiceCardSkeleton key={i} />
            ))}
        </div>
    </div>
);

export const ServiceCardSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("p-6 border rounded-lg space-y-4", className)}>
        {/* Service Icon */}
        <Skeleton className="h-12 w-12 rounded-lg" />

        {/* Service Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Service Description */}
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
        </div>

        {/* Service Link */}
        <Skeleton className="h-4 w-20" />
    </div>
);

// ==================== CAROUSEL SKELETONS ====================

export const AppleCardsCarouselSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("w-full h-full py-8", className)}>
        {/* Title */}
        <div className="max-w-7xl pl-4 mx-auto mb-4">
            <Skeleton className="h-12 w-96 md:h-16 md:w-[600px]" />
        </div>

        {/* Carousel container */}
        <div className="relative w-full overflow-hidden">
            {/* Left blur effect placeholder */}
            <div className="pointer-events-none absolute top-0 left-0 h-full w-[200px] bg-gradient-to-r from-background to-transparent z-10" />

            {/* Cards container */}
            <div className="flex gap-6 pl-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex-shrink-0">
                        {/* Card skeleton matching apple-cards-carousel dimensions */}
                        <div className="relative h-80 w-56 md:h-[40rem] md:w-96 rounded-3xl bg-muted border overflow-hidden">
                            {/* Top gradient placeholder */}
                            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/20 to-transparent z-10" />

                            {/* Content area */}
                            <div className="relative z-20 p-8 space-y-4">
                                <Skeleton className="h-4 w-20 bg-white/20" />  {/* Category */}
                                <Skeleton className="h-8 w-32 md:h-12 md:w-48 bg-white/20" /> {/* Title */}
                            </div>

                            {/* Background image placeholder */}
                            <Skeleton className="absolute inset-0 bg-gradient-to-br from-muted-foreground/10 to-muted-foreground/20" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Right blur effect placeholder */}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-[200px] bg-gradient-to-l from-background to-transparent z-10" />
        </div>
    </div>
);

// ==================== NAVIGATION SKELETONS ====================

export const NavigationSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-between p-4 border-b", className)}>
        {/* Logo */}
        <Skeleton className="h-8 w-32" />

        {/* Navigation Items */}
        <div className="hidden md:flex gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-4 w-16" />
            ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-md" />
        </div>
    </div>
);

// ==================== CARD GRID SKELETONS ====================

export const CardGridSkeleton = ({
    count = 6,
    columns = 3,
    className
}: {
    count?: number;
    columns?: number;
    className?: string;
}) => (
    <div className={cn(
        `grid gap-6`,
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className
    )}>
        {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} />
        ))}
    </div>
);

export const CardSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("p-6 border rounded-lg space-y-4", className)}>
        {/* Card Image */}
        <Skeleton className="h-48 w-full rounded-md" />

        {/* Card Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Card Description */}
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Card Footer */}
        <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-16 rounded-md" />
        </div>
    </div>
);

// ==================== TESTIMONIAL SKELETONS ====================

export const TestimonialsSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("space-y-8 p-8", className)}>
        {/* Section Title */}
        <div className="text-center">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        {/* Testimonials Carousel */}
        <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
                <TestimonialCardSkeleton key={i} />
            ))}
        </div>
    </div>
);

export const TestimonialCardSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("min-w-80 p-6 border rounded-lg space-y-4", className)}>
        {/* Quote */}
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Author */}
        <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
            </div>
        </div>
    </div>
);

// ==================== FOOTER SKELETONS ====================

export const FooterSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("p-8 border-t space-y-8", className)}>
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                    <Skeleton className="h-5 w-24" />
                    <div className="space-y-2">
                        {[1, 2, 3, 4].map((j) => (
                            <Skeleton key={j} className="h-4 w-20" />
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t flex justify-between items-center">
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-6 w-6 rounded-full" />
                ))}
            </div>
        </div>
    </div>
);

// ==================== FORM SKELETONS ====================

export const FormSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("space-y-6 p-6", className)}>
        {/* Form Title */}
        <Skeleton className="h-6 w-48" />

        {/* Form Fields */}
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            ))}
        </div>

        {/* Form Actions */}
        <div className="flex gap-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-20 rounded-md" />
        </div>
    </div>
);

// ==================== TABLE SKELETONS ====================

export const TableSkeleton = ({
    rows = 5,
    columns = 4,
    className
}: {
    rows?: number;
    columns?: number;
    className?: string;
}) => (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
        {/* Table Header */}
        <div className="border-b bg-muted/50 p-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {Array.from({ length: columns }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-20" />
                ))}
            </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="p-4">
                    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                        {Array.from({ length: columns }).map((_, j) => (
                            <Skeleton key={j} className="h-4 w-16" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ==================== COMPOSITE PAGE SKELETONS ====================

export const FullPageSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("min-h-screen", className)}>
        <NavigationSkeleton />
        <HeroSkeleton />
        <div className="container mx-auto px-4 space-y-16">
            <ServicesSkeleton />
            <TestimonialsSkeleton />
        </div>
        <FooterSkeleton />
    </div>
);

export const DashboardSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("p-6 space-y-6", className)}>
        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32 rounded-md" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 border rounded-lg space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3 w-32" />
                </div>
            ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <CardGridSkeleton count={6} columns={2} />
            </div>
            <div className="space-y-6">
                <FormSkeleton />
                <TableSkeleton rows={3} columns={2} />
            </div>
        </div>
    </div>
);

// ==================== GOVERNMENT COMPONENT SKELETONS ====================

export const GovernmentClientCardSkeleton = ({ className }: { className?: string }) => (
    <div className={cn(
        "p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm",
        "dark:from-slate-800 dark:to-slate-900 dark:border-slate-700",
        "min-w-[300px] flex-shrink-0",
        className
    )}>
        {/* Government Logo */}
        <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-lg bg-blue-100/50 dark:bg-blue-900/20" />
            <div className="flex-1">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
            </div>
        </div>

        {/* Contract Details */}
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16 rounded-full bg-green-100/50 dark:bg-green-900/20" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />

            {/* Contract Value */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <Skeleton className="h-6 w-28" />
            </div>
        </div>
    </div>
);

export const GovernmentClientsSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("w-full py-8", className)}>
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-10 w-80 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
        </div>

        {/* Moving Cards Container */}
        <div className="relative overflow-hidden">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent dark:from-slate-950 z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent dark:from-slate-950 z-10" />

            {/* Scrolling Cards */}
            <div className="flex gap-6 animate-pulse">
                {Array.from({ length: 5 }).map((_, i) => (
                    <GovernmentClientCardSkeleton key={i} />
                ))}
            </div>
        </div>
    </div>
);

export const GovernmentTestimonialCardSkeleton = ({ className }: { className?: string }) => (
    <div className={cn(
        "p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg",
        "dark:bg-slate-800/80 dark:border-slate-700",
        "min-w-[350px] flex-shrink-0",
        className
    )}>
        {/* Quote Icon */}
        <div className="mb-4">
            <Skeleton className="h-8 w-8 rounded-full bg-blue-100/50 dark:bg-blue-900/20" />
        </div>

        {/* Testimonial Content */}
        <div className="space-y-4 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Skeleton className="h-12 w-12 rounded-full bg-slate-200/50 dark:bg-slate-700/50" />
            <div className="flex-1">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-28 mt-1" />
            </div>
        </div>

        {/* Rating */}
        <div className="flex gap-1 mt-4 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 rounded-sm bg-yellow-100/50 dark:bg-yellow-900/20" />
            ))}
        </div>
    </div>
);

export const GovernmentTestimonialsSkeleton = ({ className }: { className?: string }) => (
    <div className={cn("w-full py-8", className)}>
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-10 w-96 mx-auto" />
            <Skeleton className="h-6 w-80 mx-auto" />
        </div>

        {/* Moving Testimonials Container */}
        <div className="relative overflow-hidden">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent dark:from-slate-950 z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent dark:from-slate-950 z-10" />

            {/* Scrolling Testimonials */}
            <div className="flex gap-8 animate-pulse">
                {Array.from({ length: 4 }).map((_, i) => (
                    <GovernmentTestimonialCardSkeleton key={i} />
                ))}
            </div>
        </div>
    </div>
);