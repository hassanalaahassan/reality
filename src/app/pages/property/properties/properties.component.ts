import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';

import { CardComponent } from '../property-card/property-card.component';
import { PropertiesService } from '../../../Services/properties.service';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent implements OnInit {
  private propertiesService = inject(PropertiesService);

  properties = computed(() => this.propertiesService.propertiesList());
  isLoading = signal<boolean>(true);
  favProperties = computed(() => this.propertiesService.favoriteIds() );
  skeletonArray = new Array(6).fill(0);

  ngOnInit() {
    this.loadProperties();
    
  }

  checkPropertyFav(id: string): boolean {
    return this.favProperties().has(id);
  }

  loadProperties() {
    this.isLoading.set(true);
    this.propertiesService
      .getProperties()
      .pipe(tap(() => this.propertiesService.getFavProperties().subscribe()))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
        },
        error: (err: any) => {
          console.error('Failed to load properties', err);
          this.isLoading.set(false);
        },
      });
  }
  onToggleFavorite(propertyId: string) {
    this.propertiesService.toggleFavProperty(propertyId).subscribe();
  }
}
