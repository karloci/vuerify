import {reactive} from "vue";
import FormField from "./formField";
import StringValidator from "../validation/stringValidator";
import BaseValidator from "../validation/baseValidator";
import IntegerValidator from "../validation/integerValidator";
import { globals } from "./globals";

interface DynamicObject {
    [key: string]: any;
} 

class Form {
    public processing: boolean = false;
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
            }
        }

        return this;
    }

    string(attribute?: string): StringValidator {
        return new StringValidator(this, attribute);
    }

    integer(attribute?: string): IntegerValidator {
        return new IntegerValidator(this, attribute);
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

    getValues(): DynamicObject {
        const result: DynamicObject = {};
        this.fields.forEach((key: string) => {
            if (this[key] instanceof FormField) {
                result[key] = this[key].value;
            }
        });
        return result;
    }

    validate(): boolean {
        let isValid = true;
        this.fields.forEach((key: string) => {
            if (this[key] instanceof BaseValidator) {
                this[key].validate();
                if (this[key].errors.length > 0) {
                    isValid = false;
                }
            }
        });
        return isValid;
    }

    submit(): Promise<DynamicObject> {
        this.processing = true;
        return new Promise((resolve, reject) => {
            if (this.validate()) {
                const url = globals.host + this.formUrl;
        
                fetch(url, {
                    method: this.formMethod,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify(this.getValues()),
                })
                .then((response) => {
                    if (response.ok) {
                        resolve(response.json() as DynamicObject);
                    } else {
                        reject(new Error(`Failed to submit form. Status: ${response.status}`));
                    }
                })
                .catch((error) => {
                    reject(error);
                }).finally(() => {
                    this.processing = false;
                });
            } else {
                this.processing = false;
                reject("Form validation failed.");
            }
        });
    }
      
}

export default Form;

export const form = reactive(new Form());
