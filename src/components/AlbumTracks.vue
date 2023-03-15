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
    <!-- List of Tracks -->
    <ol class="trackList" v-if="tracks">
      <li
        v-for="(track, index) in tracks"
        :key="index"
        @click="playTrack(index)"
        :class="{ selected: index === selectedTrackIndex }"
        class="trackItem"
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
            <div v-for="artist in track.artists" :key="artist.id">
              <router-link :to="`/artist/${artist.id}`">
                {{ artist.name }}
              </router-link>
            </div>
          </div>

          <div class="trackLength">
            {{ formatDuration(track.duration_ms) }}
          </div>
        </div>
      </li>
    </ol>

    <div v-if="selectedTrackIndex !== null">
      <PlayerController
        :key="tracks[selectedTrackIndex].id"
        :track="tracks[selectedTrackIndex]"
        :audio="audio"
        :autoplay="autoplay"
        :selected-track-index="selectedTrackIndex"
        @play-next="playNext()"
        @play-prev="playPrev()"
      />
    </div>
  </div>
</template>

<script>
  import spotify from '../api/spotify.js'
  import PlayerController from '../components/PlayerController.vue'

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
        audio: new Audio()
      }
    },

    methods: {
      playTrack(index) {
        if (index === this.selectedTrackIndex) {
          return
        }
        console.log('Track received in PlayerController:', this.track)

        this.selectedTrackIndex = index
        this.isPlaying = true
        console.log('Clicked track:', index)

        console.log(index, 'plllll')
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
      console.log(this.audio)
      console.log('Track:', this.track)
      console.log('Key:', this.key)

      this.albumTracks = await spotify.getAlbumTracks(albumId)
      this.albumImages = await spotify.getSpecificAlbum(albumId)
      this.tracks = this.albumTracks

      console.log(this.albumTracks, 'URLLLLLL')
      // const fetchAlbumTracks = await spotify.getAlbumTracks(albumId)
      // const fetchAlbumImg = await spotify.getSpecificAlbum(albumId)
      // this.albumTracks = fetchAlbumTracks
      // this.albumImages = fetchAlbumImg
      // console.log(this.albumTracks, 'GAH ALBUMTRACKS')
      // console.log(this.albumImages, 'GAH ALBUMImages')
      // console.log(fetchAlbumTracks, 'GAH FETCHALBUM')
    },
    watch: {
      selectedTrackIndex(newVal, oldVal) {
        console.log('selectedTrackIndex changed from', oldVal, 'to', newVal)
        console.log('Current track:', this.tracks[newVal])
      }
    }
  }
</script>

<style>
  .playerContainer {
    background: rgba(138, 51, 138, 0.02);
    border-radius: 3px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
    color: rgb(0, 0, 0);
  }
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

  .trackImage img {
    width: 50%;
  }

  .trackItem:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .trackItem {
    height: 100px;
  }
</style>
