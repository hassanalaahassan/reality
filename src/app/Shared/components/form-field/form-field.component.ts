import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  host: { style: 'display: contents' },
})
export class FormFieldComponent {
  /** The label text shown above the input */
  label = input.required<string>();

  /** HTML input type: text, email, password, tel, etc. */
  type = input<string>('text');

  /** Unique id/name for the input */
  fieldId = input.required<string>();

  /** Placeholder text */
  placeholder = input<string>('');

  /** Current value */
  value = input<string>('');

  /** Error message to show (empty = no error) */
  error = input<string | undefined>(undefined);

  /** Whether the field has been touched */
  touched = input<boolean>(false);

  /** Emitted on every keystroke */
  valueChange = output<string>();

  /** Emitted when the field loses focus */
  fieldBlur = output<void>();

  /** Password visibility toggle */
  passwordVisible = signal(false);

  get inputType(): string {
    if (this.type() === 'password') {
      return this.passwordVisible() ? 'text' : 'password';
    }
    return this.type();
  }

  get isPasswordField(): boolean {
    return this.type() === 'password';
  }

  togglePasswordVisibility() {
    this.passwordVisible.update((v) => !v);
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  onBlur() {
    this.fieldBlur.emit();
  }
}
