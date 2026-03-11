import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Property } from '../../../Models/property';
import { PropertiesService } from '../../../Services/properties.service';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss',
})
export class PropertyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private propertiesService = inject(PropertiesService);

  property = signal<Property | undefined>(undefined);
  isLoading = signal<boolean>(true);
  notFound = signal<boolean>(false);
  selectedImageIndex = signal<number>(0);

  isFavorite = computed(() => {
   return this.propertiesService.favoriteIds().has(this.property()?.id+'');
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.notFound.set(true);
      this.isLoading.set(false);
      return;
    }
    else{
      this.isLoading.set(false);
      this.property.set(this.propertiesService.getPropertyFromMap(id))      
    }
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
    this.propertiesService.toggleFavProperty(this.property()?.id+'').subscribe();
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
