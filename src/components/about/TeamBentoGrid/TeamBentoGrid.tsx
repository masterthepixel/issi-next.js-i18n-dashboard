"use client";

import { motion, useReducedMotion } from "motion/react";
import { FormattedMessage } from "react-intl";

import { FeaturedTeamCard } from "./FeaturedTeamCard";
import { TeamCard } from "./TeamCard";
import { containerVariants } from "./animations";

export function TeamBentoGrid() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Section Header */}
                <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
                    <h2 className="text-3xl font-serif font-normal tracking-tight text-foreground md:text-4xl">
                        <FormattedMessage id="team.heading" />
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        <FormattedMessage id="team.subheading" />
                    </p>
                </div>

                {/* BentoGrid Layout */}
                <motion.div
                    className="grid gap-6 md:grid-cols-3"
                    variants={shouldReduceMotion ? {} : containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Featured Card - CEO (2x2 span) */}
                    <FeaturedTeamCard
                        id={1}
                        imageUrl="/images/1.webp"
                        priority={true}
                        gridClass="md:col-span-2 md:row-span-2"
                    />

                    {/* Right Column - Small Cards (2 rows) */}
                    <TeamCard
                        id={2}
                        imageUrl="/images/2.webp"
                        size="small"
                        priority={true}
                        gridClass="md:col-span-1"
                    />

                    <TeamCard
                        id={3}
                        imageUrl="/images/3.webp"
                        size="small"
                        gridClass="md:col-span-1"
                    />

                    <TeamCard
                        id={4}
                        imageUrl="/images/4.webp"
                        size="small"
                        gridClass="md:col-span-1"
                    />

                    <TeamCard
                        id={5}
                        imageUrl="/images/5.webp"
                        size="small"
                        gridClass="md:col-span-1"
                    />

                    {/* Bottom Row - Medium Cards */}
                    <TeamCard
                        id={7}
                        imageUrl="/images/7.webp"
                        size="medium"
                        gridClass="md:col-span-1"
                    />
                </motion.div>
            </div>
        </section>
    );
}
