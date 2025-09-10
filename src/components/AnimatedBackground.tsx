"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Meteors } from "@/components/ui/meteors";
import { useTheme } from "next-themes";
import React from "react";
import { StarryBackground } from "./StarryBackground";

export const AnimatedBackground: React.FC = () => {
  const { theme } = useTheme();

  // Render BackgroundBeams in light mode, StarryBackground + Meteors in dark mode
  if (theme !== "dark") {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <BackgroundBeams className="opacity-80" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <StarryBackground />
      <div className="relative h-full w-full">
        <Meteors number={30} />
      </div>
    </div>
  );
};
