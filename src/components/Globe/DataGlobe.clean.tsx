"use client";

import {
    darkTheme,
    defaultProviders,
    globeDefaults,
    lightTheme,
    performanceConfig
} from '@/config/globeTheme';
import {
    allLocations,
    awsLocations,
    azureLocations,
    gcpLocations,
    issiHeadquarters
} from '@/data/locations';
import { useArcAnimations } from '@/hooks/useArcAnimations';
import { useTheme } from '@/hooks/useTheme';
import { DataGlobeProps, DatacenterLocation, ProviderConfig } from '@/types/globe.types';
import { Monitor, Moon, Pause, Play, RotateCcw, Sun } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

// Dynamic import to prevent SSR issues with Three.js
const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading...</div>
});

export default function DataGlobe({
  className = '',
  height = 600,
  width = 800,
  theme: initialTheme = 'auto',
  showControls = true,
  autoRotate = true,
  initialProvider = 'aws'
}: DataGlobeProps) {
  const { theme, setTheme, isDark } = useTheme(initialTheme);
  const [providers, setProviders] = useState<ProviderConfig[]>(() => 
    defaultProviders.map(p => ({ 
      ...p, 
      enabled: p.id === 'hq' || p.id === initialProvider 
    }))
  );
  const [isAnimating, setIsAnimating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [globeReady, setGlobeReady] = useState(false);

  const enabledProviders = useMemo(() => 
    providers.filter(p => p.enabled).map(p => p.id), 
    [providers]
  );

  const filteredLocations = useMemo(() => {
    const locations: DatacenterLocation[] = [issiHeadquarters];
    
    if (enabledProviders.includes('aws')) locations.push(...awsLocations);
    if (enabledProviders.includes('gcp')) locations.push(...gcpLocations);
    if (enabledProviders.includes('azure')) locations.push(...azureLocations);
    if (enabledProviders.includes('all')) locations.push(...allLocations.slice(1)); // Exclude HQ duplicate
    
    return locations;
  }, [enabledProviders]);

  const { activeArcs, startAnimations, stopAnimations } = useArcAnimations(
    enabledProviders, 
    filteredLocations
  );

  const currentTheme = isDark ? darkTheme : lightTheme;

  const toggleProvider = (providerId: string) => {
    setProviders(prev => {
      if (providerId === 'all') {
        const allEnabled = prev.find(p => p.id === 'all')?.enabled;
        return prev.map(p => ({ 
          ...p, 
          enabled: p.id === 'hq' || (p.id === 'all' ? !allEnabled : !allEnabled) 
        }));
      } else {
        return prev.map(p => {
          if (p.id === providerId) {
            return { ...p, enabled: !p.enabled };
          } else if (p.id === 'all') {
            return { ...p, enabled: false };
          }
          return p;
        });
      }
    });
  };

  const toggleAnimation = () => {
    if (isAnimating) {
      stopAnimations();
    } else {
      startAnimations(isDark);
    }
    setIsAnimating(!isAnimating);
  };

  const handleGlobeReady = () => {
    setIsLoading(false);
    setGlobeReady(true);
  };

  // Initialize animations when globe is ready
  useEffect(() => {
    if (globeReady && isAnimating) {
      startAnimations(isDark);
    }
  }, [globeReady, isAnimating, startAnimations, isDark]);

  // Handle theme changes
  useEffect(() => {
    if (globeReady && isAnimating) {
      stopAnimations();
      setTimeout(() => startAnimations(isDark), 100);
    }
  }, [isDark, globeReady, isAnimating, stopAnimations, startAnimations]);

  return (
    <div className={`relative ${className}`}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-slate-900/90 z-10 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-300">Loading ISSI Global Infrastructure...</p>
          </div>
        </div>
      )}

      {/* Controls Panel */}
      {showControls && (
        <div className="absolute top-4 left-4 z-20 space-y-4">
          {/* Theme Selector */}
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={() => setTheme('light')}
                className={`p-2 rounded-md transition-colors ${
                  theme === 'light' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
                title="Light Mode"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-2 rounded-md transition-colors ${
                  theme === 'dark' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
                title="Dark Mode"
              >
                <Moon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('auto')}
                className={`p-2 rounded-md transition-colors ${
                  theme === 'auto' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
                title="Auto Mode"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Animation Controls */}
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={toggleAnimation}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-sm">{isAnimating ? 'Pause' : 'Play'}</span>
              </button>
              <button
                onClick={() => console.log('Reset view')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Provider Toggle Buttons */}
      {showControls && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <h3 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
              Cloud Providers
            </h3>
            <div className="space-y-2">
              {providers.filter(p => p.id !== 'hq').map(provider => (
                <button
                  key={provider.id}
                  onClick={() => toggleProvider(provider.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                    provider.enabled
                      ? `${provider.bgColor} text-white`
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{provider.label}</span>
                  <span className="text-xs opacity-75">
                    {provider.enabled ? '●' : '○'} {provider.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats Panel */}
      {showControls && (
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <div>Locations: <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredLocations.length}</span></div>
              <div>Active Arcs: <span className="font-semibold text-slate-800 dark:text-slate-200">{activeArcs.length}</span></div>
              <div>Status: <span className={`font-semibold ${isAnimating ? 'text-green-600' : 'text-orange-600'}`}>
                {isAnimating ? 'Active' : 'Paused'}
              </span></div>
            </div>
          </div>
        </div>
      )}

      {/* Globe Container */}
      <div className="rounded-xl overflow-hidden shadow-2xl w-full h-full">
        <Globe
          width={width}
          height={height}
          backgroundColor={currentTheme.background}
          atmosphereColor={currentTheme.atmosphere}
          onGlobeReady={handleGlobeReady}
          
          // Globe textures (hybrid approach)
          globeImageUrl={isDark ? '/textures/earth-night-2k.webp' : '/textures/earth-day-2k.webp'}
          
          // Vector overlay for borders
          polygonsData={[]} // You can add country borders here if needed
          polygonCapColor="transparent"
          polygonStrokeColor={currentTheme.borders}
          
          // Points (datacenters)
          pointsData={filteredLocations}
          pointLat={(d: any) => d.coordinates[0]}
          pointLng={(d: any) => d.coordinates[1]}
          pointAltitude={globeDefaults.pointAltitude}
          pointRadius={(d: any) => d.tier === 'hq' ? 1.2 : 0.8}
          pointColor={(d: any) => {
            switch (d.provider) {
              case 'hq': return currentTheme.hq;
              case 'aws': return currentTheme.aws;
              case 'gcp': return currentTheme.gcp;
              case 'azure': return currentTheme.azure;
              default: return currentTheme.borders;
            }
          }}
          pointLabel={globeDefaults.pointLabel}
          pointsMerge={performanceConfig.pointsMerge}
          
          // Arcs (connections)
          arcsData={activeArcs}
          arcStartLat={(d: any) => d.startLat}
          arcStartLng={(d: any) => d.startLng}
          arcEndLat={(d: any) => d.endLat}
          arcEndLng={(d: any) => d.endLng}
          arcColor={(d: any) => d.color}
          arcAltitude={(d: any) => d.altitude}
          arcStroke={(d: any) => d.thickness}
          arcDashLength={0.4}
          arcDashGap={4}
          arcDashAnimateTime={2000}
          
          // Performance settings
          rendererConfig={performanceConfig.rendererConfig}
          
          // Animation
          enablePointerInteraction={true}
        />
      </div>
    </div>
  );
}
