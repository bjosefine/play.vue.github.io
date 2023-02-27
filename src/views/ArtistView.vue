<!-- Artist Page -->
<script>
  import TopTracks from '../components/TopTracks.vue'
  import spotify from '../api/spotify'

  export default {
    components: {
      TopTracks
    },

    async created() {
      const artistId = this.$route.params.id
      this.artistProfile = await spotify.getArtists(artistId)
    }
  }
</script>
