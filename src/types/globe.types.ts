// Globe component TypeScript definitions
export interface DatacenterLocation {
  id: string;
  provider: 'hq' | 'aws' | 'gcp' | 'azure';
  name: string;
  coordinates: [number, number]; // [lat, lng]
  region: string;
  tier: 'hq' | 'primary' | 'secondary';
  code: string;
}

export interface ArcConnection {
  id: string;
  source: string;
  target: string;
  provider: 'hq' | 'aws' | 'gcp' | 'azure';
  color: string;
  altitude: number;
  thickness: number;
  isPriority?: boolean;
  timestamp: number;
}

export interface ActiveArc {
  id: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  altitude: number;
  thickness: number;
  timestamp: number;
}

export interface GlobeTheme {
  background: string;
  atmosphere: string;
  borders: string;
  hq: string;
  aws: string;
  gcp: string;
  azure: string;
}

export interface ProviderConfig {
  id: 'hq' | 'aws' | 'gcp' | 'azure' | 'all';
  label: string;
  color: string;
  bgColor: string;
  count: number;
  enabled: boolean;
}

export interface ArcAnimationConfig {
  maxActiveArcs: number;
  maxArcsPerProvider: number;
  hqPriorityAlways: boolean;
  hqRandomInterval: number;
  providerArcInterval: number;
  arcDuration: number;
  arcDashLength: number;
  arcDashGap: number;
  arcDashAnimateTime: number;
}

export interface GlobeControls {
  autoRotate: boolean;
  rotationSpeed: number;
  altitude: number;
  enableZoom: boolean;
  enablePan: boolean;
}

export interface DataGlobeProps {
  className?: string;
  height?: number;
  width?: number;
  theme?: 'light' | 'dark' | 'auto';
  showControls?: boolean;
  autoRotate?: boolean;
  initialProvider?: 'aws' | 'gcp' | 'azure' | 'all';
}

export interface CountryBorder {
  properties: {
    name: string;
    iso_a2: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}
