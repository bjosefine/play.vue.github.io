<!-- Artist Page -->
<template>
  <p v-if="artistProfile">{{ artistProfile.name }}</p>

  <p v-else>Loading...</p>
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
        artistProfile: null
      }
    },

    async created() {
      const artistId = this.$route.params.id
      this.artistProfile = await spotify.getArtists(artistId)
    }
  }
</script>
