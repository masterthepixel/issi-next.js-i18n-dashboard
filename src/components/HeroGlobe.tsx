'use client';

import dynamic from 'next/dynamic';
import { FormattedMessage } from "react-intl";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('./Globe'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 animate-pulse rounded-lg" />
  ),
});

export default function HeroGlobe() {
  return (
    <div className="relative">
      <div className="relative overflow-visible">
        {/* Globe with no header text */}
        <div className="relative h-80 lg:h-96 m-6">
          <Globe />
          
          {/* Legend - Updated to match the design in the image */}
          <div className="absolute bottom-4 right-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-3 z-10 shadow-lg">
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2.5"></span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  <FormattedMessage id="hero.globe.headquarters" defaultMessage="Headquarters" />
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-orange-500 mr-2.5"></span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  AWS
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2.5"></span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  Azure
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Globe Footer Information - All content removed */}
      </div>
    </div>
  );
}
