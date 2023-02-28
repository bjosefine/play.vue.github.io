<!-- Component that shows tracks on a specific album -->
<template>
  <h1>Tjena</h1>
</template>

<script>
  import spotify from '../api/spotify.js'

  export default {
    data() {
      return {
        albumTracks: null
      }
    },

    async created() {
      const albumId = this.$route.params.id
      this.albumTracks = await spotify.getAlbumTracks(albumId)
    }
  }
</script>
