"use client";
import { generateNetworkArcs } from "@/utils/networkTopology";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function GlobeDemo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if dark mode
  const isDark = theme === 'dark';

  // Theme-aware globe configuration
  const globeConfig = {
    pointSize: 0.8,  // Much smaller points (reduced from 1.6 to 0.8)
    
    // Dark mode configuration
    ...(isDark ? {
      globeColor: "#062056",                    // Deep blue globe
      polygonColor: "rgba(255,255,255,0.7)",   // White country borders
      ambientLight: "#38bdf8",                  // Blue ambient lighting
      emissive: "#062056",                      // Dark blue emissive
      emissiveIntensity: 0.1,
      atmosphereColor: "#FFFFFF",               // White atmosphere
    } : {
      // Light mode configuration
      globeColor: "#1e40af",                    // Realistic ocean blue like satellite photos
      polygonColor: "rgba(255,255,255,0.8)",   // Bright white country borders for contrast
      ambientLight: "#FFFFFF",                  // Bright white lighting
      emissive: "#1e40af",                      // Ocean blue emissive
      emissiveIntensity: 0.05,                  // Reduced intensity for light mode
      atmosphereColor: "#87CEEB",               // Sky blue atmosphere
    }),
    
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    shininess: 0.9,
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 600,    // Faster arc animation (reduced from 1000)
    arcLength: 0.7,  // Slightly shorter arcs for more frequent traffic
    initialPosition: { lat: 38.9912, lng: -76.8751 }, // Center on ISSI HQ
    autoRotate: true,
    autoRotateSpeed: 0.3, // Slower rotation to better see traffic
    
    // Point transparency and ring settings (much more subtle)
    pointOpacity: 0.6,      // More transparent points
    ringOpacity: 0.2,       // Very subtle ring animations
    ringIntensity: 0.3,     // Much reduced ring animation intensity
    rings: 1,               // Only 1 ring to reduce visual clutter
    maxRings: 2,            // Maximum 2 rings instead of 4
  };

  // Generate network arcs from ISSI datacenter topology
  const networkArcs = generateNetworkArcs();

  // Prevent rendering until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="flex flex-row items-start justify-start h-auto relative w-full overflow-visible min-h-screen">
        <div className="max-w-7xl mx-auto w-full relative overflow-visible h-auto min-h-[40rem] px-2">
          <div className="absolute left-4 top-20 z-20 max-w-md">
            <div className="text-left text-xl md:text-4xl font-bold text-black dark:text-white">
              Global Infrastructure Network
            </div>
            <p className="text-left text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 mt-4">
              Loading global network visualization...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-start justify-start h-auto relative w-full overflow-visible min-h-screen">
      <div className="max-w-7xl mx-auto w-full relative overflow-visible h-auto min-h-[40rem] px-2">
        {/* Text content positioned to the left */}
        <div className="absolute left-4 top-20 z-20 max-w-md">
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="div"
          >
            <h2 className="text-left text-xl md:text-4xl font-bold text-black dark:text-white">
              Global Infrastructure Network
            </h2>
            <p className="text-left text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 mt-4">
              ISSI&apos;s multi-cloud datacenter network spanning AWS, Google Cloud, and Azure regions worldwide.
            </p>
          </motion.div>
        </div>        {/* Globe positioned with full viewport to prevent arc clipping */}
        <div className="absolute inset-0 w-full h-full overflow-visible z-10" style={{ minHeight: '100vh' }}>
          <div className="relative w-full h-full flex items-center justify-end pr-8">
            <div className="w-[70%] h-[80vh] max-w-none overflow-visible">
              <World data={networkArcs} globeConfig={globeConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
