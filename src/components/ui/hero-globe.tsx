"use client";
import dynamic from "next/dynamic";
import ErrorBoundary from "./error-boundary";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function HeroGlobe() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#1e293b", // slate-800 to match the hero theme
    showAtmosphere: true,
    atmosphereColor: "#e2e8f0", // slate-200
    atmosphereAltitude: 0.1,
    emissive: "#1e293b",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(148, 163, 184, 0.4)", // slate-400 with opacity
    ambientLight: "#3b82f6", // blue-500
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 39.0458, lng: -76.8756 }, // Greenbelt, MD (ISSI headquarters)
    autoRotate: true,
    autoRotateSpeed: 0.3,
  };
  
  const colors = ["#3b82f6", "#1d4ed8", "#2563eb"]; // Blue theme
  
  // Arcs representing ISSI's global connections
  const issiConnections = [
    // From Headquarters (Greenbelt, MD) to major client/development locations
    {
      order: 1,
      startLat: 39.0458,
      startLng: -76.8756,
      endLat: 38.9072, // Washington DC
      endLng: -77.0369,
      arcAlt: 0.1,
      color: colors[0],
    },
    {
      order: 1,
      startLat: 39.0458,
      startLng: -76.8756,
      endLat: 40.7128, // New York
      endLng: -74.006,
      arcAlt: 0.2,
      color: colors[1],
    },
    {
      order: 2,
      startLat: 39.0458,
      startLng: -76.8756,
      endLat: 37.7749, // San Francisco
      endLng: -122.4194,
      arcAlt: 0.3,
      color: colors[2],
    },
    {
      order: 2,
      startLat: 39.0458,
      startLng: -76.8756,
      endLat: 51.5072, // London
      endLng: -0.1276,
      arcAlt: 0.4,
      color: colors[0],
    },
    {
      order: 3,
      startLat: 39.0458,
      startLng: -76.8756,
      endLat: 28.6139, // New Delhi
      endLng: 77.209,
      arcAlt: 0.5,
      color: colors[1],
    },
    {
      order: 3,
      startLat: 39.0458,
      startLng: -76.8756,
      endLat: 35.6762, // Tokyo
      endLng: 139.6503,
      arcAlt: 0.4,
      color: colors[2],
    },
    {
      order: 4,
      startLat: 39.0458,
      startLng: -76.8756,
      endLat: -33.8688, // Sydney
      endLng: 151.2093,
      arcAlt: 0.6,
      color: colors[0],
    },
    {
      order: 4,
      startLat: 39.0458,
      startLng: -76.8756,
      endLat: 45.4215, // Ottawa
      endLng: -75.6972,
      arcAlt: 0.2,
      color: colors[1],
    },
    // Additional connections between global tech hubs
    {
      order: 5,
      startLat: 51.5072, // London
      startLng: -0.1276,
      endLat: 52.52, // Berlin
      endLng: 13.405,
      arcAlt: 0.1,
      color: colors[2],
    },
    {
      order: 5,
      startLat: 37.7749, // San Francisco
      startLng: -122.4194,
      endLat: 47.6062, // Seattle
      endLng: -122.3321,
      arcAlt: 0.1,
      color: colors[0],
    },
  ];
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
      <ErrorBoundary>
        <div className="h-full w-full">
          <World data={issiConnections} globeConfig={globeConfig} />
        </div>
      </ErrorBoundary>
    </div>
  );
}
