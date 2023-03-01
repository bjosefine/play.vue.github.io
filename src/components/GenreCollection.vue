<template>
  <div>
    <div>
      <!-- <h1>{{ genrePlaylist.name }}</h1> -->
    </div>
  </div>
</template>

<script>
  import spotify from '../api/spotify'
  export default {
    name: 'GenreCollection',
    data() {
      return {
        genrePlaylist: null,
        categoryId: null
      }
    },
    async created() {
      this.categoryId = this.$route.params.id
      this.genrePlaylist = await spotify.getCategoryPlaylist(this.categoryId)
      console.log(this.genrePlaylist, 'apple')
      console.log(this.categoryId, 'pear')
    }
  }
</script>
