<template>
  <div>
    <template v-if="songName">
      <h1>{{ songName }}</h1>
      <p>Artist: {{ artistName }}</p>
      <p>Album: {{ albumName }}</p>
      <button @click="playSong">Play Song</button>
      <button @click="pauseSong">Pause Song</button>
    </template>
  </div>
</template>

<script>
  import { getMyPlayer } from '../api/spotify'

  export default {
    name: 'SongComponent',
    data() {
      return {
        songName: '',
        artistName: '',
        albumName: '',
        player: null,
        accessToken: null
      }
    },
    mounted() {
      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        return
      }

      this.accessToken = accessToken

      this.loadSongData()
    },
    methods: {
      async loadSongData() {
        const accessToken = this.accessToken
        try {
          const response = await getMyPlayer(accessToken)
          console.log(response)
          const song = response.item
          this.songName = song.name
          this.artistName = song.artists[0].name
          this.albumName = song.album.name
          this.player = new Audio(song.preview_url)
        } catch (error) {
          console.error(error)
        }
      },
      playSong() {
        if (this.player) {
          this.player.play()
        }
      },
      pauseSong() {
        if (this.player) {
          this.player.pause()
        }
      }
    }
  }
</script>
<style>
  body {
    background-color: '';
  }
</style>
