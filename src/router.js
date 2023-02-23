import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/HomeView.vue'
import Playlist from './components/PlayList.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/playlist/:id', name: 'playlist', component: Playlist }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
