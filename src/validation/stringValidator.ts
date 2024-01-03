import BaseValidator from "./baseValidator";
import Form from "../utils/form";
import Translator from "../localization/translator";

class StringValidator extends BaseValidator {
    constructor(form: Form, attribute: string = "") {
        super(form, attribute);
        if (this.isNullable && this.value !== null) {
            this.validationRules.push({
                rule: (value) => typeof value === 'string',
                errorMessage: Translator.translate("string", {attribute: this.attribute}),
            });
        }
    }

    required(): this {
        this.validationRules.push({
            rule: (value: any) => value !== null && value !== undefined && value !== "",
            errorMessage: Translator.translate("required", {attribute: this.attribute}),
        });
        return this;
    }

    min(minLength: number): this {
        this.validationRules.push({
            rule: (value: string) => value?.length >= minLength,
            errorMessage: Translator.translate("min.string", {attribute: this.attribute, min: minLength}),
        });
        return this;
    }

    max(maxLength: number): this {
        this.validationRules.push({
            rule: (value: string) => value?.length <= maxLength,
            errorMessage: Translator.translate("max.string", {attribute: this.attribute, max: maxLength}),
        });
        return this;
    }

    contains(substring: string): this {
        this.validationRules.push({
            rule: (value: string) => value?.includes(substring),
            errorMessage: `Value must contain "${substring}".`,
        });
        return this;
    }

    email(): this {
        this.validationRules.push({
            rule: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            errorMessage: Translator.translate("email", {attribute: this.attribute}),
        });
        return this;
    }

    startsWith(prefix: string): this {
        this.validationRules.push({
            rule: (value: string) => value?.startsWith(prefix),
            errorMessage: Translator.translate("starts_with", {attribute: this.attribute, values: prefix}),
        });
        return this;
    }

    endsWith(suffix: string): this {
        this.validationRules.push({
            rule: (value: string) => value?.endsWith(suffix),
            errorMessage: Translator.translate("ends_with", {attribute: this.attribute, values: suffix}),
        });
        return this;
    }

    doesntStartWith(prefix: string): this {
        this.validationRules.push({
            rule: (value: string) => !value?.startsWith(prefix),
            errorMessage: Translator.translate("doesnt_start_with", {attribute: this.attribute, values: prefix}),
        });
        return this;
    }

    doesntEndWith(suffix: string): this {
        this.validationRules.push({
            rule: (value: string) => !value?.endsWith(suffix),
            errorMessage: Translator.translate("doesnt_end_with", {attribute: this.attribute, values: suffix}),
        });
        return this;
    }
}

export default StringValidator;