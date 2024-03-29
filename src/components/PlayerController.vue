<template>
  <div class="playerContainer" :class="{ expandPlayer: expand }">
    <div
      class="swipeContainer"
      v-touch:swipe.left="playNext"
      v-touch:swipe.right="playPrev"
    />
    <!-- the audio player -->
    <audio
      ref="player"
      :src="track.preview_url"
      @timeupdate="updateTime"
      @ended="playNext"
    />
    <!-- end audio player  -->
    <!-- information of the song: picture, name of song and artist, calling the expand function when clicking the image -->
    <div class="playerInfo">
      <div class="playerImage" :class="{ expandPlayer: expand }">
        <img
          @click="expandPlayer()"
          class="playerImageSrc"
          :class="{ expandPlayer: expand }"
          :src="track.album.images[0].url"
          :alt="track.name"
        />
        <div class="artistInfo" :class="{ expandPlayer: expand }">
          <div class="playerTitle">
            <div
              v-if="this.track.name.length > 20 && this.track.name.length < 35"
              class="animatePlayerTrackNameDesktop"
            >
              {{ track.name }}
            </div>
            <div
              v-else-if="this.track.name.length >= 35"
              class="animatePlayerTrackNameMobile"
            >
              {{ track.name }}
            </div>
            <div v-else>
              {{ track.name }}
            </div>
          </div>
          <div class="playerArtist">
            <router-link :to="`/artist/${track.artists[0].id}`">
              {{ track.artists[0].name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- making custom buttons to the audio element, calling the toggle function which makes the button change from play to pause -->
    <div class="playerControls">
      <div class="sliderContainer" :class="{ expandPlayer: expand }">
        <div class="playerButtons">
          <span class="playerPrev"
            ><i @click="playPrev" class="fa fa-step-backward"
          /></span>
          <div class="playerPlayPause" @click="togglePlayback">
            <span v-if="!isPlaying"><i class="bi bi-play" /></span>
            <span v-else><i class="fas fa-pause" /></span>
          </div>
          <span class="playerNext"
            ><i @click="playNext" class="fa fa-step-forward"
          /></span>
        </div>
        <!-- input range for time slider  -->
        <input
          type="range"
          ref="slider"
          min="0"
          :max="duration"
          step="0.01"
          @input="seekToPosition"
        />
        <!-- showing the timeduration of the song and the total time of the song (00:00) -->
        <div class="playerTime">{{ currentTime }} / {{ totalTime }}</div>
      </div>
      <div class="audioControls" :class="{ expandPlayer: expand }">
        <div class="audioOnOff" @click="toggleSound">
          <span v-if="audioVol"><i class="fa fa-volume-up" /></span>
          <span v-else><i class="fa fa-volume-off" /></span>
        </div>
        <input
          type="range"
          ref="audioSlider"
          min="0"
          max="1"
          step="0.01"
          @input="seekAudioPosition"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    emits: ['playNext', 'playPrev'],
    name: 'PlayerController',
    props: {
      track: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isPlaying: false,
        currentTime: '0:00',
        totalTime: '0:00',
        duration: 0,
        audio: new Audio(),
        expand: false,
        audioVol: true
      }
    },
    created() {
      console.log('Created PlayerController with track:', this.track)
    },
    // make the currently playing song stop when starting another song
    beforeUnmount() {
      this.stopAudio()
    },
    // change the play to paus vice versa
    methods: {
      togglePlayback() {
        if (this.isPlaying) {
          this.pausePreview()
        } else {
          this.playPreview()
        }
      },
      stopAudio() {
        this.audio.pause()
        this.audio.currentTime = 0
        this.isPlaying = false
      },
      playPreview() {
        this.$refs.player.play()
        this.isPlaying = true
      },
      pausePreview() {
        this.$refs.player.pause()
        this.isPlaying = false
      },
      // function for changing where in the song you are when dragging thumb in range input
      updateTime(event) {
        this.currentTime = this.formatTime(event.target.currentTime)
        this.totalTime = this.formatTime(event.target.duration)
        this.duration = event.target.duration
        this.$refs.slider.value = event.target.currentTime
      },
      // function for making the time go as the song goes
      formatTime(time) {
        let minutes = Math.floor(time / 60)
        let seconds = Math.floor(time % 60)
        seconds = seconds < 10 ? '0' + seconds : seconds
        return minutes + ':' + seconds
      },
      // function for making the range thumb move with the time passed
      seekToPosition(event) {
        this.$refs.player.currentTime = event.target.value
      },
      // play next song in list
      playNext() {
        this.$emit('playNext')
        console.log('next')
        // if (this.$refs.player.currentTime === this.$refs.player.duration) {
        //   this.$emit('playNext')
        // }
      },
      // play previous song in list
      playPrev() {
        this.$emit('playPrev')
        console.log('prev')
        // if (
        //   this.$refs.player.currentTime < 5 &&
        //   this.$refs.player.currentTime !== 0
        // ) {
        //   this.$emit('playPrev')
        // } else {
        //   this.$refs.player.currentTime = 0
        // }
      },
      // function to change icon sound off/on
      toggleSound() {
        if (this.audioVol) {
          this.soundOff()
        } else {
          this.soundOn()
        }
      },
      // making sound on have volume value set to 1
      soundOn() {
        this.$refs.player.volume = 1
        this.audioVol = true
        this.$refs.audioSlider.value = 1
      },
      // making sound off have volume 0
      soundOff() {
        this.$refs.player.volume = 0
        this.audioVol = false
        this.$refs.audioSlider.value = 0
      },
      // change volume when using the slider and make it change to sound off if value hits 0
      seekAudioPosition(event) {
        this.$refs.player.volume = event.target.value
        if (this.$refs.player.volume > 0) {
          this.audioVol = true
        } else {
          this.audioVol = false
        }
      },
      // function for expanding player to full screen (setting expand to true when clicking the image)
      expandPlayer() {
        this.expand = !this.expand
        console.log('expand')
      }
    },
    mounted() {
      this.audio.src = this.track.preview_url
      this.playPreview()
      console.log(this.track.name.length, 'tL')
    },
    watch: {
      track() {
        if (this.autoplay) {
          this.play()
        }
      },
      selectedTrackIndex() {
        this.play()
      }
    }
  }
</script>

<style>
  /*Media queries measurment from MenuNav to move playercontroller from bottom in tablet and mobile mode*/
  @media screen and (min-width: 481px) and (max-width: 767px) {
    .playerContainer {
      position: relative;
      margin-bottom: 6.5vh;
      bottom: 0;
    }
  }
  @media screen and (min-width: 375px) and (max-width: 480px) {
    .playerContainer {
      position: relative;
      margin-bottom: 6.5vh;
      bottom: 0;
    }
  }
  /* on desktop  */
  .playerContainer {
    height: 80px;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: height ease-out 2s;
  }
  .playerContainer.expandPlayer {
    height: 100vh;
    top: 0;
    display: block;
    transition: 0s;
  }
  .playerInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-right: 20px;
    margin-right: 10px;
    font-size: small;
  }

  .playerControls {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 4;
  }

  /* .playerPlayPause:hover,
  .playerStop:hover {
    background-color: #111;
  } */
  .playerPrev,
  .playerNext {
    width: 30px;
    height: 30px;
    padding-top: 12px;
    /* color: #e0dada; */
  }
  /* .playerPrev:hover,
  .playerNext:hover {
    color: #111;
  } */
  .playerImage {
    display: flex;
    width: 70%;
    justify-content: start;
  }
  .playerImage.expandPlayer {
    display: block;
    margin: auto;
    width: auto;
  }

  .playerImageSrc {
    width: 70px;
    height: 70px;
    z-index: 2;
  }
  .playerImageSrc.expandPlayer {
    width: 400px;
    height: 400px;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
  .artistInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 0.5pc;
  }
  .playerTitle {
    text-align: start;
    width: 130px;
    overflow: hidden;
    white-space: nowrap;
  }
  .animatePlayerTrackNameDesktop {
    width: max-content;
    animation-duration: 12s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-name: move;
  }
  .animatePlayerTrackNameMobile {
    width: max-content;
    animation-duration: 12s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-name: move;
  }
  @keyframes move {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(calc(-100% + 130px));
    }
  }
  /* .playerArtist {
    color: #685b5b;
  } */

  /* .playerPlayPause:hover,
  .playerStop:hover {
    background-color: #111;
  } */
  .sliderContainer {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-right: 15px;
    width: 50%;
  }
  .sliderContainer.expandPlayer {
    width: 100%;
  }

  .sliderContainer input[type='range'] {
    width: 550px;
    margin: 0 10px;
    /* color: gray; */
  }

  .playerTime {
    display: flex;
    align-items: center;
    margin-top: -4px;
    margin-bottom: 4px;
  }
  .playerButtons {
    display: flex;
  }
  .audioControls.expandPlayer {
    display: none;
  }
  .audioControls {
    display: flex;
    margin-top: 10px;
    margin-left: 13%;
    margin-right: 0;
  }
  .audioOnOff {
    width: 20px;
    margin-right: 0.5pc;
    /* color: #e0dada; */
  }
  /* .audioOnOff:hover {
    color: #111;
  } */
  /* smaller desktops screens */
  @media screen and (max-width: 1040px) {
    .audioControls {
      margin-left: 12%;
    }
    .audioControls input[type='range'] {
      width: 150px;
    }
    .sliderContainer input[type='range'] {
      width: 400px;
    }
  }

  /* bigger tablets  */
  @media screen and (max-width: 810px) {
    .audioControls {
      display: none;
    }
    .sliderContainer input[type='range'] {
      width: 400px;
    }
    .playerImageSrc {
      width: 55px;
      height: 55px;
    }
    .playerTime {
      margin-bottom: 9px;
    }
  }
  /* smaller tablets  */
  @media screen and (max-width: 600px) {
    .playerTime {
      display: none;
    }
    .sliderContainer input[type='range'] {
      width: 350px;
    }
    .playerInfo {
      padding-right: 0;
      width: 43%;
    }
    .playerImageSrc {
      width: 40px;
      height: 40px;
    }
  }
  /* mobile */
  @media screen and (max-width: 500px) {
    .playerTime {
      display: none;
    }
    .playerPrev,
    .playerNext {
      display: none;
    }
    .swipeContainer {
      width: 90%;
      height: 75px;
      position: absolute;
      z-index: 1;
    }
    .playerContainer {
      justify-content: initial;
      height: 95px;
    }
    .playerButtons {
      position: fixed;
      top: 10px;
      right: 10px;
    }
    .playerInfo {
      margin: 0;
      padding: 0;
      width: 100%;
      position: absolute;
      font-size: medium;
    }
    .playerTitle {
      width: 250px;
    }
    .animatePlayerTrackNameDesktop {
      animation-duration: none;
      animation-direction: none;
      animation-iteration-count: none;
      animation-timing-function: none;
      animation-name: none;
    }

    .animatePlayerTrackNameMobile {
      width: max-content;
      animation-duration: 12s;
      animation-direction: alternate;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-name: move;
    }
    @keyframes move {
      from {
        transform: translateX(0%);
      }
      to {
        transform: translateX(calc(-100% + 250px));
      }
    }
    .sliderContainer {
      display: initial;
      margin: 0;
      bottom: 0;
      position: fixed;
      width: 1%;
    }
    .sliderContainer input[type='range'] {
      width: 90%;
      position: fixed;
      margin: 0;
      bottom: 0;
      margin-bottom: 0;
    }
    .playerImageSrc {
      width: 40px;
      height: 40px;
    }
  }
</style>
