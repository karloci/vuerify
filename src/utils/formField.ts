export interface ValidationRule {
    rule: (value: any) => boolean;
    errorMessage: string;
}

class FormField {
    public value: any;
    public errors: string[];
    protected attribute: string|null;
    protected validationRules: ValidationRule[];

    constructor() {
        this.attribute = null;
        this.value = null;
        this.errors = [];
        this.validationRules = [];
    }

    withValue(value: any): this {
        this.value = value;
        return this;
    }
}

export default FormField;
