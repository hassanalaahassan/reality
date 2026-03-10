export interface ICash<T> {
  get(key: string): { data: T; expiry: number } | undefined;
  set(key: string, data: T, expiry: number): void;
  has(key:string):boolean;
  remove(key: string): void;
  clear(): void;
  size(): number;
  cleanup?(): void;
}
