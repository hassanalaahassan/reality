import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../property-card/property-card.component';
import { PropertiesService } from '../../../Services/properties.service';
import { Property } from '../../../Models/property';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent implements OnInit {
  private propertiesService = inject(PropertiesService);

  properties = signal<Property[]>([]);
  isLoading = signal<boolean>(true);

  // Create dummy array for skeleton loading
  skeletonArray = new Array(6).fill(0);

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.isLoading.set(true);
    // Simulate network delay for skeleton preview since we're using mock data now
    // Actually, propertiesService.getProperties() might be fast or slow.
    this.propertiesService.getProperties().subscribe({
      next: (data: Property[]) => {
        this.properties.set(data);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Failed to load properties', err);
        this.isLoading.set(false);
      },
    });
  }
}
