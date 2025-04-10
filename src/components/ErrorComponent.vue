<template>
    <div>Erreur de chargement du composant !</div>
    <button @click="emits('retry')">
        Essayer de recharger
    </button>
</template>

<script setup lang="ts">
const emits = defineEmits<{
    (event: 'retry'): void
}>()
</script>