import { AbstractControl } from '@angular/forms';

export function matchPasswordValidator(
  password: string,
  passwordConfirm: string
) {
  return function (form: AbstractControl) {
    const passwordValue = form.get(password)?.value;
    const confirmPasswordValue = form.get(passwordConfirm)?.value;

    if (passwordValue === confirmPasswordValue) {
      return null;
    }
    return { passwordMismatch: true };
  };
}
