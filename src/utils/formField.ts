interface ValidationRule {
    rule: (value: any) => boolean;
    errorMessage: string;
}

export class FormField {
    attribute: string;
    value: any;
    errors: string[];
    private readonly validationRules: ValidationRule[];

    constructor() {
        this.attribute = "";
        this.value = null;
        this.errors = [];
        this.validationRules = [];
    }

    attributeName(attribute: string){
        this.attribute = attribute;
        return this;
    }

    withValue(value: any): this {
        this.value = value;
        return this;
    }

    required(): this {
        this.validationRules.push({
            rule: (value) => value !== null && value !== undefined && value !== "",
            errorMessage: "This field is required.",
        });
        return this;
    }

    nullable(): this {
        return this;
    }

    customRule(rule: ValidationRule): this {
        this.validationRules.push(rule);
        return this;
    }

    validate(): void {
        this.errors = [];
        for (const rule of this.validationRules) {
            if (!rule.rule(this.value)) {
                this.errors.push(rule.errorMessage);
            }
        }
    }
}
