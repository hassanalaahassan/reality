import { Component, input, output } from '@angular/core';

export type AlertType = 'error' | 'success' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  host: { style: 'display: contents' },
})
export class AlertComponent {
  /** The alert message to display */
  message = input.required<string | null>();

  /** The type/severity of the alert */
  type = input<AlertType>('error');

  /** Whether the alert is dismissible */
  dismissible = input<boolean>(true);

  /** Emitted when the user dismisses the alert */
  dismissed = output<void>();

  get typeClasses(): string {
    switch (this.type()) {
      case 'error':
        return 'bg-realty-terracotta-50 border-realty-terracotta-300 text-realty-terracotta-700';
      case 'success':
        return 'bg-realty-sage-50 border-realty-sage-300 text-realty-sage-700';
      case 'warning':
        return 'bg-realty-cream-100 border-realty-cream-500 text-realty-gray-800';
      case 'info':
        return 'bg-realty-blue-50 border-realty-blue-300 text-realty-blue-700';
      default:
        return 'bg-realty-terracotta-50 border-realty-terracotta-300 text-realty-terracotta-700';
    }
  }

  get iconPath(): string {
    switch (this.type()) {
      case 'error':
        return 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z';
      case 'success':
        return 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z';
      case 'warning':
        return 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z';
      case 'info':
        return 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z';
      default:
        return '';
    }
  }

  onDismiss() {
    this.dismissed.emit();
  }
}
