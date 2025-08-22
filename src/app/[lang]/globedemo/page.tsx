'use client';

import Spinner from "@/components/Spinner";
import { useRouter } from 'next/navigation';
import { lazy, Suspense } from 'react';

const GlobeDemo = lazy(() => import("@/components/GlobeDemo"));

interface Props {
    params: {
        lang: string;
    };
}

export default function GlobeDemoPage({ params: { lang: locale } }: Props) {
    const router = useRouter();

    return (
        <Suspense fallback={<Spinner />}>
            <div className="min-h-screen bg-background overflow-visible">
                <div className="container mx-auto px-4 py-8 overflow-visible">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-foreground mb-4">
                            Interactive Globe Demo
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                            Explore global data visualization with our interactive globe
                        </p>
                        <button
                            onClick={() => router.push(`/${locale}/home`)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                    <div className="w-full min-h-[600px] lg:min-h-[700px] relative mb-8 overflow-visible">
                        <GlobeDemo />
                    </div>
                </div>
            </div>
        </Suspense>
    );
}