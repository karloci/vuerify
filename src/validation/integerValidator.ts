import BaseValidator from "./baseValidator.ts";
import Form from "../utils/form.ts";
import Translator from "../localization/translator.ts";

class IntegerValidator extends BaseValidator {
    constructor(form: Form, attribute: string = "") {
        super(form, attribute);
        this.validationRules.push({
            rule: (value: any) => {
                const intValue = parseInt(value, 10);
                return !isNaN(intValue) && Number.isInteger(intValue) && value?.trim() === intValue.toString();
            },
            errorMessage: Translator.translate("integer", {attribute: this.attribute}),
        });
    }

    required(): this {
        this.validationRules.push({
            rule: (value: any) => value !== null && value !== undefined,
            errorMessage: Translator.translate("required", {attribute: this.attribute}),
        });
        return this;
    }

    min(minValue: number): this {
        this.validationRules.push({
            rule: (value: number) => value >= minValue,
            errorMessage: Translator.translate("min.string", {attribute: this.attribute, min: minValue}),
        });
        return this;
    }

    max(maxValue: number): this {
        this.validationRules.push({
            rule: (value: number) => value <= maxValue,
            errorMessage: Translator.translate("max.string", {attribute: this.attribute, max: maxValue}),
        });
        return this;
    }

    greaterThan(threshold: number): this {
        this.validationRules.push({
            rule: (value: number) => value > threshold,
            errorMessage: Translator.translate("gt.numeric", {attribute: this.attribute, max: threshold}),
        });
        return this;
    }

    lessThan(threshold: number): this {
        this.validationRules.push({
            rule: (value: number) => value < threshold,
            errorMessage: Translator.translate("lt.numeric", {attribute: this.attribute, max: threshold}),
        });
        return this;
    }

    between(minValue: number, maxValue: number): this {
        this.validationRules.push({
            rule: (value: number) => value >= minValue && value <= maxValue,
            errorMessage: Translator.translate("between.numeric", {
                attribute: this.attribute,
                min: minValue,
                max: maxValue
            }),
        });
        return this;
    }

    minDigits(minDigits: number): this {
        this.validationRules.push({
            rule: (value: number) => value?.toString().length >= minDigits,
            errorMessage: Translator.translate("min_digits", {attribute: this.attribute, min: minDigits}),
        });
        return this;
    }

    maxDigits(maxDigits: number): this {
        this.validationRules.push({
            rule: (value: number) => value?.toString().length <= maxDigits,
            errorMessage: Translator.translate("max_digits", {attribute: this.attribute, max: maxDigits}),
        });
        return this;
    }
}

export default IntegerValidator;