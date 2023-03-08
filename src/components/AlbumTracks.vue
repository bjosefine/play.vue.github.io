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
            class="trackItem"
            v-for="artist in track.artists"
            :key="artist.id"
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
  </div>
</template>

<script>
  import spotify from '../api/spotify.js'

  export default {
    data() {
      return {
        albumTracks: null,
        albumImages: null
      }
    },

    async created() {
      const albumId = this.$route.params.id
      this.albumTracks = await spotify.getAlbumTracks(albumId)
      this.albumImages = await spotify.getSpecificAlbum(albumId)
    },
    // Calculate minutes and seconds
    methods: {
      formatDuration(durationMs) {
        const minutes = Math.floor(durationMs / 1000 / 60)
        const seconds = Math.floor((durationMs / 1000) % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      }
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
