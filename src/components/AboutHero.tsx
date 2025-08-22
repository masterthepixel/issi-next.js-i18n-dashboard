"use client";

import dynamic from 'next/dynamic';
import AboutHeroSkeleton from './AboutHeroSkeleton';
import ErrorBoundary from './ErrorBoundary';

const AboutHeroNew = dynamic(() => import('./AboutHeroNew'), {
  loading: () => <AboutHeroSkeleton />,
});

export default function AboutHero() {
  return (
    <ErrorBoundary>
      <AboutHeroNew />
    </ErrorBoundary>
  );
}