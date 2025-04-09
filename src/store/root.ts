import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useAuthStore } from "./auth";
import { computed } from "vue";

export const userRootStore = defineStore('root', () => {
    const userStore = useUserStore()
    const authStore = useAuthStore()

    async function initialize() {
        await authStore.validateToken()
        const me = await userStore.me()
        // uiStore.setTheme(me.theme)
        // uiStore.setLang(me.lang)
    }

    return {
        initialize
    }
})