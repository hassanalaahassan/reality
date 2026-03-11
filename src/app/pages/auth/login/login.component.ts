import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AuthValidator,
  TouchedStateLogin,
} from '../../../Services/validation.service';
import { LoginForm } from '../../../Models/auth';
import { AuthService } from '../../../Services/auth.service';
import { ToastService } from '../../../Services/toast.service';
import { FormFieldComponent} from '../../../Shared';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormFieldComponent],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private toast = inject(ToastService);

  // ── Form state ──────────────────────────
  form = signal<LoginForm>({
    email: '',
    password: '',
  });

  loading = signal(false);
  serverError = signal<string | null>(null);

  // ── Validation ──────────────────────────
  validation = computed(() => AuthValidator.validateLogin(this.form()));
  isFormValid = computed(() => this.validation().valid);
  errors = computed(() => this.validation().errors);
  touched = signal<TouchedStateLogin>({});

  // ── Helpers ─────────────────────────────
  markTouched(field: keyof LoginForm) {
    this.touched.set(AuthValidator.markTouchedLogin(this.touched(), field));
  }

  update<K extends keyof LoginForm>(key: K, value: LoginForm[K]) {
    this.form.update((f) => ({ ...f, [key]: value }));
    if (this.serverError()) {
      this.serverError.set(null);
    }
  }

  clearServerError() {
    this.serverError.set(null);
  }

  // ── Submit ──────────────────────────────
  onSubmit() {
    this.touched.set(AuthValidator.markAllTouchedLogin(this.form()));

    if (!this.isFormValid()) {
      this.toast.error('Please fill in all fields correctly.');
      return;
    }

    this.loading.set(true);
    this.serverError.set(null);

    this.authService
      .loginUser(this.form())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toast.success('Login successful! Welcome back.');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.loading.set(false);
          const message =
            err?.error?.message ||
            err?.message ||
            'Login failed. Please check your credentials and try again.';
          this.toast.error(message);
          this.serverError.set(message);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }
}
