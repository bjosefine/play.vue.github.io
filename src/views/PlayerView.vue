<template>
  <p>songs</p>
  <div v-if="tracks">
    <div>
      {{ tracks.name }}
      {{ tracks.preview_url }}
      <audio controls>
        <source :src="tracks.preview_url" type="audio/mp3" />
      </audio>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
<script>
  import spotify from '../api/spotify'

  export default {
    data() {
      return {
        tracks: null
      }
    },
    async created() {
      const songId = this.$route.params.id
      this.tracks = await spotify.getTracks(songId)
    }
  }
</script>
