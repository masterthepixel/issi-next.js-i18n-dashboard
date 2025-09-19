'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  skipHydration?: boolean;
}

export default function ClientOnly({ children, fallback = null, skipHydration = false }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback for non-critical components
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        setHasMounted(true);
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => setHasMounted(true), 16);
    }
  }, []);

  // Skip hydration for certain components to improve performance
  if (skipHydration && !hasMounted) {
    return <>{fallback}</>;
  }

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
