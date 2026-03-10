import { Injectable, inject } from '@angular/core';
import { SubabaseService } from '../core/subabase.service';
import { Property, PropertyForm } from '../Models/property';
import { Observable, forkJoin, map, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private supabase = inject(SubabaseService);

  // Upload multiple images to 'properties' bucket
  uploadPropertyImages(files: File[]): Observable<string[]> {
    if (!files || files.length === 0) {
      return from([[]]);
    }

    // Generate a unique folder for this batch to avoid naming collisions
    const batchId = Date.now().toString();

    const uploadObservables = files.map((file) => {
      // Normalize filename slightly to prevent issues with spaces/special characters
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const fileName = `${batchId}/${cleanFileName}`;

      return this.supabase.uploadFile('properties_image', fileName, file).pipe(
        map((uploadRes) => {
          if (uploadRes.error) throw uploadRes.error;
          // Get public URL immediately
          return this.supabase.getFileUrl('properties_image', fileName).data
            .publicUrl;
        }),
      );
    });

    return forkJoin(uploadObservables);
  }

  // Add the property object to 'properties' table
  addProperty(property: PropertyForm): Observable<Property> {
    return this.supabase.insert<PropertyForm>('properties', property);
  }

  // Fetch all properties from the 'properties' table
  getProperties(): Observable<Property[]> {
    return this.supabase.getAll<any>('properties').pipe(
      map((res: any) => {
        if (res.error) throw res.error;
        return res.data as Property[];
      }),
    );
  }
}
