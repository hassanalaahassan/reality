import { Observable } from 'rxjs';

export interface ITracker<T> {
  getInFlight(key: string): Observable<T> | undefined;
  track(key: string, request: Observable<T>): void;
  unTrack(key: string): void;
  has(key: string): boolean;
}
