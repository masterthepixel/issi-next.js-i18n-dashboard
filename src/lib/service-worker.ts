'use client';

/**
 * Service Worker registration and management
 * Handles PWA functionality and caching strategies
 */

interface SWMessage {
  type: string;
  payload?: unknown;
}

export class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private updateAvailable = false;
  private updateCallbacks: ((registration: ServiceWorkerRegistration) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private async init() {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('[SW] Registered successfully:', this.registration);

        // Handle updates
        this.registration.addEventListener('updatefound', () => {
          const newWorker = this.registration!.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.updateAvailable = true;
                this.notifyUpdateCallbacks(this.registration!);
              }
            });
          }
        });

        // Handle controller change (new SW activated)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('[SW] Controller changed, reloading page');
          window.location.reload();
        });

        // Handle messages from SW
        navigator.serviceWorker.addEventListener('message', (event) => {
          this.handleMessage(event.data);
        });

      } catch (error) {
        console.error('[SW] Registration failed:', error);
      }
    }
  }

  private handleMessage(data: SWMessage) {
    switch (data.type) {
      case 'CACHE_UPDATED':
        console.log('[SW] Cache updated:', data.payload);
        break;
      case 'OFFLINE_READY':
        console.log('[SW] App ready for offline use');
        break;
      default:
        console.log('[SW] Unknown message:', data);
    }
  }

  // Subscribe to update notifications
  onUpdate(callback: (registration: ServiceWorkerRegistration) => void) {
    this.updateCallbacks.push(callback);
    return () => {
      this.updateCallbacks = this.updateCallbacks.filter(cb => cb !== callback);
    };
  }

  private notifyUpdateCallbacks(registration: ServiceWorkerRegistration) {
    this.updateCallbacks.forEach(callback => callback(registration));
  }

  // Skip waiting and activate new SW
  async update() {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }

  // Check for updates
  async checkForUpdates() {
    if (this.registration) {
      await this.registration.update();
    }
  }

  // Get cache status
  async getCacheStatus() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      const cacheSizes = await Promise.all(
        cacheNames.map(async (name) => {
          const cache = await caches.open(name);
          const keys = await cache.keys();
          return { name, size: keys.length };
        })
      );
      return cacheSizes;
    }
    return [];
  }

  // Clear all caches
  async clearCache() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(name => caches.delete(name))
      );
      console.log('[SW] All caches cleared');
    }
  }

  // Send message to SW
  sendMessage(message: SWMessage) {
    if (this.registration && this.registration.active) {
      this.registration.active.postMessage(message);
    }
  }

  // Check if app is online
  isOnline(): boolean {
    return navigator.onLine;
  }

  // Listen for online/offline events
  onOnlineStatusChange(callback: (isOnline: boolean) => void) {
    const handleOnline = () => callback(true);
    const handleOffline = () => callback(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Return cleanup function
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }
}

// Export singleton instance
export const swManager = new ServiceWorkerManager();
