// ==========================================
// 🌍 3D Globe System Type Library
// ==========================================

/**
 * Globe component base configuration
 */
export interface GlobeConfig {
  width: number;
  height: number;
  devicePixelRatio?: number;
  enableInteraction?: boolean;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

/**
 * Globe visual settings
 */
export interface GlobeVisualConfig {
  showAtmosphere?: boolean;
  showGraticules?: boolean;
  backgroundColor?: string;
  globeColor?: string;
  atmosphereColor?: string;
  atmosppehereAltitude?: number;
}

/**
 * Globe lighting configuration
 */
export interface GlobeLightingConfig {
  ambient: {
    intensity: number;
    color?: string;
  };
  directional: {
    intensity: number;
    color?: string;
    position?: [number, number, number];
  };
  point: {
    intensity: number;
    color?: string;
    position?: [number, number, number];
  };
}

/**
 * Globe arc data structure
 */
export interface GlobeArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color?: string;
  strokeWidth?: number;
  dashSize?: number;
  dashGap?: number;
  dashInitialGap?: number;
  dashAnimateTime?: number;
  altitude?: number;
  altitudeAutoScale?: number;
}

/**
 * Globe point/marker data
 */
export interface GlobePoint {
  lat: number;
  lng: number;
  size?: number;
  color?: string;
  altitude?: number;
  label?: string;
  labelColor?: string;
  labelSize?: number;
  labelAltitude?: number;
}

/**
 * Globe ring data
 */
export interface GlobeRing {
  lat: number;
  lng: number;
  maxRadius: number;
  color?: string;
  propagationSpeed?: number;
  repeatPeriod?: number;
}

/**
 * Globe hexagon/polygon data
 */
export interface GlobeHexagon {
  lat: number;
  lng: number;
  size?: number;
  color?: string;
  altitude?: number;
  curvatureResolution?: number;
}

/**
 * Globe path data
 */
export interface GlobePath {
  coordinates: [number, number][];
  color?: string;
  strokeWidth?: number;
  altitude?: number;
  resolution?: number;
}

/**
 * Globe label configuration
 */
export interface GlobeLabel {
  lat: number;
  lng: number;
  text: string;
  color?: string;
  altitude?: number;
  size?: number;
  typeFace?: string;
  includeBackground?: boolean;
  backgroundColor?: string;
  backgroundPadding?: number;
  borderRadius?: number;
}

/**
 * Globe camera/view configuration
 */
export interface GlobeCameraConfig {
  initialPosition?: {
    lat: number;
    lng: number;
    altitude: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  minZoom?: number;
  maxZoom?: number;
  enablePan?: boolean;
}

/**
 * Globe performance configuration
 */
export interface GlobePerformanceConfig {
  enableCaching?: boolean;
  enableLOD?: boolean; // Level of Detail
  maxFPS?: number;
  enableRAF?: boolean; // RequestAnimationFrame
  enableWebGL2?: boolean;
  antialias?: boolean;
}

/**
 * Globe animation configuration
 */
export interface GlobeAnimationConfig {
  enableTransitions?: boolean;
  transitionDuration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  enableAutoRotate?: boolean;
  autoRotateSpeed?: number;
  enableBounce?: boolean;
}

/**
 * Inspira UI Globe specific configuration
 */
export interface InspiraGlobeConfig extends GlobeConfig {
  style: 'minimal' | 'detailed' | 'inspira';
  lighting: GlobeLightingConfig;
  arcs: GlobeArc[];
  showPoints?: boolean;
  showLabels?: boolean;
  enableSSR?: boolean;
}

/**
 * Globe event handlers
 */
export interface GlobeEventHandlers {
  onReady?: () => void;
  onError?: (error: Error) => void;
  onPointClick?: (point: GlobePoint, event: MouseEvent) => void;
  onArcClick?: (arc: GlobeArc, event: MouseEvent) => void;
  onGlobeClick?: (coords: { lat: number; lng: number }, event: MouseEvent) => void;
  onZoom?: (zoomLevel: number) => void;
  onRotate?: (rotation: { lat: number; lng: number }) => void;
}

/**
 * Globe component props
 */
export interface GlobeComponentProps {
  config: InspiraGlobeConfig;
  data?: {
    arcs?: GlobeArc[];
    points?: GlobePoint[];
    rings?: GlobeRing[];
    labels?: GlobeLabel[];
    paths?: GlobePath[];
  };
  events?: GlobeEventHandlers;
  className?: string;
  style?: React.CSSProperties;
  enableSSR?: boolean;
}

/**
 * Globe error types
 */
export type GlobeError = 
  | 'WEBGL_NOT_SUPPORTED'
  | 'CANVAS_CREATION_FAILED'
  | 'DATA_LOADING_FAILED'
  | 'RENDERING_ERROR'
  | 'ANIMATION_ERROR'
  | 'MEMORY_EXCEEDED';

/**
 * Globe error details
 */
export interface GlobeErrorInfo {
  type: GlobeError;
  message: string;
  context?: Record<string, any>;
  timestamp: number;
  userAgent?: string;
  webglSupport?: boolean;
}

/**
 * Globe performance metrics
 */
export interface GlobePerformanceMetrics {
  fps: number;
  renderTime: number;
  memoryUsage: number;
  triangleCount: number;
  drawCalls: number;
  shaderCompileTime?: number;
}

/**
 * Globe responsive configuration
 */
export interface GlobeResponsiveConfig {
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  sizing: {
    mobile: { width: number; height: number };
    tablet: { width: number; height: number };
    desktop: { width: number; height: number };
  };
  positioning: {
    mobile: { x: string; y: string };
    tablet: { x: string; y: string };
    desktop: { x: string; y: string };
  };
}

/**
 * Globe data source configuration
 */
export interface GlobeDataSource {
  type: 'static' | 'api' | 'websocket';
  url?: string;
  updateInterval?: number;
  headers?: Record<string, string>;
  authentication?: {
    type: 'bearer' | 'api-key' | 'basic';
    token: string;
  };
}

/**
 * Globe theme configuration
 */
export interface GlobeTheme {
  colors: {
    globe: string;
    atmosphere: string;
    arcs: string;
    points: string;
    labels: string;
    background: string;
  };
  effects: {
    glow: boolean;
    bloom: boolean;
    shadows: boolean;
    reflections: boolean;
  };
}

/**
 * Globe optimization configuration
 */
export interface GlobeOptimization {
  enableCulling?: boolean;
  enableInstancing?: boolean;
  enableBatching?: boolean;
  lodLevels?: number;
  textureCompression?: boolean;
  enableOffscreenCanvas?: boolean;
}

// All types are already exported individually above
