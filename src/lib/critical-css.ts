/**
 * Critical CSS extraction utility for performance optimization
 * Extracts critical CSS for above-the-fold content and defers non-critical CSS
 */

export class CriticalCssOptimizer {
  private criticalCssCache = new Map<string, string>();

  /**
   * Extract critical CSS for a specific route/component
   */
  async extractCriticalCss(html: string, route: string): Promise<{
    criticalCss: string;
    remainingCss: string;
  }> {
    try {
      // Check cache first
      if (this.criticalCssCache.has(route)) {
        return {
          criticalCss: this.criticalCssCache.get(route)!,
          remainingCss: '',
        };
      }

      // For now, return basic critical CSS since full extraction requires more setup
      const criticalCss = this.getCriticalCssForComponents(['hero', 'navigation', 'buttons']);

      // Cache the result
      this.criticalCssCache.set(route, criticalCss);

      return {
        criticalCss,
        remainingCss: '', // Non-critical CSS will be loaded separately
      };
    } catch (error) {
      console.warn(`Failed to extract critical CSS for ${route}:`, error);
      return {
        criticalCss: '',
        remainingCss: '',
      };
    }
  }

  /**
   * Generate critical CSS for common components
   */
  getCriticalCssForComponents(componentNames: string[]): string {
    const criticalSelectors = new Set<string>();

    // Define critical selectors for common components
    const componentSelectors: Record<string, string[]> = {
      hero: [
        '.hero-section',
        '.hero-title',
        '.hero-subtitle',
        '.hero-cta',
        '.hero-background',
        '[class*="hero"]',
      ],
      navigation: [
        '.navbar',
        '.nav-link',
        '.nav-brand',
        '.mobile-menu',
        '[class*="nav"]',
      ],
      buttons: [
        '.btn',
        '.button',
        '[class*="btn"]',
        '[role="button"]',
      ],
      forms: [
        'input',
        'textarea',
        'select',
        'form',
        '.form-group',
        '.form-control',
      ],
      cards: [
        '.card',
        '.card-body',
        '.card-title',
        '.card-text',
        '[class*="card"]',
      ],
    };

    // Collect critical selectors
    componentNames.forEach(component => {
      const selectors = componentSelectors[component] || [];
      selectors.forEach(selector => criticalSelectors.add(selector));
    });

    // Generate basic critical CSS for these selectors
    return this.generateBasicCriticalCss();
  }

  /**
   * Generate basic critical CSS for essential selectors
   */
  private generateBasicCriticalCss(): string {
    // This is a simplified version - in production, you'd want to extract from actual CSS
    return `
      /* Critical CSS - Above the fold styles */
      body { margin: 0; font-family: var(--font-sans), system-ui, -apple-system, sans-serif; }
      .hero-section { min-height: 100vh; display: flex; align-items: center; }
      .hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; }
      .hero-subtitle { font-size: clamp(1.1rem, 2.5vw, 1.25rem); opacity: 0.9; }
      .btn, .button { display: inline-flex; align-items: center; justify-content: center; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 500; transition: all 0.2s; }
      .navbar { position: fixed; top: 0; width: 100%; z-index: 50; backdrop-filter: blur(10px); }
      input, textarea, select { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; }
      .card { background: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
      .loading-spinner { display: inline-block; width: 1rem; height: 1rem; border: 2px solid #e5e7eb; border-radius: 50%; border-top-color: #3b82f6; animation: spin 1s ease-in-out infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }
    `.trim();
  }

  /**
   * Clear the CSS cache
   */
  clearCache(): void {
    this.criticalCssCache.clear();
  }
}

// Export singleton instance
export const criticalCssOptimizer = new CriticalCssOptimizer();