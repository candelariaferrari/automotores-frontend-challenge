import { AbstractControl, ValidationErrors } from '@angular/forms';
export function DateValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) return null;

  if (!/^\d{6}$/.test(value)) {
    return { invalidFormat: true };
  }

  const year = +value.substring(0, 4);
  const month = +value.substring(4, 6);

  if (month < 1 || month > 12) {
    return { invalidMonth: true };
  }

  const now = new Date();
  const inputDate = new Date(year, month - 1);

  if (inputDate > now) {
    return { futureDate: true };
  }

  return null;
}
