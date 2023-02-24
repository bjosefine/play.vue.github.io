<template>
    <div class="playlist" v-if="playlist">
    <h1>{{ playlist.name }}</h1>
    <div v-if="tracks">
      <div v-for="track in tracks" :key="track.track.id">
        {{ track.track.name }}
        
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>

</template>

<script>
  import spotify from '../api/spotify.js'
  import HomeView from './HomeView.vue'

  export default {
    name: 'PlayList',
    data() { 
      return {
        playlist: null,
        tracks: null
      }
    },
    async created() {
      const playlistId = this.$route.params.id
      this.playlist = await spotify.getPlaylist(playlistId)
      this.tracks = await spotify.getPlaylistTracks(playlistId)
      console.log('tracks:', this.tracks)
    },
    catch(error) {
      console.error(error)
    },
   
  components: {
      HomeView

    }
  }
</script>
