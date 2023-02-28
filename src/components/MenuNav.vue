<template>
  <div class="MenuNav">
    <ul>
      <li><i class="bi bi-house"></i> Home</li>
      <li><i class="bi bi-search"></i> Search</li>
      <li><i class="bi bi-person"></i> Profile</li>
      <div class="PlaylistNav">
        <li><i class="bi bi-music-note-list"></i> Playlist</li>
        <li v-for="playlist in featuredPlaylists" :key="playlist.id">
          <router-link
            :to="{ name: 'playlist', params: { id: playlist.id } }"
            >{{ playlist.name }}</router-link
          >
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
  import spotify from '../api/spotify.js'

  export default {
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

<style scoped>
  .MenuNav {
    display: flex;
    justify-content: space-between;
    height: 100vh;
    width: 15rem;
    position: fixed;
    bottom: 0;
    background-color: rgb(241, 179, 241);
    float: left;
  }

  .PlaylistNav {
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
  }
  .PlaylistNav a {
    text-decoration: none;
  }

  ul {
    padding: 0;
    margin: 5px;
    position: relative;
  }
  li {
    display: flex;
    justify-content: left;
  }
  i {
    margin: 5px;
  }
</style>
