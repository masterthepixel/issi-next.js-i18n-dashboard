"use client";
import { Suspense, useEffect, useState } from "react";

export type GlobeConfig = {
    pointSize?: number;
    globeColor?: string;
    showAtmosphere?: boolean;
    atmosphereColor?: string;
    atmosphereAltitude?: number;
    emissive?: string;
    emissiveIntensity?: number;
    shininess?: number;
    polygonColor?: string;
    ambientLight?: string;
    directionalLeftLight?: string;
    directionalTopLight?: string;
    pointLight?: string;
    arcTime?: number;
    arcLength?: number;
    rings?: number;
    maxRings?: number;
    initialPosition?: {
        lat: number;
        lng: number;
    };
    autoRotate?: boolean;
    autoRotateSpeed?: number;
};

export type Position = {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
};

interface WorldProps {
    globeConfig: GlobeConfig;
    data: Position[];
}

// Loading fallback component
const GlobeLoadingFallback = () => (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Loading Globe...</p>
        </div>
    </div>
);

// Error fallback component
const GlobeErrorFallback = () => (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
            <div className="rounded-full h-12 w-12 bg-red-200 dark:bg-red-800 flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-red-600 dark:text-red-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
            </div>
            <p className="text-sm text-red-600 dark:text-red-300">Globe temporarily unavailable</p>
        </div>
    </div>
);

// Safe Globe component that handles errors
function SafeGlobeComponent({ globeConfig: _globeConfig, data: _data }: WorldProps) {
    const [hasError, setHasError] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <GlobeLoadingFallback />;
    }

    if (hasError) {
        return <GlobeErrorFallback />;
    }

    try {
        // Simple fallback globe representation
        return (
            <div className="relative h-full w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        <div className="h-48 w-48 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-2xl opacity-80 animate-pulse">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20"></div>
                            <div className="absolute inset-2 rounded-full border-2 border-white/20"></div>
                            <div className="absolute inset-4 rounded-full border border-white/10"></div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-medium">
                            Global Network
                        </div>
                        {/* Animated dots around the globe */}
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Globe component error:', error);
        setHasError(true);
        return <GlobeErrorFallback />;
    }
}

export function Globe({ globeConfig, data }: WorldProps) {
    return (
        <Suspense fallback={<GlobeLoadingFallback />}>
            <SafeGlobeComponent globeConfig={globeConfig} data={data} />
        </Suspense>
    );
}

export function World(props: WorldProps) {
    return (
        <div className="h-full w-full">
            <Globe {...props} />
        </div>
    );
}

// Utility function for hex to RGB conversion
export function hexToRgb(hex: string) {
    if (!hex || typeof hex !== 'string') {
        console.warn('hexToRgb received invalid hex value:', hex);
        return { r: 255, g: 215, b: 0 }; // Default to gold color
    }

    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 215, b: 0 };
}

// Utility function for generating random numbers
export function genRandomNumbers(min: number, max: number, count: number): number[] {
    const randomNumbers = [];
    for (let i = 0; i < count; i++) {
        randomNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return randomNumbers;
}
