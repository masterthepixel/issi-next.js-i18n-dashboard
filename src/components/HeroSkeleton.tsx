import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSkeleton() {
    return (
        <div className="relative isolate overflow-hidden bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <Skeleton className="h-12 w-3/4 mx-auto" />
                    <div className="mt-6 space-y-2">
                        <Skeleton className="h-4 w-full mx-auto" />
                        <Skeleton className="h-4 w-5/6 mx-auto" />
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Skeleton className="h-12 w-32 rounded-md" />
                        <Skeleton className="h-12 w-32 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
}
