import axios from "axios";
import { ref } from "vue";

export function useAuth() {
    const token = ref('')
    const emailForm = ref('')
    const passwordForm = ref('')

    async function login() {
        const res = await axios.post('https://reqres.in/api/login', {
            email: emailForm.value,
            password: passwordForm.value
        })
        token.value = res.data.token
    }

    return {
        token,
        login,
        emailForm,
        passwordForm
    }
}