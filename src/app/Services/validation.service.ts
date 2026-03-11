import { Injectable } from '@angular/core';
import { LoginForm, RegisterForm } from '../Models/auth';
import { PropertyForm } from '../Models/property';

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof RegisterForm, string>>;
}
export interface ValidationResultProperty {
  valid: boolean;
  errors: Partial<Record<keyof PropertyForm, string>>;
}
export interface ValidationResultLogin {
  valid: boolean;
  errors: Partial<Record<keyof LoginForm, string>>;
}

export type TouchedState = Partial<Record<keyof RegisterForm, boolean>>;
export type TouchedStateLogin = Partial<Record<keyof LoginForm, boolean>>;

@Injectable({
  providedIn: 'root',
})
export class AuthValidator {
  static validate(form: RegisterForm): ValidationResult {
    const errors: ValidationResult['errors'] = {};

    if (form.username.trim().length < 3) {
      errors.username = 'Minimum 3 characters';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Invalid email format';
    }

    if (form.password.length < 6) {
      errors.password = 'Minimum 6 characters';
    }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!/^01[0-9]{9}$/.test(form.phone)) {
      errors.phone = 'Invalid phone number';
    }

    if (!form.userType) {
      errors.userType = 'Select user type';
    }

    if (!form.file) {
      errors.file = 'Profile picture required';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
  static validateLogin(form: LoginForm): ValidationResultLogin {
    const errors: ValidationResultLogin['errors'] = {};

    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Invalid email format';
    }

    if (!form.password) {
      errors.password = 'Password is required';
    } else if (form.password.length < 6) {
      errors.password = 'Minimum 6 characters';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
  static markTouched(
    touched: TouchedState,
    field: keyof RegisterForm,
  ): TouchedState {
    return {
      ...touched,
      [field]: true,
    };
  }
  static markTouchedLogin(
    touched: TouchedStateLogin,
    field: keyof LoginForm,
  ): TouchedStateLogin {
    return {
      ...touched,
      [field]: true,
    };
  }

  static markAllTouched(form: RegisterForm): TouchedState {
    const keys = Object.keys(form) as (keyof RegisterForm)[];

    const touched: TouchedState = {};

    keys.forEach((k) => (touched[k] = true));

    return touched;
  }
  static markAllTouchedLogin(form: LoginForm): TouchedStateLogin {
    const keys = Object.keys(form) as (keyof LoginForm)[];

    const touched: TouchedStateLogin = {};

    keys.forEach((k) => (touched[k] = true));

    return touched;
  }
  validateProperty(form: PropertyForm): ValidationResultProperty {
    const errors: Partial<Record<keyof PropertyForm, string>> = {};

    if (!form.title.trim()) errors.title = 'Title is required';
    if (!form.price || form.price <= 0)
      errors.price = 'Price must be greater than 0';
    if (!form.area.trim()) errors.area = 'Area is required';
    if (!form.location.trim()) errors.location = 'Location is required';
    if (!form.type) errors.type = 'Property type is required';
    if (!form.status) errors.status = 'Status is required';
    if (!form.ownerName.trim()) errors.ownerName = 'Owner name is required';
    if (!form.ownerPhone.trim()) errors.ownerPhone = 'Owner phone is required';
    if (form.floor === null || form.floor === undefined || form.floor < 0)
      errors.floor = 'Floor is required (0 or more)';
    if (form.beds === null || form.beds === undefined || form.beds < 0)
      errors.beds = 'Bedrooms count is required (0 or more)';
    if (
      form.bathroom === null ||
      form.bathroom === undefined ||
      form.bathroom < 0
    )
      errors.bathroom = 'Bathrooms count is required (0 or more)';
    if (!form.features || form.features.length === 0)
      errors.features = 'At least one feature is required';
    if (!form.description.trim())
      errors.description = 'Description is required';

    const valid = Object.keys(errors).length === 0;

    return { valid, errors };
  }
}
