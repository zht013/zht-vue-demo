import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

import { useRegisterSW } from 'virtual:pwa-register/vue'

useRegisterSW({
  immediate: true,
  // onRegistered(registration) {
  //   registration &&
  //     setInterval(() => {
  //       registration.update();
  //     }, 60 * 60 * 1000) // 1 hour;
  // },
  onRegisteredSW(swScriptUrl: string) {
    console.log('Service Worker 已注册', swScriptUrl)
  },
  onRegisterError(error) {
    console.error('Service Worker 注册错误:', error)
  },
})

const app = createApp(App)
app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')
