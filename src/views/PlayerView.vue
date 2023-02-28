<template>
  <div>
    <div class="song-image-container"></div>
    <div class="song-info-container">
      <div class="song-controls">
        <div class="song-title">{{ tracks.name }}</div>
        <div class="song-artist">{{ tracks.artists[0].name }}</div>
        <img
          class="song-image"
          :src="tracks.album.images[0].url"
          alt="Album Art"
        />
        <PlayerController :preview-url="tracks.preview_url" />
      </div>
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
        tracks: null
      }
    },
    async created() {
      const songId = this.$route.params.id
      this.tracks = await spotify.getTracks(songId)
    }
  }
</script>

<style>
  .player-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f8f8f8;
    border-top: 1px solid #d8d8d8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
  }

  .player-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 20px;
  }

  .player-controls {
    display: flex;
    align-items: center;
  }

  .player-play-pause,
  .player-stop {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #e0dada;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    cursor: pointer;
    color: #fff;
  }

  .player-play-pause:hover,
  .player-stop:hover {
    background-color: #111;
  }
</style>
