import { Observable } from 'rxjs';
import { ITracker } from '../../Models/tracker';

export class ITrackerRequest<T> implements ITracker<T> {
  private inFlight = new Map<string, Observable<T>>();
  getInFlight(key: string): Observable<T> | undefined {
    return this.inFlight.get(key);
  }
  track(key: string, request: Observable<T>): void {
    this.inFlight.set(key, request);
  }
  unTrack(key: string): void {
    this.inFlight.delete(key);
  }
  has(key: string): boolean {
    return this.inFlight.has(key);
  }
}
