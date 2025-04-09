<template>
    <h1>Mon App</h1>

    <input type="text">
    <button>Rechercher</button>

    <ul>
        <li v-for="name in firstNames" :key="name">{{ name }}</li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const firstNames = ref(['ana', 'ben', 'jim'])
</script>