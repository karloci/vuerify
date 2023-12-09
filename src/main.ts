import {form} from "./utils/form.ts";
import {setHost, setLocale} from "./utils/globals.ts";
import VuerifyForm from "./components/VuerifyForm.vue";
import VuerifyInput from "./components/VuerifyInput.vue";
import VuerifySelect from "./components/VuerifySelect.vue";
import VuerifyTextarea from "./components/VuerifyTextarea.vue";
import {someFunction} from "./utils/handleValidation.ts";
import {FormField} from "./utils/formField.ts";

export {form, setHost, setLocale, VuerifyForm, VuerifyInput, VuerifySelect, VuerifyTextarea, FormField, someFunction};