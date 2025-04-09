import axios from "axios";
import { useAuth } from "./composables/useAuth";

axios.interceptors.request.use((config) => {
    const { token } = useAuth()
    config.headers.Authorization = token.value
    return config
})