<template>
    <article v-for="user in users" :key="user.id">
        <header>{{ user.name }}</header>
        <p>{{ user.email }}</p>
    </article>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import type { User } from './types/user';

const users = ref<User[]>([])

onMounted(async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = res.data
})
</script>