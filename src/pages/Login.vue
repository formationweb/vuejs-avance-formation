<template>
    <form @submit.prevent="onLogin">
        <label>Email</label>
        <input type="text" v-model="emailForm" name="email"> 

        <label>Mot de passe</label>
        <input type="password" v-model="passwordForm" name="password"> 

        <button>Se connecter</button>
    </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const { emailForm, passwordForm, login } = useAuth()
const router = useRouter()

async function onLogin() {
    await login()
    router.push('/')
}
</script>