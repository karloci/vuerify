import Form from "./form.ts";
import {toRaw} from "vue";

export interface ValidationRule {
    rule: (value: any) => boolean;
    errorMessage: string;
}

class FormField {
    public form: Form = new Form();
    public value: any = null;
    public errors: string[] = [];
    public attribute: string = "";
    protected validationRules: ValidationRule[] = [];

    constructor(form: Form, attribute: string = "") {
        this.form = toRaw(form);
        this.attribute = attribute;
    }

    withValue(value: any): this {
        this.value = value;
        return this;
    }
}

export default FormField;
