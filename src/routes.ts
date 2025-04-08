import { createRouter, createWebHistory } from "vue-router";
import Users from "./components/Users.vue";
import Login from "./pages/Login.vue";

export const routes = [
     {
        path: '',
        component: Users
     },
     {
        path: '/login',
        component: Login
     }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})