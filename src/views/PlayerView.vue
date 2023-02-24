<template>
  <!-- Background blurry image -->
  <div
    id="songBG"
    :style="{
      backgroundImage: 'url(' + img + ')',
      filter: 'blur(10px)'
    }"
  ></div>

  <!-- Player container with the page content -->
  <div id="playerContainer">
    <!-- <div v-if="tracks"> -->

    <img
      class="songImg"
      :src="tracks.album.images[0].url"
      alt="bild"
      style="width: 50%"
    />
    <h1 class="songTitle">{{ tracks.name }}</h1>
    <audio class="playerControl" controls>
      <source class="playerMp3" :src="tracks.preview_url" type="audio/mp3" />
    </audio>
    <!-- </div>
    <div v-else>Loading...</div> -->
  </div>
</template>

<style>
  #songBG {
    display: block;
    width: 100%;
    height: 200%;
    background-size: cover;
    margin: 0;
    padding: 0;
    z-index: -100;
    position: absolute;
  }

  #playerContainer {
    display: flex;
    justify-content: center;
    align-items: baseline;
    width: 100%;
    margin: 0;
  }

  .songTitle,
  songImg,
  playerControl,
  playerMp3 {
    background-color: blue;
    margin: 20px;
    display: flex;
    align-items: row;
  }
</style>

<script>
  import spotify from '../api/spotify'

  export default {
    data() {
      return {
        tracks: null,
        img: ''
      }
    },
    async created() {
      const songId = this.$route.params.id
      this.tracks = await spotify.getTracks(songId)
      this.img = this.tracks.album.images[0].url
    }
  }
</script>
