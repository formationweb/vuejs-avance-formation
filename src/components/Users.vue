<template>
    <h2>Ajouter un utilisateur</h2>

    <router-link :to="{ name: 'home' }">Home</router-link>

    <form @submit.prevent="createUser">
        <label>Email</label>
        <input type="text" v-model="email" v-bind="emailAttrs">
         <div v-if="isSubmitting">
            {{ errors.email }}
         </div>

        <label>Nom</label>
        <input type="text" v-model="name" v-bind="nameAttrs">
        <div v-if="isSubmitting">
            {{ errors.name }}
        </div>

        <button>Créer</button>
    </form>

    <div v-for="history in userStore.$history">
        {{ history.storeId  }} - {{ history.timestamp  }}
    </div>

    <select v-model="extSelected">
        <option value="">Tous</option>
        <option v-for="ext in extensions">{{ ext }}</option>
    </select>
    <div :aria-busy="loading">
        <UserCard v-for="user in usersFiltered" :key="user.id" :user="user" @on-delete="userStore.deleteUser">
            <template #default="{ name, isActive }">
                L'utilisateur {{  name }}  est {{ isActive  }}
            </template>
        </UserCard>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useExtensionFilter } from '../composables/useExtensionFilter';
import UserCard from './UserCard.vue';
import { useUserStore, type UserPayload } from '../store/user';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';

const userStore = useUserStore()
const { usersSearched, loading } = storeToRefs(userStore)
const { extSelected, extensions, usersFiltered } = useExtensionFilter(usersSearched)

console.log(userStore.$history)

const isSubmitting = ref(false)
const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: object({
        email: string().email('Email invalide').required(),
        name: string().required()
    })
})

const [email, emailAttrs] = defineField('email')
const [name, nameAttrs] = defineField('name')

const createUser = handleSubmit(async (values) => {
    await userStore.createUser(values as UserPayload)
    resetForm()
    isSubmitting.value = false
    userStore.$clearHistory()
}, () => {
    isSubmitting.value = true
})

onMounted(async () => {
   await userStore.getUsers()
})
</script>