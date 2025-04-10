<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DataTable from './DataTable.vue';
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';
import type { User } from '../types/user';

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
const columns = ref([{
    key: 'name',
    label: 'Nom'
}, {
    key: 'email',
    label: 'Email'
}, {
    key: 'action',
    label: 'Action'
}])

function deleteUser(user: User, index: number) {

}
</script>

<template>
    <DataTable :columns="columns" :items="users">
        <template #email="{ item }">
            <span class="red">{{ item.email }}</span>
        </template>

        <template #action="{ item, index }">
           <button @click="deleteUser(item.id, index)">Supprimer</button>
        </template>

        <template #footer>
            <button>Ajouter un utilisateur</button>
        </template>

        <template #empty>
                aa
        </template>
    </DataTable>
</template>

<style>
.red {
    color: red;
}
</style>