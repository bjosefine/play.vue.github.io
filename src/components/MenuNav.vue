<template>
  <div class="MenuNav">
    <ul>
      <router-link tag="li" to="/"><i class="bi bi-house" /></router-link>
      <router-link tag="li" to="/search">
        <i class="bi bi-search" />
      </router-link>
      <router-link tag="li" to="profile"
        ><i class="bi bi-person"
      /></router-link>
      <li><i class="bi bi-music-note-list" /></li>
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
  .MenuNav a {
    text-decoration: none;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: auto;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  li {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    color: rgba(124, 13, 117, 0.53);
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  }
  li:hover {
    color: rgb(45, 41, 41);
  }
  i {
    font-size: 20px;
    margin-right: 5px;
  }
  a {
    color: rgba(124, 13, 117, 0.53);
  }

  a:hover {
    color: rgb(45, 41, 41);
  }
</style>
