import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import Vue3TouchEvents from 'vue3-touch-events'

createApp(App).use(router).use(Vue3TouchEvents).mount('#app')
