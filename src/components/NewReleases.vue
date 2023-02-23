<template>
  <div>
    <h1>New Releases</h1>
    <div v-if="newReleases">
      <!-- Start: Show the New Releases -->
      <div>
        <div v-for="album in newReleases" :key="album.id">
          <p v-for="artist in album.artists" :key="artist.id">
            <h1>{{ artist.name }}</h1>
          </p>
          <h3>{{ album.name }}</h3>

<!-- <img :src="album.id.images" alt="bild" /> -->

        </div>
      </div>
      <!-- Stop: Show the New Releases -->
    </div>
    <div v-else>Loading...</div>
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
