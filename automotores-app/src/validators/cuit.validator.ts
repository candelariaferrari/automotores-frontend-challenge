import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cuitValidator(control: AbstractControl): ValidationErrors | null {
  const cuit = control.value;

  if (!cuit) return null;

  if (!/^\d{11}$/.test(cuit)) {
    return { invalidFormat: true };
  }

  const digits = cuit.split('').map(Number);

  const multipliers = [5,4,3,2,7,6,5,4,3,2];

  const sum = multipliers.reduce((acc, mult, i) => acc + mult * digits[i], 0);

  const mod11 = 11 - (sum % 11);

  const checkDigit = mod11 === 11 ? 0 : mod11 === 10 ? 9 : mod11;

  if (checkDigit !== digits[10]) {
    return { invalidCuit: true };
  }

  return null;
}
