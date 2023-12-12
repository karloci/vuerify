export interface ValidationRule {
    rule: (value: any) => boolean;
    errorMessage: string;
}

class FormField {
    public value: any;
    public errors: string[];
    protected attribute: string;
    protected validationRules: ValidationRule[];

    constructor() {
        this.attribute = "";
        this.value = null;
        this.errors = [];
        this.validationRules = [];
    }
}

export default FormField;
