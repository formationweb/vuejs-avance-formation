import { createRouter, createWebHistory } from "vue-router";
import Users from "./components/Users.vue";
import Login from "./pages/Login.vue";
import { useAuth } from "./composables/useAuth";

export const routes = [
     {
        path: '',
        component: Users,
        name: 'home',
        meta: {
         requiredAuth: true
        }
     },
     {
        path: '/login',
        component: Login,
        name: 'loginId'
     }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
   const { token } = useAuth()
   if (to.meta.requiredAuth && !token.value) {
      next({
         name: 'loginId'
      })
      return
   }
   next()
})