<template>
    <div class="home">
      <h1>Playlists</h1>
      <div v-if="featuredPlaylists">
        <div v-for="playlist in featuredPlaylists" :key="playlist.id">
          <router-link :to="{ name: 'playlist', params: { id: playlist.id }}">
            {{ playlist.name }}
          </router-link>
        </div>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </template>
  
  <script>
  import spotify from '../api/spotify.js'
  
  export default {
    name: "Home",
    data() {
      return {
        featuredPlaylists: null,
      };
    },
    async created() {

      this.featuredPlaylists = await spotify.getFeaturedPlaylists();
      console.log(featuredPlaylists)
    },
  };
  </script>
  