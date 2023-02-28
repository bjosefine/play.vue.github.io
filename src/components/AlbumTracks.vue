<!-- Component that shows tracks on a specific album -->
<template>
  <div>
    <!-- For-loop to loop the track names -->
    <div v-for="track in albumTracks" :key="track.id">
      <h5>Track name: {{ track.name }}</h5>
      <!-- For-loop inside previous loop to get the artist names -->
      <div v-for="artist in track.artists" :key="artist.id">
        <h5>Artist name: {{ artist.name }}</h5>
      </div>
    </div>
    <img
      v-if="albumImages"
      :src="albumImages.images[0].url"
      alt="Album cover"
    />
  </div>
</template>

<script>
  import spotify from '../api/spotify.js'

  export default {
    data() {
      return {
        albumTracks: null,
        albumImages: null
      }
    },

    async created() {
      const albumId = this.$route.params.id
      this.albumTracks = await spotify.getAlbumTracks(albumId)
      this.albumImages = await spotify.getSpecificAlbum(albumId)
    }
  }
</script>
