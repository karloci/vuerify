import FormField, {ValidationRule} from "../utils/formField.ts";

class BaseValidator extends FormField {
    constructor() {
        super();
        this.attribute = "";
        this.value = null;
        this.errors = [];
        this.validationRules = [];
    }

    withValue(value: any): this {
        this.value = value;
        return this;
    }

    attributeName(attribute: string){
        this.attribute = attribute;
        return this;
    }

    customRule(rule: ValidationRule): this {
        this.validationRules.push(rule);
        return this;
    }

    validate(): void {
        this.errors = [];
        this.validationRules.forEach((rule) => {
            if (!rule.rule(this.value)) {
                this.errors.push(rule.errorMessage);
            }
        });
    }
}

export default BaseValidator;
