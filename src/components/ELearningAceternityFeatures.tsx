"use client";

import {
    AcademicCapIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    DocumentTextIcon,
    PlayIcon,
    UsersIcon,
} from '@heroicons/react/20/solid';
import { motion } from "motion/react";
import { useId } from "react";
import { FormattedMessage } from "react-intl";

const features = [
    {
        nameKey: "page.eLearning.features.lms.title",
        descriptionKey: "page.eLearning.features.lms.desc",
        icon: AcademicCapIcon,
    },
    {
        nameKey: "page.eLearning.features.custom.title",
        descriptionKey: "page.eLearning.features.custom.desc",
        icon: Cog6ToothIcon,
    },
    {
        nameKey: "page.eLearning.features.partners.title",
        descriptionKey: "page.eLearning.features.partners.desc",
        icon: UsersIcon,
    },
    {
        nameKey: "page.eLearning.features.multimedia.title",
        descriptionKey: "page.eLearning.features.multimedia.desc",
        icon: PlayIcon,
    },
    {
        nameKey: "page.eLearning.features.scorm.title",
        descriptionKey: "page.eLearning.features.scorm.desc",
        icon: DocumentTextIcon,
    },
    {
        nameKey: "page.eLearning.features.talent.title",
        descriptionKey: "page.eLearning.features.talent.desc",
        icon: ChartBarIcon,
    },
];

export default function ELearningAceternityFeatures() {
    return (
        <div className="py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl text-left mb-16"
                >
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-base/7 text-primary font-semibold"
                    >
                        <FormattedMessage id="page.eLearning.features.tagline" defaultMessage="Complete Solutions" />
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-2 text-4xl font-normal tracking-tight text-pretty text-foreground sm:text-5xl font-serif"
                    >
                        <FormattedMessage id="page.eLearning.features.title" defaultMessage="E-Learning Expertise & Capabilities" />
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-6 text-lg/8 text-muted-foreground"
                    >
                        <FormattedMessage
                            id="page.eLearning.features.intro"
                            defaultMessage="Our comprehensive e-learning services combine technical expertise with industry partnerships to deliver scalable learning solutions that meet the highest standards of accessibility and compliance."
                        />
                    </motion.p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-2">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.nameKey}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.4 + index * 0.1,
                                ease: "easeOut"
                            }}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                            className="relative bg-gradient-to-b from-card to-background p-8 rounded-3xl overflow-hidden border border-border hover:border-primary/20 transition-colors duration-300"
                        >
                            <Grid size={15} />

                            {/* Icon and Title on same line */}
                            <div className="relative z-20 mb-3 flex items-center gap-2">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-2xl font-normal text-foreground">
                                    <FormattedMessage id={feature.nameKey} />
                                </h3>
                            </div>                            {/* Description */}
                            <p className="text-muted-foreground text-base font-normal relative z-20 leading-relaxed">
                                <FormattedMessage id={feature.descriptionKey} />
                            </p>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const Grid = ({
    pattern,
    size,
}: {
    pattern?: number[][];
    size?: number;
}) => {
    const p = pattern ?? [
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];
    return (
        <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
                />
            </div>
        </div>
    );
};

export function GridPattern({
    width,
    height,
    x,
    y,
    squares,
    ...props
}: {
    width: number;
    height: number;
    x: string;
    y: string;
    squares: number[][];
    className?: string;
}) {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map((square) => (
                        <rect
                            strokeWidth="0"
                            key={`${square[0]}-${square[1]}`}
                            width={width + 1}
                            height={height + 1}
                            x={square[0] * width}
                            y={square[1] * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
}
