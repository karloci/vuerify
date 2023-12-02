export default class ValidationRules {
    private value: string|number|boolean|null = null;

    constructor() {
        this.value = "karlo";
        return this;
    }

    withValue(value?: string|number|boolean) {
        console.log("withValue");
        if(value) {
            this.value = value;
        }
        return this;
    }

    required(){
        console.log("required");
        return this;
    }
}