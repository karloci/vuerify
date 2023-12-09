<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {FormField} from "../utils/formField.ts";

defineProps<{
    type?: string | undefined,
    field: FormField;
}>();

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (input.value?.hasAttribute('autofocus')) {
        input.value?.focus();
    }
});

defineExpose({focus: () => input.value?.focus()});

defineOptions({
    inheritAttrs: false
});
</script>

<template>
    <div class="field">
        <input v-bind="{ ...$attrs }"
               :type="type ?? 'text'"
               :class="{ 'invalid-input': field.errors?.length > 0 }"
               v-model="field.value"
               ref="input"/>
        <div class="input-errors" v-if="field.errors?.length > 0">{{ field.errors }}</div>
    </div>
</template>

<style scoped>

</style>