<template>
  <div class="playerContainer">
    <div
      class="swipeContainer"
      v-touch:swipe.left="playerNext"
      v-touch:swipe.right="playerPrev"
    />
    <div class="playerInfo">
      <div class="playerImage">
        <img
          class="playerImageSrc"
          :src="this.playerImage"
          :alt="this.playerSong"
        />

        <div class="artistInfo">
          <div class="playerTitle">
            <div
              v-if="this.playerSong.length > 20 && this.playerSong.length < 35"
              class="animatePlayerTrackNameDesktop"
            >
              {{ playerSong }}
            </div>
            <div
              v-else-if="this.playerSong.length >= 35"
              class="animatePlayerTrackNameMobile"
            >
              {{ playerSong }}
            </div>
            <div v-else>
              {{ playerSong }}
            </div>
          </div>
          <div class="playerArtist">
            {{ playerArtist }}
          </div>
        </div>
      </div>
    </div>
    <!-- kontrollerna  -->
    <div class="playerControls">
      <div class="sliderContainer">
        <div class="playerButtons">
          <span class="playerPrev">
            <i @click="playerPrev" class="fa fa-step-backward" />
          </span>
          <div class="playerPlayPause" @click="togglePlayerButtons">
            <span v-if="this.playerIsPlaying === false">
              <i class="bi bi-play" />
            </span>
            <span v-else><i class="fas fa-pause" /></span>
          </div>
          <span class="playerNext"
            ><i @click="playerNext" class="fa fa-step-forward"
          /></span>
        </div>
        <!-- input range for time slider  -->
        <input
          type="range"
          ref="playerSlider"
          min="0"
          :max="playerTotalTime"
          step="0.01"
          :value="playerCurrentTime"
          @input="playerSeek"
        />
        <!-- showing the timeduration of the song and the total time of the song (00:00) -->
        <div class="playerTime">
          {{ formatTime(playerCurrentTime) }} /
          {{ formatTime(playerTotalTime) }}
        </div>
      </div>
      <div class="audioControls">
        <div class="audioOnOff" @click="togglePlayerSound">
          <span v-if="this.playerVolume > 0"
            ><i class="fa fa-volume-up"
          /></span>
          <span v-else><i class="fa fa-volume-off" /></span>
        </div>
        <input
          type="range"
          ref="audioSlider"
          min="0"
          max="100"
          step="0.01"
          :value="playerVolume"
          @input="playerSetVolume"
        />
      </div>
    </div>
    <!-- slutet  -->
  </div>
</template>
<script>
  import { getDeviceId } from '../api/spotify.js'
  import { getSpotifyPlayer } from '../api/spotify.js'
  export default {
    data() {
      return {
        device: null,
        player: null,
        playerSong: null,
        playerArtist: null,
        playerImage: null,
        playerShuffle: null,
        playerVolume: null,
        playerIsPlaying: null,
        playerCurrentTime: null,
        playerTotalTime: null
      }
    },
    async created() {
      // get the access token from vuex
      const accessToken = this.$store.state.accessToken
      // get the device id (just having to see if i need to update accesstoken)
      const deviceId = await getDeviceId(accessToken)
      this.device = deviceId[0].id
      // send the access token to the fetch in spotify.js to activate the fetch

      // set interval to retrive the fetch data every second to always be up to date with the data. for example the time of the song, update song title and img when song changes

      setInterval(async () => {
        // get the access token from vuex
        const accessToken = this.$store.state.accessToken
        const spotifyPlayer = await getSpotifyPlayer(accessToken)

        // retrive all the data from the player
        this.player = spotifyPlayer
        this.playerSong = spotifyPlayer.item.name
        this.playerArtist = spotifyPlayer.item.artists[0].name
        this.playerImage = spotifyPlayer.item.album.images[0].url
        this.playerShuffle = spotifyPlayer.shuffle_state
        this.playerVolume = spotifyPlayer.device.volume_percent
        this.playerIsPlaying = spotifyPlayer.is_playing
        this.playerCurrentTime = spotifyPlayer.progress_ms
        this.playerTotalTime = spotifyPlayer.item.duration_ms
      }, 1000)
    },
    methods: {
      // make play and pause button change
      togglePlayerButtons() {
        if (this.playerIsPlaying) {
          this.playerPause()
          this.playerIsPlaying = false
        } else {
          this.playerPlay()
          this.playerIsPlaying = true
        }
      },
      // function to activate player play button
      async spotfiyPlay(accessToken) {
        const response = await fetch(
          'https://api.spotify.com/v1/me/player/play',
          {
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + accessToken }
          }
        )
        const data = await response.json()
        return data
      },
      playerPlay() {
        const accessToken = this.$store.state.accessToken
        this.spotfiyPlay(accessToken)
      },
      // function to pause the spotfiy player
      async spotfiyPause(accessToken) {
        const response = await fetch(
          'https://api.spotify.com/v1/me/player/pause',
          {
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + accessToken }
          }
        )
        const data = await response.json()
        return data
      },
      playerPause() {
        const accessToken = this.$store.state.accessToken
        this.spotfiyPause(accessToken)
      },
      // function to play next song
      async spotfiyNext(accessToken) {
        const response = await fetch(
          'https://api.spotify.com/v1/me/player/next',
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + accessToken }
          }
        )
        const data = await response.json()
        return data
      },
      playerNext() {
        const accessToken = this.$store.state.accessToken
        this.spotfiyNext(accessToken)
      },
      // function to play previous song
      async spotfiyPrev(accessToken) {
        const response = await fetch(
          'https://api.spotify.com/v1/me/player/previous',
          {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + accessToken }
          }
        )
        const data = await response.json()
        return data
      },
      playerPrev() {
        const accessToken = this.$store.state.accessToken
        this.spotfiyPrev(accessToken)
      },
      // format time to 00:00
      formatTime(time) {
        const minutes = Math.floor(time / 1000 / 60)
        const seconds = Math.floor((time / 1000) % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      },
      // change where in the song you are when dragging on the input range slider
      async spotfiySeek(accessToken, seek) {
        const response = await fetch(
          'https://api.spotify.com/v1/me/player/seek?position_ms=' + seek,
          {
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + accessToken }
          }
        )
        const data = await response.json()
        return data
      },
      playerSeek() {
        const accessToken = this.$store.state.accessToken
        const seek = parseInt(this.$refs.playerSlider.value)
        this.spotfiySeek(accessToken, seek)
      },
      // set the volume when dragging on the range in the volume slider
      async spotfiyVolume(accessToken, setVol) {
        const response = await fetch(
          'https://api.spotify.com/v1/me/player/volume?volume_percent=' +
            setVol,
          {
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + accessToken }
          }
        )
        const data = await response.json()
        return data
      },
      playerSetVolume() {
        const accessToken = this.$store.state.accessToken
        const setVol = parseInt(this.$refs.audioSlider.value)
        this.spotfiyVolume(accessToken, setVol)
      },
      togglePlayerSound() {
        const accessToken = this.$store.state.accessToken
        if (this.playerVolume) {
          const setVol = 100
          this.$refs.audioSlider.value = 100
          this.spotfiyVolume(accessToken, setVol)
        } else {
          const setVol = 0
          this.$refs.audioSlider.value = 0
          this.spotfiyVolume(accessToken, setVol)
        }
      }
    }
  }
</script>
