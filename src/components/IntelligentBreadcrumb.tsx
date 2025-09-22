"use client";

import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useIntl } from "react-intl";


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import dynamic from "next/dynamic";

// Dynamically import CobeGlobe for SSR safety
const CobeGlobe = dynamic(() => import("@/components/ui/CobeGlobe"), { ssr: false });

interface IntelligentBreadcrumbProps {
    className?: string;
    showHome?: boolean;
}

interface BreadcrumbSegment {
    label: string;
    href: string;
    isLast: boolean;
}

export default function IntelligentBreadcrumb({
    className = "",
    showHome = true
}: IntelligentBreadcrumbProps) {
    const pathname = usePathname();
    const intl = useIntl();

    // Helper function to get translation with fallbacks
    const getTranslatedLabel = (key: string, fallback: string): string => {
        try {
            return intl.formatMessage({ id: key, defaultMessage: fallback });
        } catch {
            // If translation fails, use the fallback
            return fallback;
        }
    };

    // Helper function to format segment names
    const formatSegmentName = (segment: string): string => {
        // Skip empty segments
        if (!segment) return '';

        // Try to get translation first
        const translationKey = `breadcrumb.${segment}`;
        try {
            const translated = intl.formatMessage({
                id: translationKey,
                defaultMessage: ''
            });
            if (translated && translated !== translationKey) {
                return translated;
            }
        } catch {
            // Translation failed, continue to formatting
        }

        // Format the segment name
        return segment
            .replace(/-/g, ' ')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    // Parse pathname into segments
    const segments = pathname.split('/').filter(Boolean);

    // Remove language segment if present
    const cleanSegments = segments.filter(segment => !['en', 'fr', 'es'].includes(segment));

    // If no meaningful segments, don't show breadcrumb
    if (cleanSegments.length === 0) {
        return null;
    }

    // Build breadcrumb segments
    const breadcrumbSegments: BreadcrumbSegment[] = [];

    // Get the language prefix for URLs
    const langPrefix = segments.find(seg => ['en', 'fr', 'es'].includes(seg));
    const basePath = langPrefix ? `/${langPrefix}` : '';

    // Build segments with proper URLs
    let currentPath = basePath;
    cleanSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const label = formatSegmentName(segment);

        if (label) {
            breadcrumbSegments.push({
                label,
                href: currentPath,
                isLast: index === cleanSegments.length - 1
            });
        }
    });

    // Don't render if no valid segments
    if (breadcrumbSegments.length === 0) {
        return null;
    }

    return (
        <div className={`py-4 ${className}`}>
            <div className="flex items-center justify-between w-full">
                <Breadcrumb className="font-serif font-normal text-3xl">
                    <BreadcrumbList>
                        {showHome && (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={basePath || "/"} className="flex items-center gap-2">
                                            <HomeIcon className="h-6 w-6" />
                                            <span className="sr-only">
                                                {getTranslatedLabel("breadcrumb.home", "Home")}
                                            </span>
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {breadcrumbSegments.length > 0 && <BreadcrumbSeparator />}
                            </>
                        )}

                        {breadcrumbSegments.map((segment) => (
                            <React.Fragment key={segment.href}>
                                <BreadcrumbItem>
                                    {segment.isLast ? (
                                        <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link href={segment.href}>{segment.label}</Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!segment.isLast && <BreadcrumbSeparator />}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="absolute z-10" style={{ top: '-32px', left: 'calc(50% + 364px)', width: 400, height: 400 }}>
                    {/* Simple globe for navigation context */}
                    <CobeGlobe className="w-full h-full" />
                </div>
            </div>
        </div>
    );
}