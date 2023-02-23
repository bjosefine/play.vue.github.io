<template>
  <p>spela låt</p>
</template>
<script>
  import spotify from '../api/spotify'

  export default {
    data() {
      return {
        songs: null
      }
    },
    async created() {
      const songId = this.$route.params.id
      this.song = await spotify.getTracks(songId)
    }
  }
</script>
