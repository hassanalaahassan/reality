import { OnDestroy } from '@angular/core';
import { ICash } from '../../Models/Cash';
import { CacheEntry } from '../../Models/entry';


export class TtlCache<T> implements ICash<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private intervalId: any;
  constructor(
    private readonly maxSize: number = 100,
    private readonly cleanupIntervalMs: number = 60000, // 1 minute
  ) {
    this.startCleanup();
  }

  get(key: string): CacheEntry<T> | undefined {
    const now = Date.now();
    const entry = this.cache.get(key);

    if (entry && entry.expiry > now) return entry;
    return undefined;
  }
  set(key: string, data: T, expiry: number) {
    if (this.cache.size >= this.maxSize) {
      this.removeOldest();
    }
    const ttl = Date.now() + expiry;
    this.cache.set(key, { data, expiry: ttl });
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }
  remove(key: string): void {
    this.cache.delete(key);
  }
  clear(): void {
    this.cache.clear();
  }
  size(): number {
    return this.cache.size;
  }
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiry <= now) {
        this.remove(key);
      }
    }
  }
  removeOldest(): void {
    const oldestElement = this.cache.keys().next().value!;
    this.cache.delete(oldestElement);
  }
  startCleanup(): void {
    this.intervalId = setInterval(() => this.cleanup(), this.cleanupIntervalMs);
  }
  OnDestroy() {
    clearInterval(this.intervalId);
  }
}
