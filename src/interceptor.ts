import axios from "axios";
import { useAuthStore } from "./store/auth";

axios.interceptors.request.use((config) => {
    const { token } = useAuthStore()
    config.headers.Authorization = token
    return config
})