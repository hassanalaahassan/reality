import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-form-field',
  standalone: true,
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

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  onBlur() {
    this.fieldBlur.emit();
  }
}
