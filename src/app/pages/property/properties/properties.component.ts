import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../property-card/property-card.component';
import { PropertiesStore } from '../../../core/properties-store/properties.store';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent implements OnInit {
  private store = inject(PropertiesStore);

  properties = this.store.allProperties;
  isLoading = this.store.loading;
  favPropertyIds = this.store.favPropertyIds;

  skeletonArray = new Array(6).fill(0);

  ngOnInit() {
    this.store
      .loadProperties()
      .pipe(switchMap(() => this.store.ensureFavoritesLoaded()))
      .subscribe();
  }

  checkPropertyFav(id: string): boolean {
    return this.store.isFavorite(id);
  }

  onToggleFavorite(propertyId: string) {
    this.store.toggleFavorite(propertyId).subscribe();
  }
}
