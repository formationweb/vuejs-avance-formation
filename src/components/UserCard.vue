<template>
    <article>
        <header id="entete">{{ user.name }}</header>
        <p>{{ user.email }}</p>
        <button @click="emits('onDelete', user.id)">Supprimer</button>
        <footer>
            <input type="checkbox" v-model="isActive">
            <slot :isActive v-bind="user"></slot>
        </footer>
    </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '../types/user';

const isActive = ref(true)

defineProps<{
    user: User
}>()

const emits = defineEmits<{
    onDelete: [number]
}>()
</script>