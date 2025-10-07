'use client';

import { GridPattern } from '@/components/ui/grid-pattern';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface NavigationCardProps {
    title: ReactNode;
    href: string;
    description: string;
    icon: LucideIcon | React.ComponentType | (() => ReactNode);
    gradient: string;
    isActive?: boolean;
    onClick?: () => void;
}

export function NavigationCard({
    title,
    href,
    description,
    icon: IconComponent,
    gradient,
    isActive = false,
    onClick,
}: NavigationCardProps) {
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        hover: { scale: 1.02, y: -2 },
        tap: { scale: 0.98 },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
            }}
        >
            <Link
                href={href}
                onClick={onClick}
                className={`
          block relative overflow-hidden rounded-xl p-4 
          bg-background/80 backdrop-blur-sm border border-border/60
          hover:border-border/80 transition-all duration-300
          shadow-sm hover:shadow-md
          ${isActive ? 'ring-2 ring-primary/20 bg-primary/5' : ''}
        `}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <GridPattern
                        width={32}
                        height={32}
                        x={-1}
                        y={-1}
                        strokeDasharray="0"
                        className="[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]"
                    />
                </div>

                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: gradient,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                        {React.isValidElement(IconComponent) ? (
                            IconComponent
                        ) : typeof IconComponent === 'function' ? (
                            <IconComponent className="h-5 w-5 text-primary" />
                        ) : null}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground mb-1 truncate">
                            {title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Active Indicator */}
                {isActive && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                )}
            </Link>
        </motion.div>
    );
}