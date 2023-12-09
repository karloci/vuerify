export class FormField {
    attribute: string;
    value: any;
    errors: string[];
    private isRequired = false;
    private isNullable = false;

    constructor() {
        this.attribute = "";
        this.value = null;
        this.errors = [];
    }

    attributeName(attribute: string){
        this.attribute = attribute;
        return this;
    }

    withValue(value: any): this {
        this.value = value;
        return this;
    }

    required(): this {
        this.isRequired = true;
        return this;
    }

    nullable(): this {
        this.isNullable = true;
        return this;
    }
}
