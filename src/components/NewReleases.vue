<template>
  <p>artists</p>
</template>
<script>
  import spotify from '../api/spotify'

  export default {
    name: 'TopArtists',
    data() {
      return {
        NewReleases: null
      }
    },
    async created() {
      this.TopArtists = await spotify.getNewReleases()
    }
  }
</script>
