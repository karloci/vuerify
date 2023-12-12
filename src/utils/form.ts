import {reactive} from "vue";
import FormField from "./formField.ts";
import StringValidator from "../validation/stringValidator.ts";

interface DynamicObject {
    [key: string]: any;
}

class Form {
    private formUrl: string;
    private formMethod: string;
    private readonly fields: string[];
    [key: string]: any;

    constructor() {
        this.formUrl = "";
        this.formMethod = "get";
        this.fields = [];
    }

    setUrl(url: string): this {
        this.formUrl = url.toLowerCase();
        return this;
    }

    setMethod(method: string): this {
        this.formMethod = method.toLowerCase();
        return this;
    }

    makeForm(data: DynamicObject): this {
        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key] instanceof FormField) {
                this.fields.push(key);
                this[key] = data[key] as FormField;
                this[key].attributeName(key);
            }
        }

        return this;
    }

    string(): StringValidator {
        return new StringValidator();
    }

    getFields(): DynamicObject {
        const result: DynamicObject = {};
        this.fields.forEach((key: string) => {
            if (this[key] instanceof FormField) {
                result[key] = this[key];
            }
        });
        return result;
    }

    validate(): boolean {
        let isValid = true;
        this.fields.forEach((key: string) => {
            if (this[key] instanceof FormField) {
                this[key].validate();
                if (this[key].errors.length > 0) {
                    isValid = false;
                }
            }
        });
        return isValid;
    }

    submit(): void {
        if (this.validate()) {
            console.log(this.getFields());
        } else {
            console.log("Form validation failed.");
        }
        console.log(this.getFields());
    }
}

export const form = reactive(new Form());
