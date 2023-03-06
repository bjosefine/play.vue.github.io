<template>
  <div>
    <div class="songImageContainer"></div>
    <div class="songInfoContainer">
      <div class="songControls">
        <div class="songTitle">{{ tracks.name }}</div>
        <div class="songArtist">{{ tracks.artists[0].name }}</div>
        <img
          class="songImage"
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
  .playerContainer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
  }

  .playerInfo {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 20px;
  }

  .playerControls {
    display: flex;
    align-items: center;
  }

  .playerPlayPause,
  .playerStop {
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

  .playerPlayPause:hover,
  .playerStop:hover {
    background-color: #111;
  }
</style>
