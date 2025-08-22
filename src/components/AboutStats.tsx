'use client';

import AboutStatsNew from './AboutStatsNew';
import ErrorBoundary from './ErrorBoundary';

export default function AboutStats() {
  return (
    <ErrorBoundary>
      <AboutStatsNew />
    </ErrorBoundary>
  );
}
