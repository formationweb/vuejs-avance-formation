<template>
    <article>
        <header id="entete">{{ user.name }}</header>
        <p>{{ user.email }}</p>
        <button @click="emits('onDelete', user.id)">Supprimer</button>
    </article>
</template>

<script setup lang="ts">
import type { User } from '../types/user';

defineProps<{
    user: User
}>()

const emits = defineEmits<{
    onDelete: [number]
}>()
</script>