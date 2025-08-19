import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { IconComponent } from '../../../components/icons/icon.component';

export type FormFieldType =
  | 'text'
  | 'email'
  | 'select'
  | 'textarea'
  | 'number'
  | 'date';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
  template: `
    <div class="form-field">
      <label [for]="fieldId">{{ label }}</label>

      <div class="input-wrapper">
        <div class="input-icon" *ngIf="icon">
          <app-icon [name]="icon"></app-icon>
        </div>

        <!-- Input Text/Email/Number/Date -->
        <input
          *ngIf="
            type === 'text' ||
            type === 'email' ||
            type === 'number' ||
            type === 'date'
          "
          [id]="fieldId"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [class.error]="hasError"
          [disabled]="disabled"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
        />

        <!-- Select -->
        <select
          *ngIf="type === 'select'"
          [id]="fieldId"
          [value]="value"
          [class.error]="hasError"
          [disabled]="disabled"
          (change)="onSelectChange($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
        >
          <option value="">{{ placeholder }}</option>
          <option *ngFor="let option of options" [value]="option.value">
            {{ option.label }}
          </option>
        </select>

        <!-- Textarea -->
        <textarea
          *ngIf="type === 'textarea'"
          [id]="fieldId"
          [placeholder]="placeholder"
          [value]="value"
          [class.error]="hasError"
          [disabled]="disabled"
          [rows]="textareaRows"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
        ></textarea>
      </div>

      <!-- Error Message -->
      <div
        class="error-message"
        [class.show]="hasError && errorMessage"
        *ngIf="hasError && errorMessage"
      >
        {{ errorMessage }}
      </div>
    </div>
  `,
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: FormFieldType = 'text';
  @Input() placeholder = '';
  @Input() icon = '';
  @Input() errorMessage = '';
  @Input() hasError = false;
  @Input() disabled = false;
  @Input() textareaRows = 4;
  @Input() options: SelectOption[] = [];

  value = '';
  fieldId = `field-${Math.random().toString(36).substr(2, 9)}`;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Event handlers
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  onFocus(): void {
    // Handle focus if needed
  }
}
