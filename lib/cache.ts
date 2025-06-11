interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class CacheManager {
  private cache = new Map<string, CacheItem<any>>();

  set<T>(key: string, data: T, durationMinutes: number = 60): void {
    const now = Date.now();
    const expiry = now + durationMinutes * 60 * 1000;

    this.cache.set(key, {
      data,
      timestamp: now,
      expiry
    });

    // Also store in localStorage for persistence
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          `portfolio_cache_${key}`,
          JSON.stringify({
            data,
            timestamp: now,
            expiry
          })
        );
      } catch (e) {
        console.warn('Failed to save to localStorage:', e);
      }
    }
  }

  get<T>(key: string): T | null {
    // First check memory cache
    const memoryItem = this.cache.get(key);
    if (memoryItem && Date.now() < memoryItem.expiry) {
      return memoryItem.data;
    }

    // Then check localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(`portfolio_cache_${key}`);
        if (stored) {
          const item: CacheItem<T> = JSON.parse(stored);
          if (Date.now() < item.expiry) {
            // Restore to memory cache
            this.cache.set(key, item);
            return item.data;
          } else {
            // Expired, remove it
            localStorage.removeItem(`portfolio_cache_${key}`);
          }
        }
      } catch (e) {
        console.warn('Failed to read from localStorage:', e);
      }
    }

    return null;
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(key);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(`portfolio_cache_${key}`);
      }
    } else {
      this.cache.clear();
      if (typeof window !== 'undefined') {
        // Clear all portfolio cache items
        Object.keys(localStorage)
          .filter((k) => k.startsWith('portfolio_cache_'))
          .forEach((k) => localStorage.removeItem(k));
      }
    }
  }

  isExpired(key: string): boolean {
    const item = this.cache.get(key);
    return !item || Date.now() >= item.expiry;
  }
}

export const cacheManager = new CacheManager();
