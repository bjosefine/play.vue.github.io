<!-- Artist Page -->
<template>
  <!-- Show Artist Name -->
  <p v-if="artistProfile">{{ artistProfile.name }}</p>
  <p v-else>Loading...</p>

  <!-- Popular songs -->
  <div>
    <h2>Popular songs</h2>
    <ul>
      <li v-for="(track, index) in artistTracks.slice(0, 5)" :key="index">
        {{ track.name }}
        <img :src="track.album.images[0].url" alt="track.image" />
        {{ track.album.release_date }}
      </li>
    </ul>
  </div>

  <!-- albums for artist -->
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
        artistAlbums: null,
        artistTracks: null // changed from TopTracks to artistTracks
      }
    },

    async created() {
      const artistId = this.$route.params.id
      this.artistProfile = await spotify.getArtists(artistId)
      this.artistAlbums = await spotify.getArtistsAlbums(artistId)
      this.artistTracks = await spotify.getToptracks(artistId) // assign artistTracks using getToptracks() function
    }
  }
</script>
