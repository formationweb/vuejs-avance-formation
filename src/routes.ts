import { createRouter, createWebHistory } from "vue-router";
import Users from "./components/Users.vue";
import Login from "./pages/Login.vue";
import { useAuthStore } from "./store/auth";
import Main from "./layouts/Main.vue";

export const routes = [
     {
        path: '',
        component: Main,
        name: 'home',
        meta: {
         requiredAuth: true
        },
        children: [
          {
            path: '',
            component: Users
          }
        ]
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
   const { hasToken } = useAuthStore()
   if (to.meta.requiredAuth && !hasToken) {
      next({
         name: 'loginId'
      })
      return
   }
   next()
})