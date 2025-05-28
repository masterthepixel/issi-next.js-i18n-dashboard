'use client';

import { useEffect, useState } from 'react';

export function useIntersectionObserver(elementIds: string[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Get the entry with the highest intersection ratio
          const mostVisible = visibleEntries.reduce((prev, current) => {
            return current.intersectionRatio > prev.intersectionRatio ? current : prev;
          });
          
          setActiveId(mostVisible.target.id);
        }
      },
      {
        rootMargin: '-100px 0px -50% 0px', // Adjust these values to fine-tune when sections become "active"
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // Observe all elements
    elementIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [elementIds]);

  return activeId;
}
