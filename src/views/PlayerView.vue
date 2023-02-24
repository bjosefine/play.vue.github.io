<template>
  <div
    id="songBG"
    :style="{
      backgroundImage: 'url(' + img + ')',
      filter: 'blur(4px)'
    }"
  ></div>
  <p>songs</p>
  <div v-if="tracks">
    <div>
      {{ tracks.name }}
      <img :src="tracks.album.images[0].url" alt="bild" style="width: 50%" />
      <audio controls>
        <source :src="tracks.preview_url" type="audio/mp3" />
      </audio>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style>
  #songBG {
    display: block;
    width: 100%;
    height: 100%;
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
