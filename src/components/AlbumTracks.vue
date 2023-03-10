<!-- Component that shows tracks/playlist on a specific album -->
<template>
  <div v-if="albumTracks">
    <!-- Big Album Picture -->
    <img
      class="albumImage"
      v-if="albumImages"
      :src="albumImages.images[0].url"
      alt="Album cover"
    />

    <!-- Big Artist Name -->
    <h1 class="artistName">{{ albumTracks[0].artists[0].name }}</h1>
    <h3>{{ albumTracks[0].name }}</h3>

    <!-- Small Headers -->
    <div class="trackHeadings">
      <div>
        <h1 class="titleHeading">Title</h1>
      </div>
      <h1 class="artistHeading">Artist</h1>
      <h1 class="trackTime">Time</h1>
    </div>

    <!-- Line -->
    <hr class="headerLine" />

    <!-- List of Tracks -->
    <div v-for="track in albumTracks" :key="track.id">
      <div class="playlist">
        <ol class="trackList">
          <li
            v-for="(artist, index) in track.artists"
            :key="index"
            :class="{ selected: index === selectedTrackIndex }"
            class="trackItem"
            @click="playTrack(index)"
          >
            <div class="trackDetails">
              <!-- Small Track Image -->
              <div class="trackImage">
                <img
                  v-if="albumImages"
                  :src="albumImages.images[0].url"
                  alt="Small album cover"
                />
              </div>
              <!-- Track Title -->
              <div class="trackTitle">
                <div class="animateTrackName">{{ track.name }}</div>
              </div>
              <!-- Track Artist -->
              <div class="trackArtist">
                <router-link :to="`/artist/${track.artists[0].id}`">
                  {{ artist.name }}
                </router-link>
              </div>

              <div class="trackLength">
                {{ formatDuration(track.duration_ms) }}
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
    <div v-if="selectedTrackIndex !== null">
      <PlayerController
        :key="albumTracks[selectedTrackIndex].id"
        :track="albumTracks[selectedTrackIndex]"
        :audio="audio"
        :autoplay="autoplay"
        @play-next="playNext()"
        @play-prev="playPrev()"
      />
    </div>
  </div>
</template>

<script>
  import spotify from '../api/spotify.js'
  import PlayerController from './PlayerController.vue'

  export default {
    components: {
      PlayerController
    },
    data() {
      return {
        albumTracks: null,
        albumImages: null,
        tracks: null,
        selectedTrackIndex: null,
        autoplay: true,
        isPlaying: false,
        audio: new Audio()
      }
    },

    // const trackIndex = this.albumTracks.findIndex(
    //   (track) => track.id === trackId
    // )
    // this.audio.src = this.albumTracks[trackIndex].preview_url
    // this.audio.load()
    // this.audio.play()
    // this.audio.src = this.albumTracks[0].preview_url

    // Get the songs Mp3 file with a click
    methods: {
      playTrack(index) {
        if (index === this.selectedTrackIndex) {
          return
        }

        this.selectedTrackIndex = index
        this.isPlaying = true
        console.log(this.selectedTrackIndex, 'SELECTED TRACK INDEX')
        console.log(this.albumTracks, 'ALBUMTRACKS')
        console.log(this.albumTracks[0].preview_url, 'PREVIEW URL')
      },

      playNext() {
        this.selectedTrackIndex = this.selectedTrackIndex + 1
        console.log(this.selectedTrackIndex + 1, 'test next')
      },

      playPrev() {
        this.selectedTrackIndex = this.selectedTrackIndex - 1
        console.log(this.selectedTrackIndex - 1, 'test prev')
      },

      formatDuration(durationMs) {
        const minutes = Math.floor(durationMs / 1000 / 60)
        const seconds = Math.floor((durationMs / 1000) % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      }
    },
    async created() {
      const albumId = this.$route.params.id
      this.albumTracks = await spotify.getAlbumTracks(albumId)
      this.albumImages = await spotify.getSpecificAlbum(albumId)
      this.tracks = this.albumTracks
    }
  }
</script>

<style scoped>
  .albumImage {
    margin-top: 2%;
    width: 25%;
  }

  .artistName {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 18px;
  }

  .playlist {
    margin: 0;
  }
  .trackList {
    margin: 0;
    padding: 0;
  }

  .trackImage {
    width: 50%;
  }

  .trackItem:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
