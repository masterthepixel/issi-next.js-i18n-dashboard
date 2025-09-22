"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, ClockIcon, TrophyIcon } from '@heroicons/react/20/solid';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';
import { FormattedMessage } from 'react-intl';

// Dynamically import the simple cobe globe component
const CobeGlobe = dynamic(() => import('./ui/CobeGlobe'), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
    ),
});

interface GlobeHeroProps {
    lang?: string;
}

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
                                <div className="relative h-64 w-64 lg:h-80 lg:w-80">
                                    {/* Animated globe placeholder */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse"></div>
                                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 animate-spin" style={{ animationDuration: '20s' }}></div>
                                    <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-primary/40 to-secondary/40 animate-ping" style={{ animationDuration: '3s' }}></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-primary font-semibold">🌍</div>
                                            <div className="text-xs text-muted-foreground mt-2">Loading Globe...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }>
                            <div className="w-full h-full">
                                <CobeGlobe />
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