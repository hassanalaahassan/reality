import { Injectable, inject } from '@angular/core';
import { SubabaseService } from '../core/subabase.service';
import { Property, PropertyForm } from '../Models/property';
import { Observable, forkJoin, map, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private supabase = inject(SubabaseService);

  // ─── Image Upload ─────────────────────────────────
  uploadPropertyImages(files: File[]): Observable<string[]> {
    if (!files || files.length === 0) {
      return from([[]]);
    }

    const batchId = Date.now().toString();

    const uploadObservables = files.map((file) => {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const fileName = `${batchId}/${cleanFileName}`;

      return this.supabase.uploadFile('properties_image', fileName, file).pipe(
        map((uploadRes) => {
          if (uploadRes.error) throw uploadRes.error;
          return this.supabase.getFileUrl('properties_image', fileName).data
            .publicUrl;
        }),
      );
    });

    return forkJoin(uploadObservables);
  }

  // ─── Add Property ─────────────────────────────────
  addProperty(property: PropertyForm): Observable<Property> {
    return this.supabase.insert<PropertyForm>('properties', property);
  }
}
