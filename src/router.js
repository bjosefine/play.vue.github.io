import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/HomeView.vue'
import Playlist from './views/PlaylistView.vue'
import AlbumView from './views/AlbumView.vue'
import PlayerView from './views/PlayerView.vue'
import ArtistView from './views/ArtistView.vue'
import SearchView from './views/SearchView.vue'
import GenreCollection from './components/GenreCollection.vue'
import CallBack from './components/CallBack.vue'
import ProfileView from './views/ProfileView.vue'
import SearchTrack from './views/SearchTrack.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/playlist/:id', name: 'playlist', component: Playlist },
  { path: '/track/:id', name: 'track', component: SearchTrack },
  { path: '/album/:id', name: 'album', component: AlbumView },
  { path: '/song/:id', name: 'PlayerView', component: PlayerView },
  { path: '/artist/:id', name: 'ArtistView', component: ArtistView },
  { path: '/search', name: 'SearchView', component: SearchView },

  {
    path: '/categories/:categoryId/playlist/:genre',
    name: 'CategoryPlaylist',
    component: GenreCollection
  },

  {
    path: '/callback',
    name: 'CallBack',
    component: CallBack
  },

  { path: '/profile', name: 'ProfileView', component: ProfileView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
