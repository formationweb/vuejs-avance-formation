<template>
    <article>
        <slot name="header"></slot>
        <header id="entete">{{ user.name }}</header>
        <p>{{ user.email }}</p>
        <button v-confirm="{
            message: 'Etes vous ...',
            onConfirm: () => emits('onDelete', user.id)
        }" v-tooltip="'Faire une suppression'">Supprimer</button>
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