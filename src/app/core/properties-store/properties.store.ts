import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

import { Property } from '../../Models/property';
import { SubabaseService } from '../subabase.service';
import { AuthService } from '../../Services/auth.service';
import { RxSignalStore } from '../Places-store/rx-signal.store';
import { TtlCache } from '../Places-store/ttl-cashe';
import { ITrackerRequest } from '../Places-store/tracker-request';
import { ToastService } from '../../Services/toast.service';

@Injectable({ providedIn: 'root' })
export class PropertiesStore {
  private supabase = inject(SubabaseService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  // ─── RxSignalStore for Properties ─────────────────
  private readonly store = new RxSignalStore<Property[]>(
    (_key: string) => this.fetchProperties(),
    new TtlCache<Property[]>(50),
    new ITrackerRequest<Property[]>(),
    5 * 60 * 1000, // 5 minutes TTL
  );

  // ─── Favorite Property IDs ────────────────────────
  private readonly _favPropertyIds = signal<string[]>([]);
  private _favLoaded = false;

  // ═══════════════════════════════════════════════════
  //  PUBLIC SIGNALS (Read-Only)
  // ═══════════════════════════════════════════════════

  /** All properties from the store */
  readonly allProperties = computed<Property[]>(() => this.store.data() ?? []);

  /** Loading state */
  readonly loading = this.store.loading;

  /** Error state */
  readonly error = this.store.error;

  /** Favorite property IDs */
  readonly favPropertyIds = this._favPropertyIds.asReadonly();

  /** Favorite property full objects (computed from allProperties + favPropertyIds) */
  readonly favPropertyObjects = computed<Property[]>(() => {
    const ids = this._favPropertyIds();
    const all = this.allProperties();
    if (!ids.length || !all.length) return [];
    return all.filter((p) => ids.includes(String(p.id)));
  });

  // ═══════════════════════════════════════════════════
  //  PUBLIC METHODS
  // ═══════════════════════════════════════════════════

  /**
   * Load all properties into the store.
   * Uses RxSignalStore caching — will serve from cache if fresh.
   */
  loadProperties(): Observable<Property[]> {
    return this.store.get('all_properties');
  }

  /**
   * Force-refresh properties from the database.
   */
  refreshProperties(): Observable<Property[]> {
    return this.store.refresh('all_properties');
  }

  /**
   * Load the current user's favorite property IDs.
   */
  loadFavorites(): Observable<void> {
    const userId = this.auth.currentUser()?.auth.id;
    if (!userId) return of(void 0);

    return this.supabase.getById<any>('fav_properties', userId).pipe(
      tap((res: any) => {
        if (res.error) throw res.error;
        const ids = (res.data?.properties_id as string[]) ?? [];
        this._favPropertyIds.set(ids);
        this._favLoaded = true;
      }),
      map(() => void 0),
      catchError(() => {
        // User might not have a favorites row yet
        this._favPropertyIds.set([]);
        this._favLoaded = true;
        return of(void 0);
      }),
    );
  }

  /**
   * Toggle a property's favorite status.
   * Uses optimistic UI: updates the signal immediately, then syncs with the server.
   */
  toggleFavorite(propertyId: string): Observable<void> {
    // Optimistic update
    const currentIds = this._favPropertyIds();
    const isCurrentlyFav = currentIds.includes(propertyId);
    const optimisticIds = isCurrentlyFav
      ? currentIds.filter((id) => id !== propertyId)
      : [...currentIds, propertyId];
    this._favPropertyIds.set(optimisticIds);

    return this.supabase
      .rpc('toggle_favorite', { p_property: propertyId })
      .pipe(
        // After toggle, re-fetch favorites to stay in sync
        switchMap(() => this.loadFavorites()),
        tap(() => {
          this.toast.success(
            isCurrentlyFav ? 'Removed from favorites' : 'Added to favorites ❤️',
          );
        }),
        catchError((err) => {
          // Rollback on error
          this._favPropertyIds.set(currentIds);
          this.toast.error('Failed to update favorites');
          throw err;
        }),
      );
  }

  /**
   * Get a single property by ID from local state.
   * Loads properties first if they haven't been loaded.
   */
  getPropertyById(id: number | string): Observable<Property | undefined> {
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;
    const existing = this.allProperties().find((p) => p.id === numId);

    if (existing) {
      return of(existing);
    }

    // Properties not loaded yet — load them and then find
    return this.loadProperties().pipe(
      map((props) => props.find((p) => p.id === numId)),
    );
  }

  /**
   * Check if a property is in the favorites list.
   */
  isFavorite(propertyId: string | number): boolean {
    return this._favPropertyIds().includes(String(propertyId));
  }

  /**
   * Ensure favorites are loaded (call once, idempotent).
   */
  ensureFavoritesLoaded(): Observable<void> {
    if (this._favLoaded) return of(void 0);
    return this.loadFavorites();
  }

  // ═══════════════════════════════════════════════════
  //  PRIVATE
  // ═══════════════════════════════════════════════════

  /**
   * The raw fetch function passed to RxSignalStore.
   * Fetches all properties from Supabase.
   */
  private fetchProperties(): Observable<Property[]> {
    return this.supabase.getAll<any>('properties').pipe(
      map((res: any) => {
        if (res.error) throw res.error;
        return res.data as Property[];
      }),
    );
  }
}
