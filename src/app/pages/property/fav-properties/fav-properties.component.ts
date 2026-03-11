import { Component, computed, inject, signal } from '@angular/core';
import { PropertiesService } from '../../../Services/properties.service';
import { CardComponent } from '../property-card/property-card.component';

@Component({
  selector: 'app-fav-properties',
  imports: [CardComponent],
  standalone:true,
  templateUrl: './fav-properties.component.html',
  styleUrl: './fav-properties.component.scss'
})
export class FavPropertiesComponent {
 private propertiesService = inject(PropertiesService);

  properties = computed(() => this.propertiesService.favoriteProperties());
  skeletonArray = new Array(6).fill(0);

  ngOnInit() {
    
  }

  

  
  onToggleFavorite(propertyId: string) {
    this.propertiesService.toggleFavProperty(propertyId).subscribe();
  }
}
