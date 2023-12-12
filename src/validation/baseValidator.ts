import FormField, {ValidationRule} from "../utils/formField.ts";
import Form from "../utils/form.ts";
import {nextTick} from "vue";

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

    equalsToField(otherValue: string): this {
        nextTick(() => {
            this.validationRules.push({
                rule: (value: string) => value === (this.form[otherValue] as FormField).value,
                errorMessage: `Value must be equal to "${(this.form[otherValue] as FormField).attribute}".`,
            });
        });
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
