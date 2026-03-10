import { signal, WritableSignal } from '@angular/core';
import { catchError, finalize, Observable, of, shareReplay, tap } from 'rxjs';

import { ICash } from '../../Models/Cash';
import { ITracker } from '../../Models/tracker';

export class RxSignalStore<T> {
  private _data: WritableSignal<T | null> = signal<T | null>(null);
  private _loading: WritableSignal<boolean> = signal<boolean>(false);
  private _error: WritableSignal<string | null> = signal<string | null>(null);

  readonly data = this._data.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(
    private readonly fetchFn: (key: string) => Observable<T>,
    private readonly cache: ICash<T>,
    private readonly tracker: ITracker<T>,
    private readonly ttl: number,
  ) {}

  get(key: string): Observable<T> {
    const now = Date.now();
    const cached = this.cache.get(key);
    if (cached && now <= cached.expiry) {
      this._data.set(cached.data);
      return of(cached.data);
    }
    if (cached) {
      this._data.set(cached.data);
      this.refreshCacheInBackGround(key);
      return of(cached.data);
    }
    return this.loadAndCacheData(key);
  }

  refresh(key: string): Observable<T> {
    this.cache.remove(key);
    this.tracker.unTrack(key);
    return this.loadAndCacheData(key, false);
  }
  clearCache(): void {
    this.cache.clear();
  }
  
  private refreshCacheInBackGround(key: string): void {
    if (this.tracker.has(key)) return;
    this.loadAndCacheData(key).subscribe({
      error: (err) => this._error.set('Failed to refresh cache'),
    });
  }
  private loadAndCacheData(
    key: string,
    loading: boolean = true,
  ): Observable<T> {
    const inFlight = this.tracker.getInFlight(key);
    if (inFlight) return inFlight;

    if (loading) {
      this._loading.set(true);
      this._error.set(null);
    }

    const request$ = this.fetchFn(key).pipe(
      tap((data) => {
        this._data.set(data);

        this.cache.set(key, data, this.ttl);
      }),
      catchError((err) => {
        this._error.set('Failed to load data');
        throw err;
      }),
      finalize(() => {
        if (loading) {
          this._loading.set(false);
        }

        this.tracker.unTrack(key);
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
    this.tracker.track(key, request$);
    return request$;
  }
}
