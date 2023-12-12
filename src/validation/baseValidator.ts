import FormField, {ValidationRule} from "../utils/formField.ts";

class BaseValidator extends FormField {
    protected isNullable: boolean;

    constructor(attribute?: string) {
        super();
        if(attribute){
            this.attribute = attribute;
        }
        this.isNullable = false;
    }

    nullable(): this {
        this.isNullable = true;
        return this;
    }

    customRule(rule: ValidationRule): this {
        this.validationRules.push(rule);
        return this;
    }

    private validate(): void {
        this.errors = [];
        this.validationRules.forEach((rule) => {
            if (!rule.rule(this.value)) {
                this.errors.push(rule.errorMessage);
            }
        });
    }
}

export default BaseValidator;
