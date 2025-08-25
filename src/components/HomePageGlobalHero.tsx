"use client";
import { FlipWords } from '@/components/ui/flip-words';
import createGlobe from 'cobe';
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";

interface DataCenter {
  name: string;
  lat: number;
  lng: number;
  provider: string;
  city: string;
  country: string;
  region: string;
  status: boolean;
}

interface DataTransfer {
  id: string;
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  progress: number;
  startTime: number;
}

export default function HomePageGlobalHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [dataTransfers, setDataTransfers] = useState<DataTransfer[]>([]);
  const intl = useIntl();  // Get translated words for FlipWords animation
  const flipWords = [
    intl.formatMessage({ id: "hero.flipwords.words.secure" }),
    intl.formatMessage({ id: "hero.flipwords.words.innovative" }),
    intl.formatMessage({ id: "hero.flipwords.words.scalable" }),
    intl.formatMessage({ id: "hero.flipwords.words.exceptional" }),
  ];

  // Headquarters location
  const headquarters = useMemo(() => ({ name: "Headquarters", lat: 39.0458, lng: -76.8756 }), []);

  // Real data centers from cloud providers
  const dataCenters: DataCenter[] = useMemo(() => [
    // AWS Data Centers
    { name: "AWS N. Virginia", lat: 39.0458, lng: -77.5016, provider: "AWS", city: "Ashburn", country: "United States", region: "us-east-1", status: true },
    { name: "AWS Ohio", lat: 39.9612, lng: -82.9988, provider: "AWS", city: "Columbus", country: "United States", region: "us-east-2", status: true },
    { name: "AWS N. California", lat: 37.7749, lng: -122.4194, provider: "AWS", city: "San Francisco", country: "United States", region: "us-west-1", status: true },
    { name: "AWS Oregon", lat: 45.5152, lng: -122.6784, provider: "AWS", city: "Portland", country: "United States", region: "us-west-2", status: true },
    { name: "AWS Canada Central", lat: 43.6532, lng: -79.3832, provider: "AWS", city: "Toronto", country: "Canada", region: "ca-central-1", status: true },
    { name: "AWS Mexico", lat: 20.5888, lng: -100.3899, provider: "AWS", city: "Queretaro", country: "Mexico", region: "mx-central-1", status: true },
    { name: "AWS São Paulo", lat: -23.5558, lng: -46.6396, provider: "AWS", city: "São Paulo", country: "Brazil", region: "sa-east-1", status: true },
    { name: "AWS Ireland", lat: 53.3498, lng: -6.2603, provider: "AWS", city: "Dublin", country: "Ireland", region: "eu-west-1", status: true },
    { name: "AWS London", lat: 51.5074, lng: -0.1278, provider: "AWS", city: "London", country: "United Kingdom", region: "eu-west-2", status: true },
    { name: "AWS Paris", lat: 48.8566, lng: 2.3522, provider: "AWS", city: "Paris", country: "France", region: "eu-west-3", status: true },
    { name: "AWS Frankfurt", lat: 50.1109, lng: 8.6821, provider: "AWS", city: "Frankfurt", country: "Germany", region: "eu-central-1", status: true },
    { name: "AWS Stockholm", lat: 59.3293, lng: 18.0686, provider: "AWS", city: "Stockholm", country: "Sweden", region: "eu-north-1", status: true },
    { name: "AWS Mumbai", lat: 19.0760, lng: 72.8777, provider: "AWS", city: "Mumbai", country: "India", region: "ap-south-1", status: true },
    { name: "AWS Singapore", lat: 1.3521, lng: 103.8198, provider: "AWS", city: "Singapore", country: "Singapore", region: "ap-southeast-1", status: true },
    { name: "AWS Sydney", lat: -33.8688, lng: 151.2093, provider: "AWS", city: "Sydney", country: "Australia", region: "ap-southeast-2", status: true },
    { name: "AWS Tokyo", lat: 35.6762, lng: 139.6503, provider: "AWS", city: "Tokyo", country: "Japan", region: "ap-northeast-1", status: true },
    { name: "AWS Seoul", lat: 37.5665, lng: 126.9780, provider: "AWS", city: "Seoul", country: "South Korea", region: "ap-northeast-2", status: true },
    { name: "AWS Hong Kong", lat: 22.3193, lng: 114.1694, provider: "AWS", city: "Hong Kong", country: "Hong Kong SAR", region: "ap-east-1", status: true },

    // Azure Data Centers
    { name: "Azure East US", lat: 37.3719, lng: -79.8164, provider: "Azure", city: "Virginia", country: "United States", region: "eastus", status: true },
    { name: "Azure West US", lat: 37.7833, lng: -122.4167, provider: "Azure", city: "California", country: "United States", region: "westus", status: true },
    { name: "Azure West Europe", lat: 52.3667, lng: 4.9000, provider: "Azure", city: "Netherlands", country: "Netherlands", region: "westeurope", status: true },
    { name: "Azure East Asia", lat: 22.3193, lng: 114.1694, provider: "Azure", city: "Hong Kong", country: "Hong Kong", region: "eastasia", status: true },
    { name: "Azure Southeast Asia", lat: 1.3521, lng: 103.8198, provider: "Azure", city: "Singapore", country: "Singapore", region: "southeastasia", status: true },
    { name: "Azure Australia East", lat: -33.8688, lng: 151.2093, provider: "Azure", city: "Sydney", country: "Australia", region: "australiaeast", status: true },
    { name: "Azure Canada Central", lat: 43.6532, lng: -79.3832, provider: "Azure", city: "Toronto", country: "Canada", region: "canadacentral", status: true },
    { name: "Azure UK South", lat: 51.5074, lng: -0.1278, provider: "Azure", city: "London", country: "United Kingdom", region: "uksouth", status: true },
    { name: "Azure Japan East", lat: 35.6762, lng: 139.6503, provider: "Azure", city: "Tokyo", country: "Japan", region: "japaneast", status: true },

    // Google Cloud Data Centers
    { name: "GCP Iowa", lat: 41.2619, lng: -95.8608, provider: "Google Cloud", city: "Council Bluffs", country: "United States", region: "us-central1", status: true },
    { name: "GCP Oregon", lat: 45.5946, lng: -121.1787, provider: "Google Cloud", city: "The Dalles", country: "United States", region: "us-west1", status: true },
    { name: "GCP Los Angeles", lat: 34.0522, lng: -118.2437, provider: "Google Cloud", city: "Los Angeles", country: "United States", region: "us-west2", status: true },
    { name: "GCP Montreal", lat: 45.5017, lng: -73.5673, provider: "Google Cloud", city: "Montreal", country: "Canada", region: "northamerica-northeast1", status: true },
    { name: "GCP São Paulo", lat: -23.5558, lng: -46.6396, provider: "Google Cloud", city: "São Paulo", country: "Brazil", region: "southamerica-east1", status: true },
    { name: "GCP Belgium", lat: 50.4478, lng: 3.8183, provider: "Google Cloud", city: "St. Ghislain", country: "Belgium", region: "europe-west1", status: true },
    { name: "GCP London", lat: 51.5074, lng: -0.1278, provider: "Google Cloud", city: "London", country: "United Kingdom", region: "europe-west2", status: true },
    { name: "GCP Frankfurt", lat: 50.1109, lng: 8.6821, provider: "Google Cloud", city: "Frankfurt", country: "Germany", region: "europe-west3", status: true },
    { name: "GCP Netherlands", lat: 53.4383, lng: 6.8355, provider: "Google Cloud", city: "Eemshaven", country: "Netherlands", region: "europe-west4", status: true },
    { name: "GCP Taiwan", lat: 24.0517, lng: 120.5161, provider: "Google Cloud", city: "Changhua County", country: "Taiwan", region: "asia-east1", status: true },
    { name: "GCP Tokyo", lat: 35.6762, lng: 139.6503, provider: "Google Cloud", city: "Tokyo", country: "Japan", region: "asia-northeast1", status: true },
    { name: "GCP Mumbai", lat: 19.0760, lng: 72.8777, provider: "Google Cloud", city: "Mumbai", country: "India", region: "asia-south1", status: true },
    { name: "GCP Singapore", lat: 1.3404, lng: 103.7090, provider: "Google Cloud", city: "Jurong West", country: "Singapore", region: "asia-southeast1", status: true },
    { name: "GCP Sydney", lat: -33.8688, lng: 151.2093, provider: "Google Cloud", city: "Sydney", country: "Australia", region: "australia-southeast1", status: true },
  ], []);

  // Create color-coded markers by provider
  const getProviderColor = (provider: string): [number, number, number] => {
    switch (provider) {
      case 'AWS': return [1, 0.6, 0]; // Orange for AWS
      case 'Azure': return [0, 0.4, 1]; // Blue for Azure  
      case 'Google Cloud': return [0.2, 0.8, 0.2]; // Green for Google Cloud
      default: return [0.2, 0.8, 0.2]; // Default green
    }
  };

  // Create all markers (headquarters + data centers)
  const allMarkers = useMemo(() => [
    // Headquarters (red marker, larger)
    {
      location: [headquarters.lat, headquarters.lng] as [number, number],
      size: 0.08,
      color: [1, 0.2, 0.2] as [number, number, number] // Red
    },
    // Data centers (color-coded by provider)
    ...dataCenters.map(center => ({
      location: [center.lat, center.lng] as [number, number],
      size: 0.04,
      color: getProviderColor(center.provider)
    }))
  ], [dataCenters, headquarters.lat, headquarters.lng]);

  // Generate random data transfer
  const generateDataTransfer = useCallback((): DataTransfer => {
    const allLocations = [headquarters, ...dataCenters];
    const fromIndex = Math.floor(Math.random() * allLocations.length);
    let toIndex = Math.floor(Math.random() * allLocations.length);

    // Ensure from and to are different
    while (toIndex === fromIndex) {
      toIndex = Math.floor(Math.random() * allLocations.length);
    }

    const from = allLocations[fromIndex];
    const to = allLocations[toIndex];

    return {
      id: `transfer-${Date.now()}-${Math.random()}`,
      fromLat: from.lat,
      fromLng: from.lng,
      toLat: to.lat,
      toLng: to.lng,
      progress: 0,
      startTime: Date.now()
    };
  }, [dataCenters, headquarters]);

  // Start new data transfers randomly
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // Add new transfer (20% chance each interval)
      if (Math.random() < 0.3) {
        setDataTransfers(prev => [...prev, generateDataTransfer()]);
      }
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, [isPaused, generateDataTransfer]);

  // Animate data transfers
  useEffect(() => {
    if (isPaused) return;

    const animateTransfers = () => {
      setDataTransfers(prev => {
        const now = Date.now();
        return prev
          .map(transfer => ({
            ...transfer,
            progress: Math.min(1, (now - transfer.startTime) / 3000) // 3 second duration
          }))
          .filter(transfer => transfer.progress < 1); // Remove completed transfers
      });
    };

    const animationInterval = setInterval(animateTransfers, 50); // 20fps
    return () => clearInterval(animationInterval);
  }, [isPaused]); useEffect(() => {
    let phi = 0;

    if (canvasRef.current) {
      // Get container dimensions for responsive sizing
      const container = canvasRef.current.parentElement;
      const containerWidth = container?.clientWidth || 400;
      const containerHeight = container?.clientHeight || 400;

      // For mobile: use the larger of width or height to fill the container
      // For desktop: maintain max size of 780
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      const globeSize = isMobile
        ? Math.max(containerWidth, containerHeight)
        : Math.min(containerWidth, containerHeight, 780);

      globeRef.current = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: globeSize,
        height: globeSize,
        phi: 0,
        theta: 0.15,
        dark: 0, // Light theme
        diffuse: 1.2,
        mapSamples: 16000, // Higher sample count for better map detail
        mapBrightness: 4.8, // Use same value as working Globe.tsx
        scale: 1.1,
        baseColor: [0.96, 0.97, 1], // Light blue/white ocean color like working Globe.tsx
        markerColor: [0.1, 0.2, 0.8], // Default marker color
        glowColor: [0.6, 0.7, 1], // Soft blue glow
        markers: allMarkers,
        offset: [0, 0],
        onRender: (state) => {
          if (!isPaused) {
            state.phi = phi;
            phi += 0.002; // Same rotation speed as hero
          }

          // Render data transfer arcs
          if (globeRef.current && dataTransfers.length > 0) {
            // Note: COBE doesn't have built-in arc support, so we'll simulate with dynamic markers
            const transferMarkers = dataTransfers.flatMap(transfer => {
              const progress = transfer.progress;
              if (progress <= 0 || progress >= 1) return [];

              // Interpolate position along great circle path
              const startLat = transfer.fromLat * Math.PI / 180;
              const startLng = transfer.fromLng * Math.PI / 180;
              const endLat = transfer.toLat * Math.PI / 180;
              const endLng = transfer.toLng * Math.PI / 180;

              // Simple linear interpolation for demo (could be improved with great circle math)
              const currentLat = startLat + (endLat - startLat) * progress;
              const currentLng = startLng + (endLng - startLng) * progress;

              return [{
                location: [currentLat * 180 / Math.PI, currentLng * 180 / Math.PI] as [number, number],
                size: 0.02,
                color: [1, 1, 0] as [number, number, number] // Yellow for data transfers
              }];
            });

            // Update markers to include transfers
            state.markers = [...allMarkers, ...transferMarkers];
          }
        },
      });

      // Add click to pause functionality
      const canvas = canvasRef.current;
      const handleClick = () => {
        setIsPaused(prev => !prev);
      };      // Handle window resize to update globe size
      const handleResize = () => {
        if (globeRef.current && canvasRef.current) {
          const container = canvasRef.current.parentElement;
          const containerWidth = container?.clientWidth || 400;
          const containerHeight = container?.clientHeight || 400;
          const isMobile = window.innerWidth < 1024;
          const _newGlobeSize = isMobile
            ? Math.max(containerWidth, containerHeight)
            : Math.min(containerWidth, containerHeight, 780);

          // Update globe size
          globeRef.current.resize();
        }
      };

      canvas.addEventListener('click', handleClick);
      window.addEventListener('resize', handleResize);

      return () => {
        canvas.removeEventListener('click', handleClick);
        window.removeEventListener('resize', handleResize);
        if (globeRef.current) {
          globeRef.current.destroy();
        }
      };
    }
  }, [allMarkers, dataTransfers, isPaused]); return (
    <div className="relative isolate px-2">
      {/* Main Hero Content */}
      <div className="mx-auto max-w-7xl pb-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Content Section - Left */}
          <motion.div
            className="space-y-8 z-10 order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >            <div className="space-y-6">
              <h1 className="text-3xl font-semibold tracking-tight text-balance text-slate-900 dark:text-slate-100 sm:text-4xl">
                <div className="flex flex-col">
                  <span><FormattedMessage id="hero.flipwords.prefix" /></span>
                  <span>
                    <FlipWords
                      words={flipWords}
                      duration={2500}
                      className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent font-semibold"
                    />
                    {" "}<FormattedMessage id="hero.flipwords.suffix" />
                  </span>
                </div>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <FormattedMessage
                  id="hero.description" values={{
                    innovativeTechnology: (chunks) => (
                      <a
                        href="/services"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                        title="Explore our innovative technology services"
                      >
                        {chunks}
                      </a>
                    ),
                    government: (chunks) => (
                      <a
                        href="/government"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                        title="Government solutions and services"
                      >
                        {chunks}
                      </a>
                    ),
                    enterprise: (chunks) => (
                      <a
                        href="/products"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                        title="Enterprise products and solutions"
                      >
                        {chunks}
                      </a>
                    ),
                    eLearning: (chunks) => (
                      <a
                        href="/services/e-learning"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                        title="E-learning platform solutions"
                      >
                        {chunks}
                      </a>
                    ),
                    compliance: (chunks) => (
                      <a
                        href="/compliance"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                        title="Compliance management solutions"
                      >
                        {chunks}
                      </a>
                    ),
                  }}
                />
              </p>
            </div>            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 sm:gap-4">
              <a
                href="/contact"
                title="Contact ISSI to get started with our solutions"
                className="bg-blue-600 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg text-center text-sm sm:text-base flex-1 sm:flex-none"
              >
                <FormattedMessage id="hero.cta.get-started" />
              </a>
              <a
                href="/services"
                title="Explore ISSI's software solutions and services"
                className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all text-center text-sm sm:text-base flex-1 sm:flex-none"
              >
                <FormattedMessage id="hero.cta.learn-more" />
              </a>
            </div>
          </motion.div>          {/* Globe Section - Right */}
          <motion.div
            className="relative w-full h-[50vh] min-h-[40vh] max-h-[600px] lg:w-[780px] lg:h-[520px] overflow-visible order-2 flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >            <canvas
              ref={canvasRef}
              className={`w-full h-full cursor-pointer transition-all duration-300 ${isPaused ? 'opacity-75' : 'opacity-100'}`}
            />

            {/* Pause Indicator */}
            {isPaused && (
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                ⏸️ Paused - Click to resume
              </div>
            )}

            {/* Active Transfers Indicator */}
            {dataTransfers.length > 0 && !isPaused && (
              <div className="absolute bottom-4 left-4 bg-yellow-500/20 border border-yellow-500/50 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                📡 {dataTransfers.length} active transfer{dataTransfers.length !== 1 ? 's' : ''}
              </div>
            )}            {/* Small Legend for Globe */}
            <div className="absolute bottom-4 right-4 sm:bottom-4 sm:right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 text-xs">
              {/* Mobile: Horizontal layout */}
              <div className="flex sm:hidden gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>HQ</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span>AWS</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Azure</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>GCP</span>
                </div>
              </div>
              {/* Desktop: Vertical layout */}
              <div className="hidden sm:flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>HQ</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span>AWS</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Azure</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>GCP</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
