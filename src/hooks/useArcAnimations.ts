import { arcAnimationConfig } from '@/config/globeTheme';
import {
    awsConnections,
    azureConnections,
    gcpConnections,
    getLocationById,
    hqRandomTargets,
    priorityConnections
} from '@/data/locations';
import { ActiveArc, DatacenterLocation } from '@/types/globe.types';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useArcAnimations = (
  enabledProviders: string[],
  _locations: DatacenterLocation[]
) => {
  const [activeArcs, setActiveArcs] = useState<ActiveArc[]>([]);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);
  const arcCounterRef = useRef(0);

  const createArc = useCallback((
    sourceId: string, 
    targetId: string, 
    provider: string, 
    color: string,
    altitude: number = 0.3,
    thickness: number = 2,
    _isPriority: boolean = false
  ): ActiveArc | null => {
    const source = getLocationById(sourceId);
    const target = getLocationById(targetId);
    
    if (!source || !target) return null;

    return {
      id: `arc-${++arcCounterRef.current}`,
      startLat: source.coordinates[0],
      startLng: source.coordinates[1],
      endLat: target.coordinates[0],
      endLng: target.coordinates[1],
      color,
      altitude,
      thickness,
      timestamp: Date.now()
    };
  }, []);

  const addArc = useCallback((arc: ActiveArc) => {
    setActiveArcs(prev => {
      // Remove expired arcs
      const now = Date.now();
      const validArcs = prev.filter(a => now - a.timestamp < arcAnimationConfig.arcDuration);
      
      // Check if we're at the limit
      if (validArcs.length >= arcAnimationConfig.maxActiveArcs) {
        return validArcs;
      }
      
      return [...validArcs, arc];
    });
  }, []);

  const removeExpiredArcs = useCallback(() => {
    setActiveArcs(prev => {
      const now = Date.now();
      return prev.filter(arc => now - arc.timestamp < arcAnimationConfig.arcDuration);
    });
  }, []);

  const getProviderColor = useCallback((provider: string, isDark: boolean = false) => {
    const colors = {
      hq: isDark ? '#ef4444' : '#dc2626',
      aws: isDark ? '#f97316' : '#ea580c',
      gcp: isDark ? '#3b82f6' : '#2563eb',
      azure: isDark ? '#8b5cf6' : '#7c3aed'
    };
    return colors[provider as keyof typeof colors] || '#64748b';
  }, []);

  const createHQRandomArc = useCallback((isDark: boolean = false) => {
    if (!enabledProviders.includes('hq')) return;
    
    const availableTargets = hqRandomTargets.filter(targetId => {
      const target = getLocationById(targetId);
      return target && enabledProviders.includes(target.provider);
    });
    
    if (availableTargets.length === 0) return;
    
    const randomTarget = availableTargets[Math.floor(Math.random() * availableTargets.length)];
    const target = getLocationById(randomTarget);
    if (!target) return;
    
    const arc = createArc(
      'issi-hq',
      randomTarget,
      'hq',
      getProviderColor(target.provider, isDark),
      0.35,
      2.5
    );
    
    if (arc) addArc(arc);
  }, [enabledProviders, createArc, addArc, getProviderColor]);

  const createProviderArc = useCallback((provider: 'aws' | 'gcp' | 'azure', isDark: boolean = false) => {
    if (!enabledProviders.includes(provider)) return;
    
    const connections = {
      aws: awsConnections,
      gcp: gcpConnections,
      azure: azureConnections
    }[provider];
    
    const validConnections = connections.filter(([sourceId, targetId]) => {
      const source = getLocationById(sourceId);
      const target = getLocationById(targetId);
      return source && target && enabledProviders.includes(source.provider) && enabledProviders.includes(target.provider);
    });
    
    if (validConnections.length === 0) return;
    
    const [sourceId, targetId] = validConnections[Math.floor(Math.random() * validConnections.length)];
    const arc = createArc(
      sourceId,
      targetId,
      provider,
      getProviderColor(provider, isDark),
      0.25,
      1.5
    );
    
    if (arc) addArc(arc);
  }, [enabledProviders, createArc, addArc, getProviderColor]);

  const initializePriorityArcs = useCallback((isDark: boolean = false) => {
    if (!arcAnimationConfig.hqPriorityAlways || !enabledProviders.includes('hq')) return;
    
    priorityConnections.forEach(connection => {
      const target = getLocationById(connection.target);
      if (target && enabledProviders.includes(target.provider)) {
        const arc = createArc(
          connection.source,
          connection.target,
          connection.provider,
          getProviderColor('hq', isDark),
          connection.altitude,
          connection.thickness,
          true
        );
        if (arc) addArc(arc);
      }
    });
  }, [enabledProviders, createArc, addArc, getProviderColor]);

  const startAnimations = useCallback((isDark: boolean = false) => {
    // Clear existing intervals
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    
    // Initialize priority arcs
    initializePriorityArcs(isDark);
    
    // HQ random connections
    if (enabledProviders.includes('hq')) {
      const hqInterval = setInterval(() => {
        createHQRandomArc(isDark);
      }, arcAnimationConfig.hqRandomInterval);
      intervalsRef.current.push(hqInterval);
    }
    
    // Provider internal connections
    ['aws', 'gcp', 'azure'].forEach(provider => {
      if (enabledProviders.includes(provider)) {
        const providerInterval = setInterval(() => {
          createProviderArc(provider as 'aws' | 'gcp' | 'azure', isDark);
        }, arcAnimationConfig.providerArcInterval);
        intervalsRef.current.push(providerInterval);
      }
    });
    
    // Cleanup expired arcs
    const cleanupInterval = setInterval(removeExpiredArcs, 1000);
    intervalsRef.current.push(cleanupInterval);
  }, [enabledProviders, initializePriorityArcs, createHQRandomArc, createProviderArc, removeExpiredArcs]);

  const stopAnimations = useCallback(() => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    setActiveArcs([]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, []);

  return {
    activeArcs,
    startAnimations,
    stopAnimations,
    removeExpiredArcs
  };
};
