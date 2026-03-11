import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../Services/toast.service';

interface ContactForm {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private toast = inject(ToastService);

  form = signal<ContactForm>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  errors = signal<Partial<Record<keyof ContactForm, string>>>({});
  touched = signal<Partial<Record<keyof ContactForm, boolean>>>({});
  isSubmitting = signal(false);

  // Simple validation logic
  validate(f: ContactForm) {
    const errs: Partial<Record<keyof ContactForm, string>> = {};
    if (!f.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!f.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
      errs.email = 'Invalid email format';
    }
    if (!f.phone.trim()) errs.phone = 'Phone Number is required';
    if (!f.subject.trim()) errs.subject = 'Subject is required';
    if (!f.message.trim()) errs.message = 'Message is required';
    return { valid: Object.keys(errs).length === 0, errors: errs };
  }

  isFormValid = computed(() => this.validate(this.form()).valid);

  updateField(field: keyof ContactForm, value: string) {
    this.form.update((f) => ({ ...f, [field]: value }));
    this.touched.update((t) => ({ ...t, [field]: true }));

    // Only show errors for touched fields
    const { errors: allErrors } = this.validate(this.form());
    const t = this.touched();
    const filtered: Partial<Record<keyof ContactForm, string>> = {};
    for (const key in allErrors) {
      if (t[key as keyof ContactForm]) {
        filtered[key as keyof ContactForm] =
          allErrors[key as keyof ContactForm];
      }
    }
    this.errors.set(filtered);
  }

  onSubmit() {
    // Mark all as touched
    const allTouched: Partial<Record<keyof ContactForm, boolean>> = {
      fullName: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    };
    this.touched.set(allTouched);

    const { valid, errors } = this.validate(this.form());
    this.errors.set(errors);

    if (!valid) {
      this.toast.error('Please fix the errors in the form before submitting.');
      return;
    }

    if (this.isSubmitting()) return;
          this.isSubmitting.set(false);

    this.isSubmitting.set(true);
this.touched.set({});
      this.toast.success(
        'Your message has been sent successfully! We will contact you soon.',
      );
    
  }
}
