<template>
  <div class="playlist" v-if="playlist">
    <h1>{{ playlist.name }}</h1>
    <div v-if="tracks">
      <!-- commented out the following code for album pic because of error, modify later -->
      <!-- <div class="playlist-image">
        <img :src="playlist.images[0].url" :alt="playlist.name" />
      </div> -->
      <div v-for="track in tracks" :key="track.track.id">
        <RouterLink :to="`/song/${track.track.id}`">
          <div>
            <div id="gridWrapper">
              <!-- gets image for featured playlist songs -->
              <img
                id="songImage"
                :src="track.track.album.images[2].url"
                alt=""
              />

              <!-- end of code -->

              <div id="artistName">
                <!--gets the name of the artist to the song-->
                {{ track.track.artists[0].name }}
              </div>
              <div id="trackName">
                <!--get track name-->
                {{ track.track.name }}
              </div>
              <div id="durationTime">
                <!--duration_ ms / 1000 gives us the seconds of the song-->
                {{ Math.floor(track.track.duration_ms / 1000 / 60) }}:{{
                  (track.track.duration_ms / 1000) % 60 < 10 ? '0' : ''
                }}{{ Math.floor((track.track.duration_ms / 1000) % 60) }}
              </div>

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

<style>
  div {
    text-decoration: none;
  }
  /* Grid layout */
  #gridWrapper {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(35px, auto);
    grid-template-areas:
      'si an an an an an an an'
      'si tn tn tn tn tn tn dt';
  }
  #songImage {
    margin-left: 2em;
    grid-area: si;
  }
  #artistName {
    text-align: left;
    grid-area: an;
    background-color: rgba(232, 232, 236, 0.2);
  }
  #trackName {
    text-align: left;
    grid-area: tn;
    margin-bottom: 1em;
    background-color: rgba(195, 171, 218, 0.2);
  }
  #durationTime {
    grid-area: dt;
    background-color: rgba(195, 171, 218, 0.2);
    margin-bottom: 1em;
  }
  /* end of gridlayout */
</style>
