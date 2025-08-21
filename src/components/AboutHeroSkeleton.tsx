import { Skeleton } from "@/components/ui/skeleton";

export default function AboutHeroSkeleton() {
    return (
        <div className="relative isolate overflow-hidden bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pt-4 lg:pr-8">
                        <div className="space-y-6">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-12 w-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center lg:justify-end">
                        <Skeleton className="h-96 w-full max-w-lg rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}