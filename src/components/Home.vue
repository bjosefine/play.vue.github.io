<template>
  <div class="home">
    <h1>Playlists</h1>
    <div v-if="featuredPlaylists">
      <div v-for="playlist in featuredPlaylists" :key="playlist.id">
        <router-link :to="{ name: 'playlist', params: { id: playlist.id } }">
          {{ playlist.name }}
          <!-- following code line gets images for featured playlists -->
          <img :src="playlist.images[0].url" alt="" />
          <!-- end of code -->
        </router-link>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
  <NewReleases />
</template>

<script>
  import spotify from '../api/spotify.js'
  import NewReleases from './NewReleases.vue'

  export default {
    name: 'Home',
    data() {
      return {
        featuredPlaylists: null
      }
    },
    async created() {
      this.featuredPlaylists = await spotify.getFeaturedPlaylists()
    },
    components: {
      NewReleases
    }
  }
</script>
