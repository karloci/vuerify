import FormField, {ValidationRule} from "../utils/formField.ts";
import Form from "../utils/form.ts";

class BaseValidator extends FormField {
    protected isNullable: boolean;

    constructor(form: Form, attribute: string = "") {
        super(form, attribute);
        this.isNullable = false;
    }

    nullable(): this {
        this.isNullable = true;
        return this;
    }

    equals(otherValue: any): this {
        this.validationRules.push({
            rule: (value: any) => value === otherValue,
            errorMessage: `Value must be equal to "${otherValue}".`,
        });
        return this;
    }

    equalsToField(otherField: string): this {
        setTimeout(() => {
            this.validationRules.push({
                rule: (value: any) => value === (this.form[otherField] as FormField).value,
                errorMessage: `Value must be equal to field "${(this.form[otherField] as FormField).attribute}".`,
            });
        }, 0);
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
