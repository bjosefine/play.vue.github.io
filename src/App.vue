<template>
  <div class="appContainer">
    <MenuNav />
    <p>hej hej</p>
    <main class="mainContent">
      <HeaderNav />

      <router-view />
      <button v-if="!isLoggedIn" @click="login">Login with Spotify</button>
      <div v-if="isLoggedIn">{{ displayName }}</div>
    </main>
  </div>
</template>

<script>
  import Spotify from './api/spotify.js'
  import MenuNav from './components/MenuNav.vue'
  import HeaderNav from './components/HeaderNav.vue'

  export default {
    components: {
      MenuNav,
      HeaderNav
    },
    name: 'App',
    data() {
      return {
        accessToken: null,
        displayName: null
      }
    },
    computed: {
      isLoggedIn() {
        return this.accessToken !== null && this.displayName !== null
      }
    },
    created() {
      const accessToken = localStorage.getItem('access_token')
      const displayName = localStorage.getItem('display_name')
      if (accessToken && displayName) {
        this.accessToken = accessToken
        this.displayName = displayName
      }
    },
    methods: {
      async login() {
        const authorizationUrl = Spotify.getAuthorizationUrl()
        window.location.href = authorizationUrl
      }
    }
  }
</script>

<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(198, 63, 184, 0.8) 25.52%,
      rgba(189, 173, 173, 0) 100%
    );
    background-blend-mode: darken;
  }
  #app {
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
    margin-left: 4.8%;
    box-sizing: border-box;
  }
  .MenuNav {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(30px);
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
