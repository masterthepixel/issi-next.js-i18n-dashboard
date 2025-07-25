"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";

// Data types
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

interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  id: string;
}

interface GeoGlobeProps {
  className?: string;
}

export default function GeoGlobe({ className = "" }: GeoGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<ThreeGlobe | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);
  
  const [isInteracting, setIsInteracting] = useState(false);
  const [arcs, setArcs] = useState<Arc[]>([]);

  // Headquarters location
  const headquarters = { name: "Headquarters", lat: 39.0458, lng: -76.8756 };

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
  const getProviderColor = (provider: string): string => {
    switch (provider) {
      case 'AWS': return '#ff9500'; // Orange for AWS
      case 'Azure': return '#0078d4'; // Blue for Azure  
      case 'Google Cloud': return '#34a853'; // Green for Google Cloud
      default: return '#34a853'; // Default green
    }
  };

  // Generate points data for the globe
  const pointsData = useMemo(() => [
    // Headquarters (red marker, larger)
    { 
      lat: headquarters.lat, 
      lng: headquarters.lng, 
      size: 8, 
      color: '#ef4444',
      name: headquarters.name,
      provider: 'Headquarters'
    },
    // Data centers (color-coded by provider)
    ...dataCenters.map(center => ({
      lat: center.lat,
      lng: center.lng,
      size: 4,
      color: getProviderColor(center.provider),
      name: center.name,
      provider: center.provider,
      city: center.city,
      country: center.country
    }))
  ], [dataCenters, headquarters.lat, headquarters.lng, headquarters.name]);

  // Generate random arc between points
  const generateRandomArc = useCallback((): Arc => {
    const allPoints = pointsData;
    const fromPoint = allPoints[Math.floor(Math.random() * allPoints.length)];
    let toPoint = allPoints[Math.floor(Math.random() * allPoints.length)];
    
    // Ensure from and to are different
    while (toPoint === fromPoint) {
      toPoint = allPoints[Math.floor(Math.random() * allPoints.length)];
    }

    return {
      startLat: fromPoint.lat,
      startLng: fromPoint.lng,
      endLat: toPoint.lat,
      endLng: toPoint.lng,
      color: fromPoint.color,
      id: `arc-${Date.now()}-${Math.random()}`
    };
  }, [pointsData]);  // Initialize globe and scene
  useEffect(() => {
    if (!mountRef.current) return;

    console.log('Initializing GeoGlobe...'); // Debug log

    // Get container dimensions
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    console.log('Container dimensions:', width, height); // Debug log

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 250;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    mountRef.current.appendChild(renderer.domElement);    // Globe setup
    const globe = new ThreeGlobe()
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
      .pointsData(pointsData)
      .pointAltitude('size')
      .pointColor('color')
      .pointRadius(0.6)
      .pointResolution(12)
      .arcsData(arcs)
      .arcColor('color')
      .arcDashLength(0.4)
      .arcDashGap(2)
      .arcDashInitialGap(1)
      .arcDashAnimateTime(1000)
      .arcStroke(0.6)
      .arcsTransitionDuration(0);

    globeRef.current = globe;
    scene.add(globe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Controls for interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !globe) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };

      const rotationSpeed = 0.005;
      globe.rotation.y += deltaMove.x * rotationSpeed;
      globe.rotation.x += deltaMove.y * rotationSpeed;

      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      
      const container = mountRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (!isDragging && globe) {
        globe.rotation.y += 0.002;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, [arcs, pointsData]);

  // Update arcs data when arcs change
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.arcsData(arcs);
    }
  }, [arcs]);

  // Generate arcs periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const newArc = generateRandomArc();
        setArcs(prevArcs => [...prevArcs, newArc]);
        
        // Remove arc after animation
        setTimeout(() => {
          setArcs(prevArcs => prevArcs.filter(arc => arc.id !== newArc.id));
        }, 1000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [generateRandomArc]);
  return (
    <div className={`relative w-full h-full overflow-hidden flex items-center justify-center ${className}`}><div 
        ref={mountRef} 
        className={`w-full h-full flex items-center justify-center ${isInteracting ? 'cursor-grabbing' : 'cursor-grab'}`}
      />
      
      {/* Pause Indicator */}
      {isInteracting && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
          🔄 Interacting
        </div>
      )}
      
      {/* Active Transfers Indicator */}
      {arcs.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-yellow-500/20 border border-yellow-500/50 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
          📡 {arcs.length} active transfer{arcs.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Legend for Globe */}
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
    </div>
  );
}
