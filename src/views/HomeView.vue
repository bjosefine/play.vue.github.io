<template>
  <HeaderNav />
  <PlayListitems />
  <NewReleases />
</template>

<script>
  import spotify from '../api/spotify'
  import NewReleases from '../components/NewReleases.vue'
  import HeaderNav from '../components/HeaderNav.vue'
  import PlayListitems from '../components/Playlistitems.vue'

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
      HeaderNav,
      PlayListitems
    }
  }
</script>
<style>
  body {
    color: rgb(32, 26, 26);
  }
</style>
