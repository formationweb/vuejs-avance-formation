<template>
    <form @submit.prevent="login">
        <label>Email</label>
        <input type="text" v-model="emailForm" name="email"> 

        <label>Mot de passe</label>
        <input type="password" v-model="passwordForm" name="password"> 

        <button>Se connecter</button>
    </form>
</template>

<script setup lang="ts">
import { useAuth } from '../composables/useAuth';

const { emailForm, passwordForm, login } = useAuth()
</script>