import axios from "axios"
import { ref } from "vue"
import type { User } from "../types/user"

export function useFetchUsers() {
    const users = ref<User[]>([])
    const loading = ref(false)

    async function getUsers() {
        try {
            loading.value = true
            const res = await axios.get('https://jsonplaceholder.typicode.com/users')
            users.value = res.data
        }
        catch (err) {
            // gérer le cas d'erreur
        }
        finally {
            loading.value = false
        }
    }

    return {
        users,
        loading,
        getUsers
    }
}