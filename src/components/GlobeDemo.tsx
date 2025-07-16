"use client";
import { generateNetworkArcs } from "@/utils/networkTopology";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function GlobeDemo() {
  const globeConfig = {
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
    initialPosition: { lat: 38.9912, lng: -76.8751 }, // Center on ISSI HQ
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  // Generate network arcs from ISSI datacenter topology
  const networkArcs = generateNetworkArcs();

  return (
    <div className="flex flex-row items-start justify-start h-auto relative w-full overflow-visible">
      <div className="max-w-7xl mx-auto w-full relative overflow-visible h-auto min-h-[20rem] px-2">
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
        </div>        {/* Globe positioned at the same level as the text */}
        <div className="absolute w-2/3 top-20 right-0 h-[60vh] md:h-[24rem] z-10">
          <World data={networkArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
