import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

app.config.errorHandler = (err, _, info) => {
  console.error(`[Global Error] ${info}:`, err)
}

app.mount('#app')
