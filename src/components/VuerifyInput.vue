<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {FormField} from "../utils/formField.ts";

defineProps<{
    type?: string | undefined,
    field: FormField;
}>();

defineEmits(['update:modelValue']);

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (input.value?.hasAttribute('autofocus')) {
        input.value?.focus();
    }
});

defineExpose({focus: () => input.value?.focus()});
</script>

<template>
    <div class="field">
        <input v-bind="{ ...$attrs }"
               spellcheck="false"
               autocomplete="off"
               class="input"
               :class="{ 'error': field.errors?.length > 0 }"
               :type="type ?? 'text'"
               v-model="field.value"
               @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
               ref="input"/>
        <div class="input-error" v-if="field.errors?.length > 0">{{ field.errors }}</div>
    </div>
</template>

<style scoped>

</style>