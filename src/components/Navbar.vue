<template>
    <h1>Mon App</h1>

    <nav>
        <ul>
            <li><router-link :to="{ name: 'home' }">Home</router-link></li>
            <li><router-link :to="{ name: 'articlesId' }">Articles</router-link></li>
        </ul>
    </nav>

    <input type="text" v-model="searchName">
    <button @click="search">Rechercher</button>
    <ul>
        <li v-for="name in firstNamesFiltered" :key="name">{{ name }}</li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { firstNamesFiltered, searchName } = storeToRefs(userStore)

function search() {

}
</script>