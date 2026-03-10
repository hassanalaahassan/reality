import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PropertiesStore } from '../../../core/properties-store/properties.store';
import { Property } from '../../../Models/property';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss',
})
export class PropertyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(PropertiesStore);

  property = signal<Property | undefined>(undefined);
  isLoading = signal<boolean>(true);
  notFound = signal<boolean>(false);
  selectedImageIndex = signal<number>(0);

  isFavorite = computed(() => {
    const prop = this.property();
    if (!prop) return false;
    return this.store.isFavorite(prop.id);
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.notFound.set(true);
      this.isLoading.set(false);
      return;
    }

    this.store
      .loadProperties()
      .pipe(
        switchMap(() => this.store.ensureFavoritesLoaded()),
        switchMap(() => this.store.getPropertyById(id)),
      )
      .subscribe({
        next: (prop: any) => {
          if (prop) {
            this.property.set(prop);
          } else {
            this.notFound.set(true);
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.notFound.set(true);
          this.isLoading.set(false);
        },
      });
  }

  selectImage(index: number) {
    this.selectedImageIndex.set(index);
  }

  get currentImage(): string {
    const prop = this.property();
    if (!prop?.image_urls?.length) return 'assets/images/default-property.jpg';
    return prop.image_urls[this.selectedImageIndex()] || prop.image_urls[0];
  }

  toggleFavorite() {
    const prop = this.property();
    if (!prop) return;
    this.store.toggleFavorite(String(prop.id)).subscribe();
  }

  getStatusLabel(status: string | undefined): string | undefined {
    if (status) {
      const labels: Record<string, string> = {
        sale: 'For Sale',
        rent: 'For Rent',
      };
      return labels[status?.toLowerCase()] || status;
    } else {
      return;
    }
  }

  getStatusColor(status: string | undefined): string | undefined {
    if (status) {
      const colors: Record<string, string> = {
        sale: 'status-sale',
        rent: 'status-rent',
      };
      return colors[status?.toLowerCase()] || '';
    } else {
      return;
    }
  }
}
