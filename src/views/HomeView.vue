<template>
  <!-- <HeaderNav :hide-go-back="true" /> -->
  <PlayListitems />
  <NewReleases />
  <PlayerView />
  <GenreCategories />
</template>

<script>
  import spotify from '../api/spotify'
  import NewReleases from '../components/NewReleases.vue'
  // import HeaderNav from '../components/HeaderNav.vue'
  import PlayListitems from '../components/PlayListitems.vue'

  import GenreCategories from '../components/GenreCategories.vue'

  export default {
    name: 'HomeView',
    data() {
      return {
        featuredPlaylists: null
      }
    },
    async created() {
      this.featuredPlaylists = await spotify.getFeaturedPlaylists()
    },
    components: {
      NewReleases,
      // HeaderNav,
      PlayListitems,
      GenreCategories
    }
  }
</script>
<style></style>
