import { reactive } from "vue";

interface FormFields {
    [key: string]: any;
}

class Form {
    private form: FormFields;
    private url: string;
    private method: string;

    // Add an index signature to allow dynamic property assignment
    [key: string]: any;

    constructor() {
        this.form = reactive({});
        this.url = "";
        this.method = "post";
    }

    makeForm(fields: FormFields): this {
        this.form = { ...this.form, ...fields };

        for (const key in fields) {
            // Check if the property is an own property of the object (not from the prototype chain)
            if (fields.hasOwnProperty(key)) {
                // Assign the property to the class instance
                this[key] = fields[key];
            }
        }

        return this;
    }

    setMethod(method: string): this {
        this.method = method.toLowerCase();
        return this;
    }

    getForm(): FormFields {
        return this.form;
    }

    submit(): void {
        console.log(this.getForm());
    }
}

export const vuerify = new Form();
