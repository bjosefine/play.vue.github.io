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
  .appContainer {
    display: flex;
    flex-direction: row;
  }

  .mainContent {
    flex-grow: 1;
    margin-left: 3rem;
    padding: 1rem;
    box-sizing: border-box;
  }
  .MenuNav {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(221, 31, 110, 0.027);
    background: rgba(206, 17, 206, 0.062);
    box-shadow: 0 4px 30px rgba(213, 14, 170, 0.132);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-bottom: 1px solid #535353;
    padding: 10px;
    width: 60px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    filter: drop-shadow(4px 4px 4px rgba(199, 16, 184, 0.114));
  }
</style>
