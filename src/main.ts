import '@picocss/pico/css/pico.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'
import './interceptor'
import { createPinia } from 'pinia'
import { piniaLogger } from './store/plugins/logger'
import { piniaPersist } from './store/plugins/persist'

const pinia = createPinia()
pinia.use(piniaLogger())
pinia.use(piniaPersist({
    include: ['user']
}))

const app = createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')
