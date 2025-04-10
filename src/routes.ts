import { createRouter, createWebHistory } from "vue-router";
import Users from "./components/Users.vue";
import Login from "./pages/Login.vue";
import { useAuthStore } from "./store/auth";
import Main from "./layouts/Main.vue";
import { defineAsyncComponent } from "vue";
import UsersDemo from "./components/UsersDemo.vue";
import ImageDemo from "./components/ImageDemo.vue";

const AsyncArticles = defineAsyncComponent(() => import('./pages/Articles.vue'))

export const routes = [
     {
        path: '',
        component: Main,
        meta: {
         requiredAuth: true
        },
        children: [
          {
            path: '',
            component: Users,
            name: 'home'
          },
          {
            path: 'articles',
            component: AsyncArticles,
            name: 'articlesId'
          }
        ]
     },
     {
        path: '/login',
        component: Login,
        name: 'loginId'
     },
     {
      path: '/users-demo',
      component: UsersDemo
     },
     {
      path: '/image-demo',
      component: ImageDemo
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