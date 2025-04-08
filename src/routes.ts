import { createRouter, createWebHistory } from "vue-router";
import Users from "./components/Users.vue";

export const routes = [
     {
        path: '',
        component: Users
     }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})