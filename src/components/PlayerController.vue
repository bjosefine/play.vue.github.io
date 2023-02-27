<template>
  <div class="player-container">
    <audio
      ref="player"
      :src="track.preview_url"
      @timeupdate="updateTime"
      @ended="playNext"
    ></audio>
    <div class="player-info">
      <div class="player-image">
        <img :src="track.album.images[0].url" :alt="track.name" />
        <div class="artist-info">
          <div class="player-title">{{ track.name }}</div>
          <div class="player-artist">{{ track.artists[0].name }}</div>
        </div>
      </div>
    </div>
    <div class="player-controls">
      <div class="slider-container">
        <div class="player-buttons">
          <div class="player-play-pause" @click="togglePlayback">
            <span v-if="!isPlaying"><i class="fas fa-play"></i></span>
            <span v-else><i class="fas fa-pause"></i></span>
          </div>
        </div>
        <input
          type="range"
          ref="slider"
          min="0"
          :max="duration"
          step="0.01"
          @input="seekToPosition"
        />
        <div class="player-time">{{ currentTime }} / {{ totalTime }}</div>
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
        audio: new Audio()
      }
    },
    beforeDestroy() {
      this.stopAudio()
    },
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
      updateTime(event) {
        this.currentTime = this.formatTime(event.target.currentTime)
        this.totalTime = this.formatTime(event.target.duration)
        this.duration = event.target.duration
        this.$refs.slider.value = event.target.currentTime
      },
      formatTime(time) {
        let minutes = Math.floor(time / 60)
        let seconds = Math.floor(time % 60)
        seconds = seconds < 10 ? '0' + seconds : seconds
        return minutes + ':' + seconds
      },
      seekToPosition(event) {
        this.$refs.player.currentTime = event.target.value
      },
      playNext() {
        if (this.$refs.player.currentTime === this.$refs.player.duration) {
          this.$emit('playNext')
        }
      },
      playPrev() {
        if (
          this.$refs.player.currentTime < 5 &&
          this.$refs.player.currentTime !== 0
        ) {
          this.$emit('playPrev')
        } else {
          this.$refs.player.currentTime = 0
        }
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
  .player-container {
    height: 200px;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .player-info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-right: 20px;
    margin-right: 10px;
  }

  .player-controls {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 4;
  }
  .player-artist {
    color: #685b5b;
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
    margin-bottom: 50px;
    cursor: pointer;
    color: #fff;
  }

  .player-image {
    display: flex;
    width: 20%;
    justify-content: space-around;
  }

  .player-image img {
    width: 100px;
  }

  .player-play-pause:hover,
  .player-stop:hover {
    background-color: #111;
  }

  .slider-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-right: 15px;
    width: 80%;
  }

  .slider-container input[type='range'] {
    width: 700px;
    margin: 0 10px;
    color: gray;
  }

  .player-time {
    display: flex;
    align-items: center;
  }
  .player-buttons {
    display: flex;
  }
</style>
