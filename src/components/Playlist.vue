<template>
  <div class="playlist" v-if="playlist">
    <h1>{{ playlist.name }}</h1>
    <div v-if="tracks">
      <div v-for="track in tracks" :key="track.track.id">
        {{ track.track.name }}

        <!-- gets image for featured playlist songs -->
        <img :src="track.track.album.images[0].url" alt="" />
        <!-- end of code -->
        <div>
          <!--gets the name of the artist to the song-->
          {{ track.track.artists[0].name }}
          <!--end of code-->
          {{ track.track.artists[0].name }}
          {{ track.track.album.uri }}
          {{ track.track.album.release_date }}
        </div>
      </div>
    </div>

    <div v-else>Loading...</div>
  </div>
</template>

<script>
  import spotify from '../api/spotify.js'
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
      console.log('playlist:', this.playlist)
    },
    catch(error) {
      console.error(error)
      console.log('hej')
    }
  }
</script>
