export default class InputValue {
    private value: string|number|boolean|null = null;
    private type: string|null = null;

    constructor() {
        return this;
    }

    stringValue(value?: string){
        if(value) this.value = value;
        this.type = "string";
        return this;
    }

    numericValue(value?: number){
        if(value) this.value = value;
        this.type = "number";
        return this;
    }

    booleanValue(value?: boolean){
        if(value) this.value = value;
        this.type = "boolean";
        return this;
    }
}