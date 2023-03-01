<template>
  <div class="playerContainer" :class="{ expandPlayer: expand }">
    <!-- the audio player -->
    <audio
      ref="player"
      :src="track.preview_url"
      @timeupdate="updateTime"
      @ended="playNext"
    ></audio>
    <!-- end audio player  -->
    <!-- information of the song: picture, name of song and artist, calling the expand function when clicking the image -->
    <div class="playerInfo">
      <div
        @click="expandPlayer()"
        class="playerImage"
        :class="{ expandPlayer: expand }"
      >
        <img
          class="playerImageSrc"
          :class="{ expandPlayer: expand }"
          :src="track.album.images[0].url"
          :alt="track.name"
        />
        <div class="artistInfo" :class="{ expandPlayer: expand }">
          <div class="playerTitle">{{ track.name }}</div>
          <div class="playerArtist">{{ track.artists[0].name }}</div>
        </div>
      </div>
    </div>
    <!-- making custom buttons to the audio element, calling the toggle function which makes the button change from play to pause -->
    <div class="playerControls">
      <div class="sliderContainer" :class="{ expandPlayer: expand }">
        <div class="playerButtons">
          <span @click="playPrev">prev</span>
          <div class="playerPlayPause" @click="togglePlayback">
            <span v-if="!isPlaying"><i class="fas fa-play"></i></span>
            <span v-else><i class="fas fa-pause"></i></span>
          </div>
          <span @click="playNext">next</span>
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
    </div>
  </div>
</template>

<script>
  export default {
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
        expand: false
      }
    },
    // make the currently playing song stop when starting another song
    beforeDestroy() {
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
      // function for expanding player to full screen (setting expand to true when clicking the image)
      expandPlayer() {
        this.expand = !this.expand
        console.log('expand')
      }
    },
    mounted() {
      this.audio.src = this.track.preview_url
      this.playPreview()
    },
    watch: {
      track(newTrack, oldTrack) {
        this.isPlaying = false
        this.audio.src = newTrack.preview_url
        this.playPreview()
      }
    }
  }
</script>

<style>
  .playerContainer {
    height: 150px;
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
  }

  .playerControls {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 4;
  }
  .playerArtist {
    color: #685b5b;
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
    margin-bottom: 50px;
    cursor: pointer;
    color: #fff;
  }

  .playerImage {
    display: flex;
    width: 30%;
    justify-content: space-around;
  }
  .playerImage.expandPlayer {
    display: block;
    margin: auto;
    width: auto;
  }

  .playerImageSrc {
    width: 120px;
    height: 120px;
    margin-left: 25px;
  }
  .playerImageSrc.expandPlayer {
    width: 400px;
    height: 400px;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
  .artistInfo {
    margin-left: 0.5pc;
  }

  .playerPlayPause:hover,
  .playerStop:hover {
    background-color: #111;
  }
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
    width: 700px;
    margin: 0 10px;
    color: gray;
  }

  .playerTime {
    display: flex;
    align-items: center;
  }
  .playerButtons {
    display: flex;
  }
</style>
