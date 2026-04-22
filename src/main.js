import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { IonicVue } from '@ionic/vue'

import '@ionic/vue/css/core.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(IonicVue)

app.mount('#app')
