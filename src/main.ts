import '@picocss/pico/css/pico.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'
import './interceptor'

const app = createApp(App)
app.use(router)
app.mount('#app')
