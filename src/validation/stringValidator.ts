import BaseValidator from "./baseValidator.ts";

class StringValidator extends BaseValidator {
    constructor(attribute?: string) {
        super(attribute);
        if(!this.isNullable){
            this.value = "";
        }
        this.validationRules.push({
            rule: (value) => typeof value === 'string',
            errorMessage: 'Value must be a string.',
        });
    }

    required(): this {
        this.validationRules.push({
            rule: (value: any) => value !== null && value !== undefined && value !== "",
            errorMessage: "This field is required.",
        });
        return this;
    }

    equals(otherValue: string): this {
        this.validationRules.push({
            rule: (value: string) => value === otherValue,
            errorMessage: `Value must be equal to "${otherValue}".`,
        });
        return this;
    }

    min(minLength: number): this {
        this.validationRules.push({
            rule: (value: string) => value.length >= minLength,
            errorMessage: `Minimum length must be ${minLength}.`,
        });
        return this;
    }

    max(maxLength: number): this {
        this.validationRules.push({
            rule: (value: string) => value.length <= maxLength,
            errorMessage: `Maximum length must be ${maxLength}.`,
        });
        return this;
    }

    contains(substring: string): this {
        this.validationRules.push({
            rule: (value: string) => value.includes(substring),
            errorMessage: `Value must contain "${substring}".`,
        });
        return this;
    }

    email(): this {
        this.validationRules.push({
            rule: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            errorMessage: 'Invalid email format.',
        });
        return this;
    }

    startsWith(prefix: string): this {
        this.validationRules.push({
            rule: (value: string) => value.startsWith(prefix),
            errorMessage: `Value must start with "${prefix}".`,
        });
        return this;
    }

    endsWith(suffix: string): this {
        this.validationRules.push({
            rule: (value: string) => value.endsWith(suffix),
            errorMessage: `Value must end with "${suffix}".`,
        });
        return this;
    }

    doesntStartWith(prefix: string): this {
        this.validationRules.push({
            rule: (value: string) => !value.startsWith(prefix),
            errorMessage: `Value must not start with "${prefix}".`,
        });
        return this;
    }

    doesntEndWith(suffix: string): this {
        this.validationRules.push({
            rule: (value: string) => !value.endsWith(suffix),
            errorMessage: `Value must not end with "${suffix}".`,
        });
        return this;
    }
}

export default StringValidator;