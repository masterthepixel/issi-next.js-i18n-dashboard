'use client';

import { useEffect, useState } from 'react';
import type { Metric } from 'web-vitals';

interface PerformanceMetrics {
    FCP?: number;
    LCP?: number;
    CLS?: number;
    FID?: number;
    TBT?: number;
}

interface PerformanceMonitorProps {
    enabled?: boolean;
    reportTo?: string;
    onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

export function PerformanceMonitor({
    enabled = true,
    reportTo,
    onMetricsUpdate
}: PerformanceMonitorProps) {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({});

    useEffect(() => {
        if (!enabled || typeof window === 'undefined') return;

        // Web Vitals tracking
        const reportWebVitals = (metric: Metric) => {
            const value = Math.round(metric.value * 100) / 100;
            const newMetrics = { ...metrics, [metric.name]: value };
            setMetrics(newMetrics);
            onMetricsUpdate?.(newMetrics);

            // Report to external service if configured
            if (reportTo) {
                fetch(reportTo, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: metric.name,
                        value,
                        id: metric.id,
                        timestamp: Date.now(),
                        url: window.location.href,
                    }),
                }).catch(console.error);
            }
        };

        // Dynamic import to avoid bundle bloat
        import('web-vitals').then((webVitals) => {
            webVitals.onCLS(reportWebVitals);
            webVitals.onINP(reportWebVitals); // INP replaced FID
            webVitals.onFCP(reportWebVitals);
            webVitals.onLCP(reportWebVitals);
            webVitals.onTTFB(reportWebVitals);
        }).catch(console.error);

        // Performance observer for additional metrics
        if ('PerformanceObserver' in window) {
            try {
                // Long tasks monitoring
                const longTaskObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const totalBlockingTime = entries.reduce((total, entry) => {
                        // LongTaskEntry extends PerformanceEntry
                        const longTaskEntry = entry as PerformanceEntry & { duration: number };
                        return total + Math.max(0, longTaskEntry.duration - 50);
                    }, 0);

                    if (totalBlockingTime > 0) {
                        const newMetrics = { ...metrics, TBT: Math.round(totalBlockingTime) };
                        setMetrics(newMetrics);
                        onMetricsUpdate?.(newMetrics);
                    }
                });

                longTaskObserver.observe({ entryTypes: ['longtask'] });

                return () => longTaskObserver.disconnect();
            } catch (error) {
                console.warn('Performance monitoring not fully supported:', error);
            }
        }
    }, [enabled, reportTo, onMetricsUpdate, metrics]);

    // Development-only performance display
    if (process.env.NODE_ENV === 'development' && enabled) {
        return (
            <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-xs">
                <div className="font-semibold mb-2">Performance Metrics</div>
                {metrics.FCP && <div>FCP: {metrics.FCP}ms</div>}
                {metrics.LCP && <div>LCP: {metrics.LCP}ms</div>}
                {metrics.CLS && <div>CLS: {metrics.CLS}</div>}
                {metrics.FID && <div>FID: {metrics.FID}ms</div>}
                {metrics.TBT && <div>TBT: {metrics.TBT}ms</div>}
            </div>
        );
    }

    return null;
}
