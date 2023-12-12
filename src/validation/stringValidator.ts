import BaseValidator from "./baseValidator.ts";

class StringValidator extends BaseValidator {
    constructor() {
        super();
        this.validationRules.push({
            rule: (value) => value !== null && value !== undefined && value !== "" && typeof value === 'string',
            errorMessage: 'Value must be a string.',
        });
    }

    required(): this {
        this.validationRules.push({
            rule: (value) => value !== null && value !== undefined && value !== "",
            errorMessage: "This field is required.",
        });
        return this;
    }
}

export default StringValidator;