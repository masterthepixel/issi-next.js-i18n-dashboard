"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";

// Arc data type
interface Arc {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}

interface GeoGlobeInspiraProps {
  className?: string;
}

export default function GeoGlobeInspira({ className = "" }: GeoGlobeInspiraProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  // Inspira UI color palette
  const colors = [
    "#eae547",
    "#9347ea", 
    "#d4ea47",
    "#ddea47",
    "#47ea70",
    "#eab447",
    "#eaa647",
    "#c747ea",
    "#52ea47",
    "#4754ea",
  ];

  // Sample arcs data (from Inspira UI)
  const sampleArcs: Arc[] = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Get container dimensions
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    console.log('Initializing GeoGlobeInspira...', width, height);

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 250;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    
    container.appendChild(renderer.domElement);    // Globe setup with Inspira UI styling
    const globe = new ThreeGlobe()
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .atmosphereColor('#ffffff')
      .atmosphereAltitude(0.1)
      .arcsData(sampleArcs)
      .arcColor('color')
      .arcDashLength(0.4)
      .arcDashGap(2)
      .arcDashInitialGap(() => Math.random() * 5)
      .arcDashAnimateTime(1000)
      .arcStroke(0.6);    // Apply globe material styling (Inspira UI blue theme)
    const material = globe.globeMaterial() as THREE.MeshPhongMaterial;
    material.color = new THREE.Color('#0b43bd');
    material.emissive = new THREE.Color('#062056');
    material.emissiveIntensity = 0.1;
    material.shininess = 0.9;
    
    scene.add(globe);    // Lighting setup (Inspira UI style) - Brighter lighting
    const ambientLight = new THREE.AmbientLight('#38bdf8', 0.8);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight('#ffffff', 1.0);
    directionalLight1.position.set(-1, 1, 1);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight('#ffffff', 0.6);
    directionalLight2.position.set(1, -1, -1);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight('#ffffff', 0.4);
    pointLight.position.set(0, 0, 300);
    scene.add(pointLight);

    // Auto-rotation
    let rotationSpeed = 0.005;

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      // Auto-rotate the globe
      globe.rotation.y += rotationSpeed;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div 
        ref={mountRef} 
        className="w-full h-full"
      />
    </div>
  );
}
