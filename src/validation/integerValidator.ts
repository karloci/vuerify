import BaseValidator from "./baseValidator.ts";

class IntegerValidator extends BaseValidator {
    constructor(attribute?: string) {
        super(attribute);
        this.validationRules.push({
            rule: (value: any) => {
                const intValue = parseInt(value, 10);
                return !isNaN(intValue) && Number.isInteger(intValue) && value.trim() === intValue.toString();
            },
            errorMessage: 'Value must be an integer.',
        });
    }

    required(): this {
        this.validationRules.push({
            rule: (value: any) => value !== null && value !== undefined,
            errorMessage: "This field is required.",
        });
        return this;
    }

    equals(compareValue: number): this {
        this.validationRules.push({
            rule: (value: number) => value === compareValue,
            errorMessage: `Value must be equal to ${compareValue}.`,
        });
        return this;
    }

    min(minValue: number): this {
        this.validationRules.push({
            rule: (value: number) => value >= minValue,
            errorMessage: `Value must be greater than or equal to ${minValue}.`,
        });
        return this;
    }

    max(maxValue: number): this {
        this.validationRules.push({
            rule: (value: number) => value <= maxValue,
            errorMessage: `Value must be less than or equal to ${maxValue}.`,
        });
        return this;
    }

    greaterThan(threshold: number): this {
        this.validationRules.push({
            rule: (value: number) => value > threshold,
            errorMessage: `Value must be greater than ${threshold}.`,
        });
        return this;
    }

    lessThan(threshold: number): this {
        this.validationRules.push({
            rule: (value: number) => value < threshold,
            errorMessage: `Value must be less than ${threshold}.`,
        });
        return this;
    }

    nonZero(): this {
        this.validationRules.push({
            rule: (value: number) => value !== 0,
            errorMessage: 'Value must be non-zero.',
        });
        return this;
    }

    between(minValue: number, maxValue: number): this {
        this.validationRules.push({
            rule: (value: number) => value >= minValue && value <= maxValue,
            errorMessage: `Value must be between ${minValue} and ${maxValue}.`,
        });
        return this;
    }

    minDigits(minDigits: number): this {
        this.validationRules.push({
            rule: (value: number) => value.toString().length >= minDigits,
            errorMessage: `Value must have at least ${minDigits} digits.`,
        });
        return this;
    }

    maxDigits(maxDigits: number): this {
        this.validationRules.push({
            rule: (value: number) => value.toString().length <= maxDigits,
            errorMessage: `Value must have at most ${maxDigits} digits.`,
        });
        return this;
    }
}

export default IntegerValidator;