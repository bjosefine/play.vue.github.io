<!-- Artist Page -->
<script>
  import TopTracks from '../components/TopTracks.vue'
  import spotify from '../api/spotify'

  export default {
    components: {
      TopTracks
    },

    data() {
      return {
        artistProfile: null
      }
    },

    async created() {
      const artistId = this.$route.params.id
      this.artistProfile = await spotify.getArtists(artistId)
    }
  }
</script>

<template>
  <div v-for="artist in artistProfile" :key="artist.id">
    <p>{{ artist }}</p>
  </div>
</template>
