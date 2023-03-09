<template>
  <div class="appContainer">
    <MenuNav />
    <main class="mainContent">
      <HeaderNav :hide-go-back="hideGoBack" />

      <router-view />

      <div v-if="isAuthenticated" class="user-info">
        <button v-if="!loading" @click="Logout">Logout</button>
      </div>

      <!-- Show login button when not authenticated -->
      <button v-else @click="login">Login with Spotify</button>
    </main>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Spotify from './api/spotify.js'
  import MenuNav from './components/MenuNav.vue'
  import HeaderNav from './components/HeaderNav.vue'

  export default {
    components: {
      MenuNav,
      HeaderNav
    },
    name: 'App',
    computed: {
      ...mapGetters(['isAuthenticated', 'getUser', 'loading']), // Use Vuex mapGetters to access Vuex store state
      hideGoBack() {
        // Computed property that returns true if the current route is HomeView
        return this.$route.name === 'HomeView'
      }
    },
    methods: {
      ...mapActions(['logoutUser', 'loginUser']),
      async login() {
        // Method that redirects the user to the Spotify authorization URL
        const authorizationUrl = Spotify.getAuthorizationUrl()
        window.location.href = authorizationUrl
      },
      async Logout() {
        // Method that logs the user out
        this.$store.commit('setLoading', true) // Commit the 'setLoading' mutation to true
        await this.$store.dispatch('logoutUser') // Dispatch the 'logoutUser' action to log out the user
        localStorage.removeItem('access_token') // Remove access token from local storage
        localStorage.removeItem('user_id') // Remove user ID from local storage
        this.$router.push('/') // Redirect user to HomeView
      }
    },
    created() {
      const accessToken = localStorage.getItem('access_token') // Get the access token from local storage
      if (accessToken) {
        // If an access token is found
        this.$store.commit('setAccessToken', accessToken) // Commit the access token to Vuex store state
        this.$store.dispatch('getUserInfo', accessToken) // Dispatch the getUserInfo action to retrieve user information
        this.$store.commit('setAuthenticated', true) // Commit the 'setAuthenticated' mutation to true to indicate that the user is logged in
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
