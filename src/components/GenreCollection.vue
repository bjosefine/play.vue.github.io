<template>
  <div>
    <div v-for="playlist in genrePlaylist.playlists.items" :key="playlist.id">
      <router-link :to="{ name: 'playlist', params: { id: playlist.id } }">
        <div class="images">
          <img :src="playlist.images[0].url" alt="Playlist cover" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import spotify from '../api/spotify'
  export default {
    name: 'GenreCollection',
    data() {
      return {
        genrePlaylist: null,
        genreName: null
      }
    },
    async created() {
      this.categoryId = this.$route.params.categoryId
      this.genrePlaylist = await spotify.getCategoryPlaylist(this.categoryId)
    }
  }
</script>

<style>
  .images img {
    margin-bottom: 100px;
  }
</style>
