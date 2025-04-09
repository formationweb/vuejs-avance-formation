import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const KEY_STORAGE = 'token'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem(KEY_STORAGE))
    const emailForm = ref('')
    const passwordForm = ref('')
    const hasToken = computed(() => !!token.value)

    async function validateToken() {
        await axios.post('/api/validate', token.value)
    }

    async function login() {
        const res = await axios.post('https://reqres.in/api/login', {
            email: emailForm.value,
            password: passwordForm.value
        })
        token.value = res.data.token
        localStorage.setItem(KEY_STORAGE, token.value as string)
    }

    return {
        token,
        login,
        emailForm,
        passwordForm,
        hasToken,
        validateToken
    }
})