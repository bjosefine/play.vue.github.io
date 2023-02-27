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
    <h2>{{ tracks.artists[0].name }}</h2>
    <!-- import the preview audio -->
    <audio
      id="player"
      class="playerControl"
      :src="tracks.preview_url"
      autoplay
      controls
    ></audio>
    <!-- create a custom  -->
    <div id="customAudioControl">
      <!-- get control over play and pause -->
      <button
        onclick="document.getElementById('player').play()"
        class="playerIcons"
      >
        <i class="bi bi-caret-right"></i>
      </button>
      <button
        onclick="document.getElementById('player').pause()"
        class="playerIcons"
      >
        <i class="bi bi-pause"></i>
      </button>
      <!-- get control over volume  -->
      <button
        onclick="document.getElementById('player').volume = 0"
        class="playerIcons"
      >
        <i class="bi bi-volume-mute"></i>
      </button>
      <button
        onclick="document.getElementById('player').volume = 1"
        class="playerIcons"
      >
        <i class="bi bi-volume-up"></i>
      </button>
      <!-- volume slider  -->
      <input
        onchange="document.getElementById('player').volume = this.value"
        type="range"
        id="volumeRange"
        min="0"
        max="1"
        step="0.01"
        value="1"
      />
      <!-- get control over audio time  -->
      <input
        onchange="document.getElementById('player').currentTime = document.getElementById('player').duration * this.value"
        type="range"
        id="playerDuration"
        min="0"
        max="1"
        step="0.01"
        value="0"
      />
      <!-- get current time in track, not working yet -->
      <input type="time" id="goingTime" value="00:00" />
      <input type="time" id="songLength" value="00:30" />
    </div>
    <!-- </div>
    <div v-else>Loading...</div> -->
  </div>
</template>

<style>
  #customAudioControl {
    background-color: palevioletred;
    color: black;
  }
  #playerDuration {
    appearance: unset;
    background: orange;
    border-radius: 10px;
    height: 5px;
  }
  #playerDuration::-moz-range-thumb {
    background: white;
    height: 10px;
    width: 10px;
    border: none;
    opacity: 70%;
  }
  #playerDuration::-moz-range-thumb:hover {
    background: white;
    height: 13px;
    width: 13px;
    border: none;
    opacity: 80%;
  }
  #volumeRange {
    appearance: unset;
    background: white;
    border-radius: 10px;
    height: 5px;
  }
  .playerIcons {
    border: none;
    background: none;
    font-size: 1.5em;
  }
  #songBG {
    top: 0;
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
