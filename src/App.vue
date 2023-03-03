<template>
  <div class="appContainer">
    <MenuNav />
    <main class="mainContent">
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
  body {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(198, 63, 184, 0.8) 25.52%,
      rgba(189, 173, 173, 0) 100%
    );
    background-blend-mode: darken;
  }
  #app {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #000;
    font-size: large;
    text-align: center;
  }
  .appContainer {
    display: flex;
    flex-direction: row;
  }

  .mainContent {
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
    background: rgba(221, 31, 109, 0.2);

    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(221, 31, 109, 0.3);
    background: rgba(221, 31, 109, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(221, 31, 109, 0.3);
  }
</style>
