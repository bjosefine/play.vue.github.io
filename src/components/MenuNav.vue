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
      <i class="bi bi-music-note-list" />
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

  @media (max-width: 767px) {
    .MenuNav {
      z-index: 1000;
      display: flex;
      align-items: center;
      background: rgba(206, 17, 206, 0.062);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(18.2px);
      -webkit-backdrop-filter: blur(18.2px);

      padding: 10px;
      width: 100%;
      height: 60px;
      position: fixed;
      bottom: 0;
      top: auto;
      filter: drop-shadow(4px 4px 4px rgba(199, 16, 184, 0.114));
    }
    ul {
      list-style-type: none;
      padding: 0;
      margin: auto;
      height: 70%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      width: 100%;
    }
    li {
      display: flex;
      align-items: center;
      color: rgba(124, 13, 117, 0.53);
      cursor: pointer;
      transition: color 0.2s ease-in-out;
      justify-content: space-evenly;
    }
    li:hover {
      color: rgb(45, 41, 41);
    }
    i {
      font-size: 20px;
      margin-right: 5px;
      color: rgba(33, 31, 31, 0.992);
    }
    a {
      color: rgba(124, 13, 117, 0.53);
    }

    a:hover {
      color: rgb(45, 41, 41);
    }
  }
</style>
