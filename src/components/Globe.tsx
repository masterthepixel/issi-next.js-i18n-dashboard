'use client';

import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    let phi = 0;

    if (canvasRef.current) {
      globeRef.current = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 1000,
        height: 1000,
        phi: 0,
        theta: 0.15,
        dark: 0,
        diffuse: 1.2,
        scale: 1.1,
        mapSamples: 16000,
        mapBrightness: 4.8,
        baseColor: [0.96, 0.97, 1],
        markerColor: [0.1, 0.2, 0.8],
        glowColor: [0.6, 0.7, 1],
        offset: [0, 0],
        markers: [
          // Headquarters - Greenbelt, MD (larger, red marker)
          { location: [39.0458, -76.8756], size: 0.08, color: [1, 0.2, 0.2] },
          // Development Centers
          { location: [56.1304, -106.3468], size: 0.04 }, // Canada
          { location: [23.6345, -102.5528], size: 0.04 }, // Mexico  
          { location: [20.5937, 78.9629], size: 0.04 }, // India
          { location: [53.1424, -7.6921], size: 0.04 }, // Ireland
          // Additional US presence
          { location: [40.7128, -74.006], size: 0.03 }, // New York
          { location: [37.7749, -122.4194], size: 0.03 }, // San Francisco
        ],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.002;
        },
      });
    }

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
      width="1000"
      height="1000"
      className="absolute inset-0"
    />
  );
}
