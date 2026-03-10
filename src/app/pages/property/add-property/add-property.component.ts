import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';

import { PropertiesService } from '../../../Services/properties.service';
import { AuthService } from '../../../Services/auth.service';
import { ToastService } from '../../../Services/toast.service';
import { PropertyForm } from '../../../Models/property';
import { AuthValidator } from '../../../Services/validation.service';

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
  private toast = inject(ToastService);

  form = signal<PropertyForm>({
    title: '',
    price: null,
    area: '',
    location: '',
    status: '',
    type: '',
    isVip: false,
    isNegotiable: false,
    ownerName: '',
    ownerPhone: '',
    image_urls: [],
    user_id: this.authService.currentUser()?.auth.id,
    floor: null,
    beds: null,
    bathroom: null,
    features: [],
  });

  errors = signal<Partial<Record<keyof PropertyForm, string>>>({});

  selectedFiles: File[] = [];
  isSubmitting = false;

  // Dynamic feature inputs — each feature is an editable string
  featureInputs = signal<string[]>([]);

  // Computed validity for button disable
  isFormValid = computed(() => {
    const { valid } = this.validationService.validateProperty(this.form());
    return valid;
  });

  updateField(field: keyof PropertyForm, value: any) {
    this.form.update((f) => ({
      ...f,
      [field]: value,
    }));

    // Real-time validation
    const { errors } = this.validationService.validateProperty(this.form());
    this.errors.set(errors);
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

  // ── Features management (dynamic inputs) ──
  addFeatureInput() {
    this.featureInputs.update((inputs) => [...inputs, '']);
  }

  updateFeatureInput(index: number, value: string) {
    this.featureInputs.update((inputs) => {
      const updated = [...inputs];
      updated[index] = value;
      return updated;
    });
    // Sync features to form (only non-empty values)
    this.syncFeaturesToForm();
  }

  removeFeatureInput(index: number) {
    this.featureInputs.update((inputs) => inputs.filter((_, i) => i !== index));
    this.syncFeaturesToForm();
  }

  private syncFeaturesToForm() {
    const features = this.featureInputs().filter((f) => f.trim() !== '');
    this.form.update((f) => ({ ...f, features }));
    // Re-validate
    const { errors } = this.validationService.validateProperty(this.form());
    this.errors.set(errors);
  }

  onSubmit() {
    // Sync features one final time
    this.syncFeaturesToForm();

    const { valid, errors } = this.validationService.validateProperty(
      this.form(),
    );
    this.errors.set(errors);

    if (!valid) {
      this.toast.error('Please fix the errors in the form before submitting.');
      return;
    }

    if (this.isSubmitting) return;

    this.isSubmitting = true;
    const data = this.form();

    this.propertiesService
      .uploadPropertyImages(this.selectedFiles)
      .pipe(
        switchMap((urls) =>
          this.propertiesService.addProperty({ ...data, image_urls: urls }),
        ),
        tap(() => {
          this.isSubmitting = false;
          this.toast.success('Property added successfully! 🎉');
          this.router.navigate(['/properties']);
        }),
        catchError((err) => {
          this.isSubmitting = false;
          const message =
            err?.error?.message ||
            err?.message ||
            'Failed to add property. Please try again.';
          this.toast.error(message);
          console.error(err);
          return of();
        }),
      )
      .subscribe();
  }
}
