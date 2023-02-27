<template>
  <div class="playlist" v-if="playlist">
    <h1>{{ playlist.name }}</h1>
    <ul class="track-list">
      <li
        v-for="(track, index) in tracks"
        :key="track.track.id"
        :class="{ selected: index === selectedTrackIndex }"
        class="track-item"
        @click="playTrack(index)"
      >
        <div class="track-details">
          <!-- image -->
          <div class="track-image">
            <img :src="track.track.album.images[2].url" alt="" />
          </div>
          <!-- title -->
          <div class="track-title">
            {{ track.track.name }}
          </div>
          <!-- artist -->
          <div class="track-artist">
            {{ track.track.artists[0].name }}
          </div>
          <!-- duration -->
          <div class="track-length">
            {{ formatDuration(track.track.duration_ms) }}
          </div>
        </div>
      </li>
    </ul>
    <div v-if="tracks == null">Loading...</div>
    <!-- player-container used for many pages, important -->
    <div class="player-container" v-if="selectedTrackIndex !== null">
      <PlayerController
        :key="tracks[selectedTrackIndex].track.id"
        :track="tracks[selectedTrackIndex].track"
        :audio="audio"
        :autoplay="autoplay"
      ></PlayerController>
    </div>
    <!-- end of player container -->
  </div>
</template>

<script>
  import spotify from '../api/spotify.js'
  import PlayerController from '../components/PlayerController.vue'

  export default {
    name: 'PlayList',

    components: {
      PlayerController
    },

    data() {
      return {
        playlist: null,
        tracks: null,
        selectedTrackIndex: null,
        autoplay: true,
        isPlaying: false,
        audio: new Audio()
      }
    },

    async created() {
      const playlistId = this.$route.params.id
      this.playlist = await spotify.getPlaylist(playlistId)
      this.tracks = await spotify.getPlaylistTracks(playlistId)
      this.tracks = this.tracks.filter((track) => track.track.preview_url)
    },

    methods: {
      playTrack(index) {
        if (index === this.selectedTrackIndex) {
          return
        }

        this.selectedTrackIndex = index
        this.isPlaying = true
      },
      formatDuration(durationMs) {
        const minutes = Math.floor(durationMs / 1000 / 60)
        const seconds = Math.floor((durationMs / 1000) % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      }
    }
  }
</script>

<style>
  /* player-container Used on many pages important, don't adjust*/
  .player-container {
    background: rgba(138, 51, 138, 0.02);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
    border: 1px solid rgba(138, 51, 138, 0.3);
  }
  /* end of player container */

  .track-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .track-details {
    /* changed from flex to grid */
    display: grid;
    justify-items: start;
    align-items: center;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(35px, auto);
    grid-template-areas: 'ti tt tt tt tt ta ta tl ';
  }

  .track-item {
    padding: 0.3rem;
    align-items: center;
    transition: background-color 0.3s;
  }

  .track-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  /* selected song */
  .selected {
    background-color: rgba(0, 0, 0, 0.2);
  }
  /* bild */
  .track-image {
    margin-left: 1rem;
    grid-area: ti;
    object-fit: cover;
  }
  /* titel */
  .track-title {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    grid-area: tt;
  }
  /* artist */
  .track-artist {
    grid-area: ta;
  }
  /* duration time */
  .track-length {
    font-size: 0.8rem;
    grid-area: tl;
    justify-self: end;
  }
</style>
