import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../../Services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  dismiss(id: number) {
    this.toastService.dismiss(id);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return 'ℹ️';
    }
  }

  getClasses(toast: Toast): string {
    const base =
      'toast-item flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 ease-in-out';
    const dismissClass = toast.dismissing ? 'toast-out' : 'toast-in';

    switch (toast.type) {
      case 'success':
        return `${base} ${dismissClass} bg-realty-sage-50 border-realty-sage-300 text-realty-sage-800`;
      case 'error':
        return `${base} ${dismissClass} bg-realty-terracotta-50 border-realty-terracotta-300 text-realty-terracotta-800`;
      case 'warning':
        return `${base} ${dismissClass} bg-realty-cream-100 border-realty-cream-500 text-realty-gray-800`;
      case 'info':
        return `${base} ${dismissClass} bg-realty-blue-50 border-realty-blue-300 text-realty-blue-800`;
      default:
        return `${base} ${dismissClass} bg-realty-blue-50 border-realty-blue-300 text-realty-blue-800`;
    }
  }
}
