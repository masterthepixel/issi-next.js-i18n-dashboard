"use client";

import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

interface CobeGlobeProps {
    className?: string;
}

export default function CobeGlobe({ className = "" }: CobeGlobeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            diffuse: 1.2,
            dark: 1,
            markers: [
                // ISSI HQ (US East)
                { location: [39.0438, -77.4874], size: 0.03 },
                // Major cities for visual interest
                { location: [37.7749, -122.4194], size: 0.02 }, // San Francisco
                { location: [40.7128, -74.0060], size: 0.02 }, // New York
                { location: [51.5074, -0.1278], size: 0.02 }, // London
                { location: [48.8566, 2.3522], size: 0.02 }, // Paris
                { location: [35.6762, 139.6503], size: 0.02 }, // Tokyo
                { location: [1.2966, 103.7764], size: 0.02 }, // Singapore
                { location: [-23.5505, -46.6333], size: 0.02 }, // São Paulo
                { location: [-33.8688, 151.2093], size: 0.02 }, // Sydney
            ],
            onRender: (state) => {
                // Auto-rotate the globe
                phi += 0.01;
                state.phi = phi;
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <div className={`relative ${className}`}>
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '500px',
                    aspectRatio: 1,
                    cursor: 'grab',
                }}
            />
        </div>
    );
}