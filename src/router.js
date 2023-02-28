import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/HomeView.vue'
import Playlist from './views/PlaylistView.vue'
import AlbumView from './views/AlbumView.vue'
import ArtistView from './views/ArtistView.vue'
import Search from './views/Search.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/playlist/:id', name: 'playlist', component: Playlist },
  { path: '/album/:id', name: 'album', component: AlbumView },
  { path: '/artist/:id', name: 'ArtistView', component: ArtistView },
  { path: '/search', name: 'search', component: Search }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
