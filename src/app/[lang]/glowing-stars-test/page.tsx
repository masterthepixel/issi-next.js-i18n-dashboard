import { GlowingStarsBackground } from "@/components/ui/glowing-stars-background";
import GlowingStarsBackgroundCardPreview from "@/components/ui/glowing-stars-demo";
import { Locale } from "@/lib/definitions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glowing Stars Background Test - ISSI",
  description: "Test page for the glowing stars background component",
};

interface Props {
  params: { lang: Locale };
}

export default function GlowingStarsTestPage({ params: _params }: Props) {
  return (
    <div className="min-h-screen relative">
      {/* Test the background component */}
      <GlowingStarsBackground
        starDensity="medium"
        glowColor="blue"
        className="opacity-60"
      >
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Glowing Stars Background Test
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              This page demonstrates the glowing stars background component extracted from the original design.
            </p>
          </div>

          {/* Demo Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <GlowingStarsBackgroundCardPreview />

            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Background Features
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>• Animated glowing stars</li>
                <li>• Configurable density (low/medium/high)</li>
                <li>• Multiple glow colors</li>
                <li>• Smooth animations with Framer Motion</li>
                <li>• Responsive grid layout</li>
              </ul>
            </div>

            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Integration
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                This background is now integrated as the light mode background for the entire application.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Switch to dark mode to see the original starry background with meteors.
              </p>
            </div>
          </div>

          {/* Different Density Examples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Low Density</h4>
              <div className="relative h-32 bg-white/50 dark:bg-slate-900/50 rounded-lg overflow-hidden">
                <GlowingStarsBackground starDensity="low" glowColor="purple" className="opacity-80" />
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Medium Density</h4>
              <div className="relative h-32 bg-white/50 dark:bg-slate-900/50 rounded-lg overflow-hidden">
                <GlowingStarsBackground starDensity="medium" glowColor="blue" className="opacity-80" />
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">High Density</h4>
              <div className="relative h-32 bg-white/50 dark:bg-slate-900/50 rounded-lg overflow-hidden">
                <GlowingStarsBackground starDensity="high" glowColor="green" className="opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </GlowingStarsBackground>
    </div>
  );
}
