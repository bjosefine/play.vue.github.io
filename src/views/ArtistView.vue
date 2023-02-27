<!-- Artist Page -->
<template>
  <!-- Show Artist Name -->
  <p v-if="artistProfile">{{ artistProfile.name }}</p>
  <p v-else>Loading...</p>

  <div>
    <h2>Albums</h2>
    <ul v-for="album in artistAlbums" :key="album.id">
      <li>
        {{ album.name }}
        <img :src="album.images[0].url" alt="album.image" />
        {{ album.release_date }}
      </li>
    </ul>
  </div>
</template>

<script>
  import TopTracks from '../components/TopTracks.vue'
  import spotify from '../api/spotify.js'

  export default {
    components: {
      TopTracks
    },

    data() {
      return {
        artistProfile: null,
        artistAlbums: null
      }
    },

    async created() {
      const artistId = this.$route.params.id
      this.artistProfile = await spotify.getArtists(artistId)
      this.artistAlbums = await spotify.getArtistsAlbums(artistId)
    }
  }
</script>
