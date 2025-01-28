interface LRUCacheConfig<K, V> {
  maxSize: number;
}

class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;

  constructor(config: LRUCacheConfig<K, V>) {
    this.cache = new Map<K, V>();
    this.maxSize = config.maxSize;
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined;
    }

    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.maxSize) {
      const oldestKey = this.cache.keys().next().value;

      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  get size(): number {
    return this.cache.size;
  }
}

function createLRUCache<K, V>(config: LRUCacheConfig<K, V>): LRUCache<K, V> {
  return new LRUCache<K, V>(config);
}

export default createLRUCache;
