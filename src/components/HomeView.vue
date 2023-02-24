<template>

  <HeaderNav />
  <PlayListitems />
  <NewReleases />

  <div class="home">
    <h1>Featured Playlists</h1>
    <div class="playlist-container" v-if="featuredPlaylists">
      <div class="playlist-list">
        <div
          v-for="playlist in featuredPlaylists"
          :key="playlist.id"
          class="playlist-item"
        >
          <router-link
            :to="{ name: 'playlist', params: { id: playlist.id } }"
            class="playlist-link"
          >
            <div class="playlist-image">
              <img :src="playlist.images[0].url" :alt="playlist.name" />
            </div>
            <div class="playlist-details">
              <h2>{{ playlist.name }}</h2>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="loading" v-else>Loading...</div>
  </div>
  <NewReleases />
  <PlayerView />

</template>

<script>
  import spotify from '../api/spotify.js'
  import NewReleases from './NewReleases.vue'
  import HeaderNav from './HeaderNav.vue'
  import PlayListitems from './PlayListitems.vue'
  import PlayerView from './PlayerView.vue'


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
  background: radial-gradient(50% 50% at 50% 50%, rgba(198, 63, 184, 0.8) 25.52%, rgba(189, 173, 173, 0) 100%);
background-blend-mode: darken;
}
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    color: white;
  }

  h1 {
    font-size: 36px;
    margin: 40px 0;
    text-align: center;
  }

  .playlist-container {
  
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
  }

  .playlist-list {
    display: flex;
    
    justify-content: center;
    gap: 40px;
    margin-bottom: 50px;
  }

  .playlist-item {
    min-width: 260px;
    height: 250px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .playlist-item:hover {
    transform: scale(1.05);
  }

  .playlist-link {
    text-decoration: none;
  }

  .playlist-image {
    width: 100%;
    max-width: 230px;
    height: 200px;
    margin: 0 auto;
    
  }

  .playlist-image img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 5px 13px 13px -3px rgba(0, 0, 0, 0.25);
   border-radius: 13px;
  }

  .playlist-details {
    padding: 10px;
    text-align: center;
  }

  h2 {
    color: aliceblue;
    font-size: 18px;
    margin: 10px 0;
  }

  p {
    color: #aaa4a4;
    font-size: 14px;
    margin: 10px 0;
    height: 50px;
  }

  .loading {
    font-size: 24px;
    margin: 40px 0;
  }
</style>
