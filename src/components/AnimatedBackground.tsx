"use client";

import { Meteors } from "@/components/ui/meteors";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";

export const AnimatedBackground: React.FC = () => {
  const { theme } = useTheme();
  
  // Only render meteors in dark mode
  if (theme !== "dark") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="relative h-full w-full bg-transparent">
        <Meteors number={30} />
      </div>
    </div>
  );
};
