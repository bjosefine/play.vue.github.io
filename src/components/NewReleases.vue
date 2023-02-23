<template>
  <div>
    <h1>New Releases</h1>
    <div v-if="newReleases">
      <div v-for="albums in newReleases" :key="albums.id">
        {{ albums.items[0].artists[0].name }}
      </div>
    </div>
  </div>
</template>
<script>
  import spotify from '../api/spotify'

  export default {
    name: 'TopArtists',
    data() {
      return {
        newReleases: null
      }
    },
    async created() {
      this.newReleases = await spotify.getNewReleases()
    }
  }
</script>
