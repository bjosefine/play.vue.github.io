import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/HomeView.vue'
import Playlist from './components/PlayList.vue'
import AlbumView from './components/AlbumView.vue'
import PlayerView from './components/PlayerView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/playlist/:id', name: 'playlist', component: Playlist },
  { path: '/album/:id', name: 'album', component: AlbumView },
  { path: '/song/:id', name: 'PlayerView', component: PlayerView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
