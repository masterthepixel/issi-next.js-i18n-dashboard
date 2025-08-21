"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid: React.FC<{
    children?: React.ReactNode;
    className?: string;
}> = ({ children, className }) => {
    // Minimal, accessible grid wrapper used by Products pages until a dedicated
    // bento-grid implementation is migrated from the design system.
    return (
        <div
            role="list"
            className={cn(
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem: React.FC<{
    children?: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    href?: string;
}> = ({ children, className, title, description, icon, href }) => {
    const content = (
        <div className={cn("bg-card p-4 rounded-lg shadow-sm h-full flex flex-col", className)}>
            {icon && <div className="mb-3">{icon}</div>}
            {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground flex-grow">{description}</p>}
            {children}
        </div>
    );

    if (href) {
        return (
            <a href={href} role="listitem" className="block h-full">
                {content}
            </a>
        );
    }

    return (
        <div role="listitem" className="h-full">
            {content}
        </div>
    );
};
