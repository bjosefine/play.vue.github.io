<template>
  <div class="appContainer" :class="newTheme">
    <MenuNav />
    <main class="mainContent">
      <HeaderNav :hide-go-back="hideGoBack" />
      <SpotifyPlayer />

      <div class="smallContainer">
        <button class="darkBtn" @click="newTheme = 'darkTheme'" />

        <button class="lightBtn" @click="newTheme = 'lightTheme'" />

        <button class="bubblegumBtn" @click="newTheme = 'bubblegumTheme'" />
      </div>

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
  import SpotifyPlayer from './components/SpotifyPlayer.vue'

  export default {
    data() {
      return {
        newTheme: 'lightTheme'
      }
    },

    components: {
      MenuNav,
      HeaderNav,
      SpotifyPlayer
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
  /* body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(198, 63, 184, 0.8) 25.52%,
      rgba(189, 173, 173, 0) 100%
    );
    background-blend-mode: darken;
  } */
  .darkTheme {
    background-color: rgb(45, 45, 45);
    color: white;
  }

  .lightTheme {
    background-color: rgb(216, 216, 216);
    color: #2b2b2b;
  }

  .bubblegumTheme {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(198, 63, 184, 0.8) 25.52%,
      rgba(189, 173, 173, 0) 100%
    );
  }

  .darkBtn {
    background-color: rgb(0, 0, 0);
    width: 17px;
    height: 17px;
    border: none;
    border-bottom: 1px solid #535353;
  }

  .lightBtn {
    background-color: rgb(255, 255, 255);
    width: 17px;
    height: 17px;
    border: none;
    border-bottom: 1px solid #535353;
  }

  .bubblegumBtn {
    background-color: rgb(198, 63, 184, 0.8);
    width: 17px;
    height: 17px;
    border: none;
    border-bottom: 1px solid #535353;
  }

  .smallContainer {
    width: 100%;
  }

  #app {
    font-size: large;
    text-align: center;
  }
  .appContainer {
    display: flex;
    flex-direction: row;
  }

  .mainContent {
    flex-grow: 1;
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
