<template>
    <h1>Mon App</h1>
    <select v-model="extSelected">
        <option value="">Tous</option>
        <option v-for="ext in extensions">{{ ext }}</option>
    </select>
    <div :aria-busy="loading">
        <article v-for="user in usersFiltered" :key="user.id">
            <header>{{ user.name }}</header>
            <p>{{ user.email }}</p>
        </article>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useExtensionFilter } from '../composables/useExtensionFilter';
import { useFetchUsers } from '../composables/useFetchUsers';

const { users, loading, getUsers } = useFetchUsers()
const { extSelected, extensions, usersFiltered } = useExtensionFilter(users)

onMounted(async () => {
   await getUsers()
})
</script>