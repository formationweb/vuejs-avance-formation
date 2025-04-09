import axios from "axios";
import { ref } from "vue";

const KEY_STORAGE = 'token'

export function useAuth() {
    const token = ref(localStorage.getItem(KEY_STORAGE))
    const emailForm = ref('')
    const passwordForm = ref('')

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
        passwordForm
    }
}