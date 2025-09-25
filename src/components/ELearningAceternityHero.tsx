"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

export default function ELearningAceternityHero() {
    return (
        <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
            <div className="px-4 py-4 md:py-8">
                {/* Animated headline */}
                <h1 className="relative z-10 max-w-4xl text-left text-2xl font-normal text-foreground md:text-4xl lg:text-7xl">
                    {"Transform Learning Experiences with Advanced E-Learning Solutions"
                        .split(" ")
                        .map((word, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                    ease: "easeInOut",
                                }}
                                className="mr-2 inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                </h1>

                {/* Animated description */}
                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 0.8,
                    }}
                    className="relative z-10 max-w-xl py-4 text-left text-lg font-normal text-muted-foreground"
                >
                    <FormattedMessage
                        id="page.eLearning.hero.intro"
                        defaultMessage="With strong expertise in managing the Instructional Systems Design (ISD) process - including conceptualization of design, e-Learning development, implementation, and evaluation - ISSI's professionals have successfully implemented user and system documentation/training for our clients."
                    />
                </motion.p>

                {/* Animated buttons */}
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1,
                    }}
                    className="relative z-10 mt-8 flex flex-wrap items-start justify-start gap-4"
                >
                    <button
                        className="w-60 transform rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
                        aria-label="Get started with e-learning solutions"
                    >
                        <FormattedMessage
                            id="page.eLearning.cta.primary"
                            defaultMessage="Get Started Today"
                        />
                    </button>
                    <button
                        className="w-60 transform rounded-lg border border-border bg-background px-6 py-2 font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted"
                        aria-label="Schedule a consultation for e-learning services"
                    >
                        <FormattedMessage
                            id="page.eLearning.cta.secondary"
                            defaultMessage="Schedule Consultation"
                        />
                    </button>
                </motion.div>

                {/* Animated showcase image */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1.2,
                    }}
                    className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                >
                    <div className="w-full overflow-hidden rounded-xl border border-border">
                        <Image
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675&q=75"
                            alt="E-Learning Platform Preview - Students using modern educational technology"
                            className="aspect-[16/9] h-auto w-full object-cover"
                            height={675}
                            width={1200}
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        />
                    </div>
                </motion.div>

                {/* Stats section */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1.4,
                    }}
                    className="relative z-10 mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
                >
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">30+</div>
                        <div className="text-sm text-muted-foreground">
                            <FormattedMessage
                                id="elearning.aceternity.hero.stats.years"
                                defaultMessage="Years of Experience"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">500+</div>
                        <div className="text-sm text-muted-foreground">
                            <FormattedMessage
                                id="elearning.aceternity.hero.stats.projects"
                                defaultMessage="Learning Solutions Delivered"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">100%</div>
                        <div className="text-sm text-muted-foreground">
                            <FormattedMessage
                                id="elearning.aceternity.hero.stats.compliance"
                                defaultMessage="SCORM & Section 508 Compliance"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
