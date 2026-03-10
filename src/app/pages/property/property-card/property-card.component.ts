import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Property } from '../../../Models/property';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) property!: Property;
  @Input() isLoading = false;

  @Output() favoriteToggle = new EventEmitter<string>();
  @Output() contactRequest = new EventEmitter<number>();

  @Input() isFavorite = false;
  isImageLoaded = false;

  getPropertyTypeColor(type: string | undefined): string {
    if (!type) return 'bg-gray-100 text-gray-800';
    const typeLower = type.toLowerCase();
    const colors: Record<string, string> = {
      apartment: 'bg-blue-100 text-blue-800',
      villa: 'bg-green-100 text-green-800',
      chalet: 'bg-cyan-100 text-cyan-800',
      studio: 'bg-purple-100 text-purple-800',
      land: 'bg-amber-100 text-amber-800',
      shop: 'bg-rose-100 text-rose-800',
    };
    return colors[typeLower] || 'bg-gray-100 text-gray-800';
  }

  getPropertyTypeIcon(type: string | undefined): string {
    if (!type) return '🏠';
    const typeLower = type.toLowerCase();
    const icons: Record<string, string> = {
      apartment: '🏢',
      villa: '🏡',
      chalet: '�️',
      studio: '🎨',
      land: '🌳',
      shop: '🏪',
    };
    return icons[typeLower] || '🏠';
  }

  getPropertyStatusColor(status: string | undefined): string {
    if (!status) return 'bg-gray-100 text-gray-800';
    const statusLower = status.toLowerCase();
    const colors: Record<string, string> = {
      sale: 'bg-realty-terracotta-100 text-realty-terracotta-800',
      rent: 'bg-realty-blue-100 text-realty-blue-800',
    };
    return colors[statusLower] || 'bg-gray-100 text-gray-800';
  }

  

  getPricePerSquareMeter(): number | null {
    if (!this.property.price || !this.property.area) return null;
    const area = parseFloat(this.property.area);
    if (isNaN(area) || area === 0) return null;
    return Math.round(this.property.price / area);
  }

  // تبديل المفضلة
  toggleFavorite(event: Event): void {
    event.stopPropagation();
    event.preventDefault(); // Prevent navigation
    this.isFavorite = !this.isFavorite;
    this.favoriteToggle.emit(`${this.property.id}`);
  }

  // طلب التواصل
  onContactRequest(event: Event): void {
    event.stopPropagation();
    event.preventDefault(); // Prevent navigation
    this.contactRequest.emit(this.property.id);
  }

  // تحميل الصورة
  onImageLoad(): void {
    this.isImageLoaded = true;
  }
}
