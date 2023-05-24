import { AbstractControl } from '@angular/forms';

const PHONE_REGEX = /^[0-9]*$/;

export function phoneValidator(phoneNum: string) {

    return function (form: AbstractControl) {
        const phoneNumValue = form.get(phoneNum)?.value;

        const valid = PHONE_REGEX.test(phoneNumValue);
        if (PHONE_REGEX.test(phoneNumValue)) {
            return null
        } else {
            return { 'invalidPhone': true };
        }
    }
}
