"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Meteors } from "@/components/ui/meteors";
import { useTheme } from "next-themes";
import React from "react";
import { StarryBackground } from "./StarryBackground";

export const AnimatedBackground: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {theme === "dark" ? (
        <>
          <StarryBackground />
          <div className="relative h-full w-full">
            <Meteors number={30} />
          </div>
        </>
      ) : (
        <BackgroundBeams />
      )}
    </div>
  );
};
