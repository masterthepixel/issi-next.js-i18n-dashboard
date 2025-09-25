"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, ClockIcon, TrophyIcon } from '@heroicons/react/20/solid';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';
import { FormattedMessage } from 'react-intl';
import { GlobeLoader } from './ui/universal-loader';

// Dynamically import the globe component to avoid SSR issues
const World = dynamic(() => import('./ui/globe').then(mod => mod.World), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center">
            <GlobeLoader />
        </div>
    ),
});

interface GlobeHeroProps {
    lang?: string;
}

const globeConfig = {
    pointSize: 4,
    globeColor: "#2e55f2",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "#ffffff",
    pointColor: "#ffffff",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 39.0438, lng: -77.4874 }, // us-east-1 AWS (ISSI HQ region)
    autoRotate: true,
    autoRotateSpeed: 0.6,
};

const sampleArcs = [
    { order: 1, startLat: -23.5505, startLng: -46.6333, endLat: -23.5505, endLng: -46.6333, arcAlt: 0.1, color: "#f43f5e" },   // sa-east-1 São Paulo
    { order: 1, startLat: 19.0760, startLng: 72.8777, endLat: 1.2966, endLng: 103.7764, arcAlt: 0.2, color: "#f59e42" },     // ap-south-1 → ap-southeast-1
    { order: 1, startLat: -23.5505, startLng: -46.6333, endLat: -33.9249, endLng: 18.4241, arcAlt: 0.5, color: "#22d3ee" },   // sa-east-1 → af-south-1
    { order: 2, startLat: 1.2966, startLng: 103.7764, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: "#a3e635" },     // ap-southeast-1 → ap-northeast-1
    { order: 2, startLat: 51.5074, startLng: -0.1278, endLat: 1.2966, endLng: 103.7764, arcAlt: 0.3, color: "#eab308" },     // eu-west-2 → ap-southeast-1
    { order: 2, startLat: -15.8267, startLng: -47.9218, endLat: 36.7783, endLng: -119.4179, arcAlt: 0.3, color: "#6366f1" },  // sa-east-1 → us-west-1
    { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: "#06b6d4" },   // ap-southeast-2 → ap-east-1
    { order: 3, startLat: 37.7749, startLng: -122.4194, endLat: 39.0438, endLng: -77.4874, arcAlt: 0.3, color: "#f43f5e" },   // us-west-1 → us-east-1
    { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.3, color: "#f59e42" },    // ap-southeast-1 → eu-west-2
    { order: 4, startLat: -8.4095, startLng: 13.2336, endLat: -23.5505, endLng: -46.6333, arcAlt: 0.5, color: "#22d3ee" },   // af-south-1 → sa-east-1
    { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7, color: "#a3e635" },  // sa-east-1 → ap-east-1
    { order: 4, startLat: 51.5074, startLng: -0.1278, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.1, color: "#eab308" },    // eu-west-2 → eu-west-3
    { order: 5, startLat: 14.5995, startLng: 120.9842, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.3, color: "#6366f1" },   // ap-southeast-1 → eu-west-2
    { order: 5, startLat: 1.2966, startLng: 103.7764, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.2, color: "#06b6d4" },  // ap-southeast-1 → ap-southeast-2
    { order: 5, startLat: 34.0522, startLng: -118.2437, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.2, color: "#f43f5e" },  // us-west-1 → eu-west-3
    { order: 6, startLat: -15.4167, startLng: 28.2833, endLat: 6.5244, endLng: 3.3792, arcAlt: 0.7, color: "#f59e42" },     // af-south-1 → af-south-1 (local)
    { order: 6, startLat: 37.5665, startLng: 126.9780, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.1, color: "#22d3ee" },   // ap-northeast-2 → ap-northeast-1
    { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.3, color: "#a3e635" },  // ap-east-1 → eu-west-2
    { order: 7, startLat: -23.5505, startLng: -46.6333, endLat: -23.5505, endLng: -46.6333, arcAlt: 0.1, color: "#eab308" }, // sa-east-1 → sa-east-1
    { order: 7, startLat: 48.8566, startLng: 2.3522, endLat: 52.5200, endLng: 13.4050, arcAlt: 0.1, color: "#6366f1" },    // eu-west-3 → eu-central-1
];

export default function GlobeHero({ lang: _lang = "en" }: GlobeHeroProps) {
    return (
        <section className="relative isolate overflow-hidden bg-background">
            {/* Background gradient */}
            <div className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-20" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
            </div>

            <div className="mx-auto max-w-7xl px-6 py-6 sm:py-8 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-12">
                {/* Content */}
                <motion.div
                    className="mx-auto max-w-3xl lg:mx-0 lg:flex-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Main heading */}
                    <motion.h1
                        className="mt-0 max-w-2xl text-4xl font-normal tracking-tight text-foreground sm:text-6xl lg:text-5xl xl:text-6xl"
                        style={{ fontFamily: 'var(--font-serif)' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <FormattedMessage id="hero.title" />
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="mt-6 text-lg/8 text-muted-foreground max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <FormattedMessage
                            id="hero.description"
                            values={{
                                innovativeTechnology: (chunks: React.ReactNode) => (
                                    <Link
                                        href="/services"
                                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                        title="Explore our innovative technology services"
                                        key="innovativeTechnology-link"
                                    >
                                        {chunks}
                                    </Link>
                                ),
                                government: (chunks: React.ReactNode) => (
                                    <Link
                                        href="/government"
                                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                        title="Government solutions and services"
                                        key="government-link"
                                    >
                                        {chunks}
                                    </Link>
                                ),
                                enterprise: (chunks: React.ReactNode) => (
                                    <Link
                                        href="/products"
                                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                        title="Enterprise products and solutions"
                                        key="enterprise-link"
                                    >
                                        {chunks}
                                    </Link>
                                ),
                                eLearning: (chunks: React.ReactNode) => (
                                    <Link
                                        href="/elearning"
                                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                        title="E-learning solutions"
                                        key="eLearning-link"
                                    >
                                        {chunks}
                                    </Link>
                                ),
                                compliance: (chunks: React.ReactNode) => (
                                    <Link
                                        href="/compliance"
                                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                        title="Compliance management solutions"
                                        key="compliance-link"
                                    >
                                        {chunks}
                                    </Link>
                                ),
                            }}
                        />
                    </motion.p>

                    {/* Action buttons */}
                    <motion.div
                        className="mt-4 flex items-center gap-x-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Link
                            href="/contact"
                            className={cn(buttonVariants({ variant: "default", size: "lg" }), "bg-blue-600 hover:bg-blue-700 text-white shadow-lg")}
                            title="Contact ISSI to get started"
                        >
                            Get started
                        </Link>
                        <Link
                            href="/about"
                            className={cn(buttonVariants({ variant: "default", size: "lg" }), "bg-green-600 hover:bg-green-700 text-white group")}
                            title="Learn more about ISSI"
                        >
                            Learn more
                            <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                    </motion.div>

                    {/* Stats or additional info */}
                    <motion.div
                        className="mt-4 flex items-center gap-x-6 text-sm text-muted-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                    >
                        <div className="flex items-center gap-x-2">
                            <ClockIcon className="h-4 w-4 text-primary" />
                            <span>Trusted since 1995</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <TrophyIcon className="h-4 w-4 text-primary" />
                            <span>Award-winning solutions</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Globe */}
                <motion.div
                    className="mt-8 sm:mt-16 lg:mt-0 lg:flex-shrink-0 lg:flex-grow"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.0, delay: 0.5 }}
                >
                    <div className="mx-auto flex h-96 w-96 max-w-full items-center justify-center lg:h-[500px] lg:w-[500px]">
                        <Suspense fallback={
                            <div className="flex h-full w-full items-center justify-center">
                                <GlobeLoader className="h-64 w-64 lg:h-80 lg:w-80" />
                            </div>
                        }>
                            <div className="w-full h-full">
                                <World globeConfig={globeConfig} data={sampleArcs} />
                            </div>
                        </Suspense>
                    </div>
                </motion.div>
            </div>

            {/* Bottom gradient */}
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-secondary to-primary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
            </div>
        </section>
    );
}
