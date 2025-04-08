<template>
    <h1>Mon App</h1>
    <select v-model="extSelected">
        <option value="">Tous</option>
        <option v-for="ext in extensions">{{ ext }}</option>
    </select>
    <div :aria-busy="loading">
        <UserCard v-for="user in usersFiltered" :key="user.id" :user="user" />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useExtensionFilter } from '../composables/useExtensionFilter';
import { useFetchUsers } from '../composables/useFetchUsers';
import UserCard from './UserCard.vue';

const { users, loading, getUsers } = useFetchUsers()
const { extSelected, extensions, usersFiltered } = useExtensionFilter(users)

onMounted(async () => {
   await getUsers()
})
</script>