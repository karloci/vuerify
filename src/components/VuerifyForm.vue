<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {globals} from "../utils/globals";

const apiUrl = ref(globals.host || '');

onMounted(() => {
    console.log('Component mounted!');
});
</script>

<template>
    <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur corporis dicta dignissimos dolorem ex
            expedita iusto, laboriosam molestiae non obcaecati odio officiis optio porro quia quibusdam quidem quod
            repudiandae sit?</p>
        <h2>Test</h2>
        <div>
            <slot/>
        </div>
        <p>API URL: {{ apiUrl }}</p>
    </div>
</template>

<style scoped>
/* Your component styles */
</style>
