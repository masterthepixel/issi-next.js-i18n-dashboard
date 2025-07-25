import { ArcAnimationConfig, GlobeTheme, ProviderConfig } from '@/types/globe.types';

// Light mode theme
export const lightTheme: GlobeTheme = {
  background: '#e2e8f0',
  atmosphere: '#3b82f6',
  borders: '#64748b',
  hq: '#dc2626',      // Red
  aws: '#ea580c',     // Orange
  gcp: '#2563eb',     // Blue
  azure: '#7c3aed'    // Purple
};

// Dark mode theme
export const darkTheme: GlobeTheme = {
  background: '#0f172a',
  atmosphere: '#1e293b',
  borders: '#334155',
  hq: '#ef4444',      // Lighter red
  aws: '#f97316',     // Lighter orange
  gcp: '#3b82f6',     // Lighter blue
  azure: '#8b5cf6'    // Lighter purple
};

// Arc animation configuration
export const arcAnimationConfig: ArcAnimationConfig = {
  maxActiveArcs: 18,              // Total limit
  maxArcsPerProvider: 3,          // Per provider limit
  hqPriorityAlways: true,         // Always show HQ → AWS us-east-1
  hqRandomInterval: 3000,         // 3 seconds between HQ random arcs
  providerArcInterval: 2000,      // 2 seconds between provider arcs
  arcDuration: 4000,              // 4 seconds arc lifetime
  arcDashLength: 0.4,
  arcDashGap: 4,
  arcDashAnimateTime: 2000
};

// Provider configurations
export const defaultProviders: ProviderConfig[] = [
  { 
    id: 'aws', 
    label: 'AWS', 
    color: '#ea580c', 
    bgColor: 'bg-orange-500 hover:bg-orange-600', 
    count: 22, 
    enabled: true 
  },
  { 
    id: 'gcp', 
    label: 'Google Cloud', 
    color: '#2563eb', 
    bgColor: 'bg-blue-500 hover:bg-blue-600', 
    count: 26, 
    enabled: false 
  },
  { 
    id: 'azure', 
    label: 'Microsoft Azure', 
    color: '#7c3aed', 
    bgColor: 'bg-purple-500 hover:bg-purple-600', 
    count: 35, 
    enabled: false 
  },
  { 
    id: 'all', 
    label: 'All Providers', 
    color: '#64748b', 
    bgColor: 'bg-gray-500 hover:bg-gray-600', 
    count: 84, 
    enabled: false 
  }
];

// Globe default settings
export const globeDefaults = {
  width: 800,
  height: 600,
  pointAltitude: 0.01,
  pointRadius: 0.8,
  pointColor: (d: any) => {
    switch (d.provider) {
      case 'hq': return '#dc2626';
      case 'aws': return '#ea580c';
      case 'gcp': return '#2563eb';
      case 'azure': return '#7c3aed';
      default: return '#64748b';
    }
  },
  pointLabel: (d: any) => `
    <div class="bg-black/90 text-white px-3 py-2 rounded-lg shadow-lg max-w-xs">
      <div class="font-bold text-sm">${d.name}</div>
      <div class="text-xs opacity-75">${d.region}</div>
      <div class="text-xs opacity-50">${d.code}</div>
    </div>
  `,
  autoRotate: true,
  autoRotateSpeed: 0.5,
  enableZoom: true,
  enablePan: true
};

// Performance optimizations
export const performanceConfig = {
  pointsMerge: true,
  rendererConfig: {
    antialias: true,
    alpha: true,
    precision: 'mediump' as const,
    powerPreference: 'default' as const
  },
  animationFrameRate: 60,
  maxConcurrentAnimations: 18
};
