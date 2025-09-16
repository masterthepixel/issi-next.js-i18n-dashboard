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

// Dynamically import World for SSR safety
const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), { ssr: false });

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
                <div className="absolute z-10" style={{ top: '-32px', left: 'calc(50% + 320px)', width: 400, height: 400 }}>
                    {/* Globe matches AWS region arcs */}
                    <World
                        globeConfig={{
                            pointSize: 4,
                            globeColor: "#062056",
                            showAtmosphere: true,
                            atmosphereColor: "#FFFFFF",
                            atmosphereAltitude: 0.1,
                            emissive: "#062056",
                            emissiveIntensity: 0.1,
                            shininess: 0.9,
                            polygonColor: "rgba(255,255,255,0.7)",
                            ambientLight: "#38bdf8",
                            directionalLeftLight: "#ffffff",
                            directionalTopLight: "#ffffff",
                            pointLight: "#ffffff",
                            arcTime: 1000,
                            arcLength: 0.9,
                            rings: 1,
                            maxRings: 3,
                            initialPosition: { lat: 39.0438, lng: -77.4874 }, // us-east-1 AWS
                            autoRotate: true,
                            autoRotateSpeed: 0.5,
                        }}
                        data={[
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
                            { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.3, color: "#a3e635" },   // ap-east-1 → eu-west-2
                            { order: 7, startLat: -23.5505, startLng: -46.6333, endLat: -23.5505, endLng: -46.6333, arcAlt: 0.1, color: "#eab308" }, // sa-east-1 → sa-east-1
                            { order: 7, startLat: 48.8566, startLng: 2.3522, endLat: 52.5200, endLng: 13.4050, arcAlt: 0.1, color: "#6366f1" },    // eu-west-3 → eu-central-1
                            { order: 7, startLat: 52.5200, startLng: 13.4050, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: "#06b6d4" },  // eu-central-1 → us-west-1
                            { order: 8, startLat: -8.4095, startLng: 13.2336, endLat: -33.9249, endLng: 18.4241, arcAlt: 0.2, color: "#f43f5e" },  // af-south-1 → af-south-1
                            { order: 8, startLat: 49.2827, startLng: -123.1207, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.2, color: "#f59e42" },  // ca-west-1 → eu-north-1
                            { order: 8, startLat: 1.2966, startLng: 103.7764, endLat: 39.0438, endLng: -77.4874, arcAlt: 0.5, color: "#22d3ee" },  // ap-southeast-1 → us-east-1
                            { order: 9, startLat: 51.5074, startLng: -0.1278, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: "#a3e635" }, // eu-west-2 → us-west-1
                            { order: 9, startLat: 22.3193, startLng: 114.1694, endLat: -23.5505, endLng: -46.6333, arcAlt: 0.7, color: "#eab308" },// ap-east-1 → sa-east-1
                            { order: 9, startLat: 1.2966, startLng: 103.7764, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.5, color: "#6366f1" },// ap-southeast-1 → sa-east-1
                            { order: 10, startLat: -23.5505, startLng: -46.6333, endLat: 19.0760, endLng: 72.8777, arcAlt: 0.7, color: "#06b6d4" }, // sa-east-1 → ap-south-1
                            { order: 10, startLat: 34.0522, startLng: -118.2437, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.3, color: "#f43f5e" }, // us-west-1 → ap-northeast-3
                            { order: 10, startLat: -6.2088, startLng: 106.8456, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.3, color: "#f59e42" },   // ap-southeast-1 → eu-north-1
                            { order: 11, startLat: 41.9028, startLng: 12.4964, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: "#22d3ee" }, // eu-south-1 → us-west-1
                            { order: 11, startLat: -6.2088, startLng: 106.8456, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.2, color: "#a3e635" },// ap-southeast-1 → ap-northeast-3
                            { order: 11, startLat: 22.3193, startLng: 114.1694, endLat: 1.2966, endLng: 103.7764, arcAlt: 0.2, color: "#eab308" },// ap-east-1 → ap-southeast-1
                            { order: 12, startLat: 34.0522, startLng: -118.2437, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.1, color: "#6366f1" },// us-west-1 → us-west-1
                            { order: 12, startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.2, color: "#06b6d4" },// ap-northeast-1 → ap-east-1
                            { order: 12, startLat: 22.3193, startLng: 114.1694, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.3, color: "#f43f5e" },// ap-east-1 → us-west-1
                            { order: 13, startLat: 52.5200, startLng: 13.4050, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: "#f59e42" },  // eu-central-1 → ap-east-1
                            { order: 13, startLat: -8.4095, startLng: 13.2336, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.3, color: "#22d3ee" },  // af-south-1 → ap-northeast-1
                            { order: 13, startLat: -23.5505, startLng: -46.6333, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.1, color: "#a3e635" },// sa-east-1 → sa-east-1
                            { order: 14, startLat: -33.9249, startLng: 18.4241, endLat: 21.4858, endLng: 39.1925, arcAlt: 0.3, color: "#eab308" }   // af-south-1 → me-central-1
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}