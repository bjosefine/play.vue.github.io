import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'

createApp(App).use(router).mount('#app')
