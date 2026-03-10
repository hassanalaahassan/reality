import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PropertiesService } from '../../../Services/properties.service';
import { AuthService } from '../../../Services/auth.service';
import { PropertyForm } from '../../../Models/property';
import { AuthValidator } from '../../../Services/validation.service';
import { catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
})
export class AddPropertyComponent {
  private propertiesService = inject(PropertiesService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private validationService = inject(AuthValidator);

  // الفورم كـ Signal
  form = signal<PropertyForm>({
    title: '',
    price: null,
    area: '',
    location: '',
    status: 'sale',
    type: '',
    isVip: false,
    isNegotiable: false,
    ownerName: '',
    ownerPhone: '',
    image_urls: [],
    user_id: this.authService.currentUser()?.auth.id,
  });

  errors = signal<Partial<Record<keyof PropertyForm, string>>>({});

  selectedFiles: File[] = [];
  isSubmitting = false;
  message = '';

  constructor() {}

  updateField(field: keyof PropertyForm, value: any) {
    this.form.update((f) => ({
      ...f,
      [field]: value,
    }));

    this.errors.update((err) => ({
      ...err,
      [field]: '',
    }));
  }

  get isAgent(): boolean {
    const user = this.authService.currentUser();
    return !!user?.profile?.isAgent;
  }
  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  onSubmit() {
    const { valid, errors } = this.validationService.validateProperty(
      this.form(),
    );
    this.errors.set(errors);

    if (!valid) return;

    this.isSubmitting = true;
    this.message = '';
    const data = this.form();

     this.isSubmitting = true;
    this.message = '';

    this.propertiesService
      .uploadPropertyImages(this.selectedFiles)
      .pipe(
        switchMap((urls) =>
          this.propertiesService.addProperty({ ...data, image_urls: urls }),
        ),
        tap(() => {
          this.isSubmitting = false;
          this.message = 'Property added successfully';
          this.router.navigate(['/properties']);
        }),
        catchError((err) => {
          this.isSubmitting = false;
          this.message = 'Failed to add property. Please try again.';
          console.error(err);
          return of();
        }),
      )
      .subscribe();
  }
}
