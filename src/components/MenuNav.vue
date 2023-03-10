<template>
  <div class="MenuNav">
    <ul>
      <!-- Link to home page -->
      <router-link to="/" active-class="highlight">
        <template #default>
          <i class="bi bi-house" />
        </template>
      </router-link>

      <!-- Link to search page -->
      <router-link to="/search" active-class="highlight">
        <template #default>
          <i class="bi bi-search" />
        </template>
      </router-link>

      <!-- Link to profile page, only visible when authenticated -->
      <router-link
        v-if="isAuthenticated"
        to="/profile"
        active-class="highlight"
      >
        <template #default>
          <i class="bi bi-person" />
        </template>
      </router-link>

      <!-- Icon for featured playlists, currently not linked -->
      <i class="bi bi-music-note-list" />
    </ul>
  </div>
</template>

<script>
  import spotify from '../api/spotify.js'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
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
  .highlight {
    border-radius: 10px;
    background: rgba(206, 17, 206, 0.245);
    box-shadow: 0 0 10px 10px rgba(206, 17, 206, 0.4);
  }

  /*Media query from tablet down to mobile mode so the side navbar ends up at the bottom*/
  @media (max-width: 767px) {
    .highlight {
      border-radius: 10px;
      background: rgba(206, 17, 206, 0.44);
      box-shadow: 0 0 10px 10px rgba(206, 17, 206, 0.4);
    }
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
