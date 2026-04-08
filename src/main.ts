import './assets/main.css'
import './i18n/index'
// Dependencies
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
// Project files
import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.use(VueQueryPlugin, {
  enableDevtoolsV6Plugin: true,
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 60 * 24 * 30,
      },
    },
  },
})
app.use(createPinia())
app.use(router)

app.mount('#app')
