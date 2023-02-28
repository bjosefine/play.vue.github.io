<template>
  <div class="home">
    <h1>Featured Playlists</h1>
    <div class="playlistContainer" v-if="featuredPlaylists">
      <div class="playlistList">
        <div
          v-for="playlist in featuredPlaylists"
          :key="playlist.id"
          class="playlistItem"
        >
          <router-link
            :to="{ name: 'playlist', params: { id: playlist.id } }"
            class="playlistLink"
          >
            <div class="playlistImage">
              <img :src="playlist.images[0].url" :alt="playlist.name" />
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="loading" v-else>Loading...</div>
  </div>
</template>

<script>
  import spotify from '../api/spotify'
  export default {
    name: 'PlayListitems',
    data() {
      return {
        featuredPlaylists: null
      }
    },
    async created() {
      this.featuredPlaylists = await spotify.getFeaturedPlaylists()
    }
  }
</script>

<style>
  body {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(46, 35, 45, 0.8) 25.52%,
      rgba(189, 173, 173, 0) 100%
    );
    background-blend-mode: darken;
  }
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-size: 36px;
    margin: 40px 0;
    color: black;
    text-align: center;
  }

  .playlistContainer {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
  }

  .playlistList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
  }

  .playlistItem {
    max-width: 230px;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .playlistItem:hover {
    transform: scale(1.05);
  }

  .playlistLink {
    text-decoration: none;
  }

  .playlistLmage {
    width: 100%;
    max-width: 230px;
    height: 200px;
    margin: 0 auto;
  }

  .playlistImage img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 5px 13px 13px -3px rgba(0, 0, 0, 0.25);
    border-radius: 13px;
  }

  .playlistDetails {
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
