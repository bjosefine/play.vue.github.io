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
    <div v-for="(track, index) in albumTracks" :key="track.id">
      <div class="playlist">
        <ol class="trackList">
          <li
            class="trackItem"
            :class="{ selected: index === selectedTrackIndex }"
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
                  {{ track.artists[0].name }}
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
    <div>
      <PlayerController
        v-if="selectedTrack"
        :key="selectedTrack.id"
        :track="selectedTrack"
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
        selectedTrackIndex: null,
        autoplay: true,
        isPlaying: false,
        audio: new Audio()
      }
    },
    computed: {
      selectedTrack() {
        if (this.selectedTrackIndex !== null) {
          return this.albumTracks[this.selectedTrackIndex]
        } else {
          return null
        }
      }
    },
    methods: {
      async playTrack(index) {
        if (index === this.selectedTrackIndex) {
          return
        }

        this.selectedTrackIndex = index
        this.isPlaying = true

        const track = this.selectedTrack
        const previewUrl = track.preview_url

        if (previewUrl) {
          this.audio.src = previewUrl
          await this.audio.play()
        }
      },

      playNext() {
        if (this.selectedTrackIndex === this.albumTracks.length - 1) {
          this.selectedTrackIndex = 0
        } else {
          this.selectedTrackIndex += 1
        }
      },

      playPrev() {
        if (this.selectedTrackIndex === 0) {
          this.selectedTrackIndex = this.albumTracks.length - 1
        } else {
          this.selectedTrackIndex -= 1
        }
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
