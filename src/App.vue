<template>
  <div class="appContainer">
    <MenuNav />
    <main class="mainContent">
      <HeaderNav :hide-go-back="hideGoBack" />

      <router-view />
      <button v-if="!isLoggedIn" @click="login">Login with Spotify</button>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
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
      },
      hideGoBack() {
        return this.$route.name === 'HomeView'
      }
    },
    mounted() {
      this.checkLoginStatus()
    },
    methods: {
      async login() {
        const authorizationUrl = Spotify.getAuthorizationUrl()
        window.location.href = authorizationUrl
      },
      logout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('display_name')
        this.checkLoginStatus()
        this.$router.push('/')
      },
      checkLoginStatus() {
        const accessToken = localStorage.getItem('access_token')
        const displayName = localStorage.getItem('display_name')
        this.accessToken = accessToken
        this.displayName = displayName
      }
    }
  }
</script>

<style>
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
