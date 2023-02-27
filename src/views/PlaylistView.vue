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
        <div class="track-image">
          <img :src="track.track.album.images[0].url" alt="" />
        </div>
        <div class="track-details">
          <div class="track-title">
            {{ track.track.artists[0].name }} - {{ track.track.name }}
          </div>
          <div class="track-length">
            {{ formatDuration(track.track.duration_ms) }}
          </div>
        </div>
      </li>
    </ul>
    <div v-if="tracks == null">Loading...</div>
    <div class="player-container" v-if="selectedTrackIndex !== null">
      <PlayerController
        :key="tracks[selectedTrackIndex].track.id"
        :track="tracks[selectedTrackIndex].track"
        :audio="audio"
        :autoplay="autoplay"
      ></PlayerController>
    </div>
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
  .player-container {
    background: rgba(138, 51, 138, 0.02);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
    border: 1px solid rgba(138, 51, 138, 0.3);
  }

  .track-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .track-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    transition: background-color 0.3s;
  }

  .track-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .selected {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .track-image {
    margin-right: 1rem;
  }

  .track-image img {
    height: 4rem;
    width: 4rem;
    object-fit: cover;
  }

  .track-details {
    flex-grow: 1;
  }

  .track-title {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .track-artist {
    font-size: 0.8rem;
  }

  .track-length {
    font-size: 0.8rem;
  }
</style>
