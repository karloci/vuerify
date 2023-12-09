import {FormField} from "./formField.ts";

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

    input(): FormField {
        return new FormField();
    }

    setMethod(method: string): this {
        this.formMethod = method.toLowerCase();
        return this;
    }

    getFields(): DynamicObject {
        const result: DynamicObject = {};
        this.fields.forEach((key: string) => {
            if (this[key] instanceof FormField) {
                result[key] = this[key].value;
            }
        });
        return result;
    }

    submit(): void {
        console.log(this.getFields());
    }
}

export const form = new Form();
