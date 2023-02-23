import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/HomeView.vue'
import Playlist from './components/PlayList.vue'
import PlayerView from './components/PlayerView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/playlist/:id', name: 'playlist', component: Playlist },
  { path: '/song/:id', name: 'PlayerView' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
