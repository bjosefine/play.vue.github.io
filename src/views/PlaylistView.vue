<template>
  <div class="playlist" v-if="playlist">
    <h1>{{ playlist.name }}</h1>
    <div v-if="tracks">
      <div class="playlist-image">
        <img :src="playlist.images[0].url" :alt="playlist.name" />
      </div>
      <div v-for="track in tracks" :key="track.track.id">
        <RouterLink :to="`/song/${track.track.id}`">
          <div>
            <!-- gets image for featured playlist songs -->
            <img :src="track.track.album.images[0].url" alt="" />

            <!-- end of code -->
            <div>
              <table>
                <tr>
                  <!--gets the name of the artist to the song-->
                  {{
                    track.track.artists[0].name
                  }}
                </tr>
                <tr>
                  <!--get track name-->
                  {{
                    track.track.name
                  }}
                </tr>
                <tr>
                  <!--duration_ ms / 1000 gives us the seconds of the song-->
                  {{
                    Math.floor(track.track.duration_ms / 1000 / 60)
                  }}:
                  {{
                    (track.track.duration_ms / 1000) % 60 < 10 ? '0' : ''
                  }}
                  {{
                    Math.floor((track.track.duration_ms / 1000) % 60)
                  }}
                </tr>

                <!-- {{
                  track.track.album.uri
                }} -->
                <!--its comment out this data because it has the same name as the song titel-->
                <!-- {{
                  track.track.album.name
                }} -->
                <!-- released date is comment out because its for desktop version-->
                <!-- {{
                  track.track.album.release_date
                }} -->
              </table>
            </div>
          </div>
        </RouterLink>
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
      console.log('playlist:', this.playlist)
    },
    catch(error) {
      console.error(error)
    },

    components: {
      HomeView
    }
  }
</script>
