'use client';

/**
 * Performance monitoring and analytics
 * Tracks Core Web Vitals, user interactions, and performance metrics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  navigationType?: string;
}

interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
}

interface FIDEntry extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

interface CLSEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface NavigationEntry extends PerformanceEntry {
  loadEventEnd: number;
  fetchStart: number;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];
  private isEnabled = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    // Check if performance monitoring is enabled
    this.isEnabled = localStorage.getItem('performance-monitoring') !== 'false';

    if (this.isEnabled) {
      this.setupObservers();
      this.trackNavigationTiming();
      this.trackResourceTiming();
    }
  }

  private setupObservers() {
    // Observe Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.recordMetric('LCP', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch {
        console.warn('LCP observation not supported');
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fidEntry = entry as FIDEntry;
            this.recordMetric('FID', fidEntry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch {
        console.warn('FID observation not supported');
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const clsEntry = entry as CLSEntry;
            if (!clsEntry.hadRecentInput) {
              clsValue += clsEntry.value;
            }
          });
          this.recordMetric('CLS', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch {
        console.warn('CLS observation not supported');
      }

      // Navigation Timing
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const navEntry = entry as NavigationEntry;
            this.recordMetric('Navigation', navEntry.loadEventEnd - navEntry.fetchStart);
          });
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navigationObserver);
      } catch {
        console.warn('Navigation timing observation not supported');
      }
    }
  }

  private trackNavigationTiming() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      // Use requestIdleCallback to avoid blocking the main thread
      const trackTiming = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.recordMetric('DNS Lookup', navigation.domainLookupEnd - navigation.domainLookupStart);
          this.recordMetric('TCP Connect', navigation.connectEnd - navigation.connectStart);
          this.recordMetric('Server Response', navigation.responseStart - navigation.requestStart);
          this.recordMetric('Page Load', navigation.loadEventEnd - navigation.fetchStart);
          this.recordMetric('DOM Processing', navigation.domContentLoadedEventEnd - navigation.responseEnd);
        }
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(trackTiming);
      } else {
        setTimeout(trackTiming, 0);
      }
    }
  }

  private trackResourceTiming() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const trackResources = () => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        const slowResources = resources.filter(resource =>
          resource.duration > 1000 // Resources taking more than 1 second
        );

        slowResources.forEach(resource => {
          this.recordMetric(`Slow Resource: ${resource.name.split('/').pop()}`, resource.duration);
        });
      };

      // Track resources after page load
      window.addEventListener('load', () => {
        setTimeout(trackResources, 1000);
      });
    }
  }

  private recordMetric(name: string, value: number, navigationType?: string) {
    const metric: PerformanceMetric = {
      name,
      value: Math.round(value * 100) / 100, // Round to 2 decimal places
      timestamp: Date.now(),
      navigationType,
    };

    this.metrics.push(metric);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${metric.value}ms`);
    }

    // Send to analytics service (implement based on your analytics provider)
    this.sendToAnalytics(metric);
  }

  private sendToAnalytics(metric: PerformanceMetric) {
    // Implement analytics sending logic here
    // Examples: Google Analytics, Mixpanel, Sentry, etc.

    // For now, just store in localStorage for debugging
    if (this.isEnabled) {
      const stored = localStorage.getItem('performance-metrics');
      const metrics = stored ? JSON.parse(stored) : [];
      metrics.push(metric);

      // Keep only last 100 metrics to avoid storage bloat
      if (metrics.length > 100) {
        metrics.splice(0, metrics.length - 100);
      }

      localStorage.setItem('performance-metrics', JSON.stringify(metrics));
    }
  }

  // Public API methods
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.name === name);
  }

  getAverageMetric(name: string): number {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) return 0;

    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return Math.round((sum / metrics.length) * 100) / 100;
  }

  clearMetrics(): void {
    this.metrics = [];
    localStorage.removeItem('performance-metrics');
  }

  enable(): void {
    this.isEnabled = true;
    localStorage.setItem('performance-monitoring', 'true');
  }

  disable(): void {
    this.isEnabled = false;
    localStorage.setItem('performance-monitoring', 'false');
  }

  isMonitoringEnabled(): boolean {
    return this.isEnabled;
  }

  // Track custom events
  trackEvent(name: string, value?: number): void {
    this.recordMetric(name, value || 0);
  }

  // Track user interactions
  trackInteraction(interaction: string, duration?: number): void {
    this.recordMetric(`Interaction: ${interaction}`, duration || 0);
  }

  // Cleanup
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Web Vitals reporting (for Google Analytics, etc.)
export const reportWebVitals = (metric: WebVitalsMetric) => {
  // Send to analytics service
  console.log('[Web Vitals]', metric);

  // Example: Send to Google Analytics
  if (typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      custom_map: { metric_value: metric.value, metric_delta: metric.delta },
    });
  }
};

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();
