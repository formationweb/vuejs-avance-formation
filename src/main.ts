import '@picocss/pico/css/pico.min.css'
import './styles.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'
import './interceptor'
import { createPinia } from 'pinia'
import { piniaLogger } from './store/plugins/logger'
import { piniaPersist } from './store/plugins/persist'
import { confirmDirective } from './directives/confirm'
import { tooltip } from './directives/tooltip'
import { lazyLoad } from './directives/lazyload'

const pinia = createPinia()
pinia.use(piniaLogger())
pinia.use(piniaPersist({
    include: ['user']
}))

const app = createApp(App)
app.use(router)
app.use(pinia)

app.directive('confirm', confirmDirective)
app.directive('tooltip', tooltip)
app.directive('lazyload', lazyLoad)

app.mount('#app')
