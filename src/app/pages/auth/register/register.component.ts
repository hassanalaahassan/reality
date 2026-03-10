import { Component, signal, computed, inject } from '@angular/core';
import { RegisterForm, UserType } from '../../../Models/auth';
import { DestroyRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AuthValidator,
  TouchedState,
} from '../../../Services/validation.service';
import { AuthService } from '../../../Services/auth.service';
import { FormFieldComponent, AlertComponent } from '../../../Shared';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormFieldComponent, AlertComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  // ── Form state ──────────────────────────
  form = signal<RegisterForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: '' as UserType,
    file: null,
  });

  loading = signal(false);
  serverError = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  // ── Validation ──────────────────────────
  validation = computed(() => AuthValidator.validate(this.form()));
  isFormValid = computed(() => this.validation().valid);
  errors = computed(() => this.validation().errors);
  touched = signal<TouchedState>({});

  // ── Helpers ─────────────────────────────
  markTouched(field: keyof RegisterForm) {
    this.touched.set(AuthValidator.markTouched(this.touched(), field));
  }

  update<K extends keyof RegisterForm>(key: K, value: RegisterForm[K]) {
    this.form.update((f) => ({ ...f, [key]: value }));
    // Clear server error when user starts typing
    if (this.serverError()) {
      this.serverError.set(null);
    }
  }

  clearServerError() {
    this.serverError.set(null);
  }

  clearSuccess() {
    this.successMessage.set(null);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.update('file', file);
    this.markTouched('file');
  }

  // ── Submit ──────────────────────────────
  onSubmit() {
    // Mark all fields as touched so validation errors appear
    this.touched.set(AuthValidator.markAllTouched(this.form()));

    if (!this.isFormValid()) return;

    this.loading.set(true);
    this.serverError.set(null);
    this.successMessage.set(null);

    this.auth
      .registerWithProfile(this.form())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.successMessage.set(
            'Account created successfully! Redirecting to login...',
          );
          this.resetForm();
          // Navigate to login after a short delay
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.loading.set(false);
          const message =
            err?.error?.message ||
            err?.message ||
            'Registration failed. Please try again.';
          this.serverError.set(message);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }

  private resetForm() {
    this.form.set({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      userType: '' as UserType,
      file: null,
    });
    this.touched.set({});
  }
}
