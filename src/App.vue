<template>
  <div class="app-container">
    <MenuNav />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
  import Spotify from './api/spotify.js'
  import MenuNav from './components/MenuNav.vue'

  export default {
    components: {
      MenuNav
    },
    name: 'App',
    data() {
      return {
        accessToken: null
      }
    },
    methods: {
      async login() {
        const token = await Spotify.getToken()
        if (token) {
          this.accessToken = token
          this.$router.push({ name: 'home' })
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #000;
    font-size: large;
    text-align: center;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(198, 63, 184, 0.8) 25.52%,
      rgba(189, 173, 173, 0) 100%
    );
    background-blend-mode: darken;
  }
  .app-container {
    display: flex;
    flex-direction: row;
  }

  .main-content {
    flex-grow: 1;
    margin-left: 20rem;
    padding: 1rem;
    box-sizing: border-box;
  }

  .MenuNav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    width: 15rem;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(241, 179, 241);
  }
</style>
