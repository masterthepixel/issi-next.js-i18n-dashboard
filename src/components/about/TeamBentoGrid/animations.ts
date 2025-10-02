/**
 * Framer Motion animation variants for TeamBentoGrid
 * Following ISSI animation standards with performance optimization
 */

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.6, -0.05, 0.01, 0.99] as const,
        },
    },
};

export const featuredCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99] as const,
        },
    },
};

export const imageOverlayVariants = {
    initial: { opacity: 0 },
    hover: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
};

export const featuredHoverEffects = {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3 },
};

export const smallCardHoverEffects = {
    scale: 1.05,
    y: -2,
    transition: { duration: 0.2 },
};

// Badge pulse animation (not using variants to avoid TypeScript readonly issues)
export const badgePulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
    },
};
