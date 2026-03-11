import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  dismissing?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  private _nextId = 0;

  readonly toasts = this._toasts.asReadonly();

  success(message: string, duration = 4000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 5000): void {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration = 4000): void {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration = 4000): void {
    this.show(message, 'info', duration);
  }

  dismiss(id: number): void {
    // Mark as dismissing for slide-out animation
    this._toasts.update((toasts) =>
      toasts.map((t) => (t.id === id ? { ...t, dismissing: true } : t)),
    );
    // Remove after animation
    setTimeout(() => {
      this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));
    }, 300);
  }

  private show(message: string, type: ToastType, duration: number): void {
    const id = this._nextId++;
    const toast: Toast = { id, message, type };

    this._toasts.update((toasts) => [...toasts, toast]);

    // Auto-dismiss
    setTimeout(() => this.dismiss(id), duration);
  }
}
