import Validator from "./validator.ts";

type FormValue<T> = {
    value: T | null;
    required(): FormValue<T>;
    email(): FormValue<T>;
    min(length: number): FormValue<T>;
    // Add more validation methods as needed
};

type FormObject<T> = {
    [K in keyof T]: FormValue<T[K]>;
};

type Form<T> = {
    [K in keyof T]: T[K];
};

export function use<T>(formObject: FormObject<T>): Form<T> {
    // Logic to handle the form object and set up the form
    const form: Form<T> = {} as Form<T>;

    for (const key in formObject) {
        if (Object.prototype.hasOwnProperty.call(formObject, key)) {
            const formValue = formObject[key];

            Object.defineProperty(form, key, {
                get() {
                    return formValue.value;
                },
            });
        }
    }

    return form;
}

export function input<T>(): Validator {
    return new Validator();
}