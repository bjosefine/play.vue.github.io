<template>
  <div class="appContainer" :class="newTheme">
    <MenuNav />
    <main class="mainContent">
      <HeaderNav :hide-go-back="hideGoBack" />
      <SpotifyPlayer v-if="isAuthenticated" />

      <div class="smallContainer">
        <button class="darkBtn" @click="newTheme = 'darkTheme'" />

        <button class="lightBtn" @click="newTheme = 'lightTheme'" />

        <button class="bubblegumBtn" @click="newTheme = 'bubblegumTheme'" />

        <button class="sunsetBtn" @click="newTheme = 'sunsetTheme'" />
      </div>

      <router-view />
    </main>
  </div>
</template>

<script>
  // import { mapGetters, mapActions } from 'vuex'
  // import Spotify from './api/spotify.js'
  import MenuNav from './components/MenuNav.vue'
  import HeaderNav from './components/HeaderNav.vue'
  import SpotifyPlayer from './components/SpotifyPlayer.vue'

  export default {
    data() {
      return {
        newTheme: 'sunsetTheme'
      }
    },

    components: {
      MenuNav,
      HeaderNav,
      SpotifyPlayer
    },
    name: 'App'
    // computed: {
    //   ...mapGetters(['isAuthenticated', 'getUser', 'loading']), // Use Vuex mapGetters to access Vuex store state
    //   hideGoBack() {
    //     // Computed property that returns true if the current route is HomeView
    //     return this.$route.name === 'HomeView'
    //   }
    // },
    // methods: {
    //   ...mapActions(['logoutUser', 'loginUser']),
    //   async login() {
    //     // Method that redirects the user to the Spotify authorization URL
    //     const authorizationUrl = Spotify.getAuthorizationUrl()
    //     window.location.href = authorizationUrl
    //   },
    //   async Logout() {
    //     // Method that logs the user out
    //     this.$store.commit('setLoading', true) // Commit the 'setLoading' mutation to true
    //     await this.$store.dispatch('logoutUser') // Dispatch the 'logoutUser' action to log out the user
    //     localStorage.removeItem('access_token') // Remove access token from local storage
    //     localStorage.removeItem('user_id') // Remove user ID from local storage
    //     this.$router.push('/') // Redirect user to HomeView
    //   }
    // },
    // created() {
    //   const accessToken = localStorage.getItem('access_token') // Get the access token from local storage
    //   if (accessToken) {
    //     // If an access token is found
    //     this.$store.commit('setAccessToken', accessToken) // Commit the access token to Vuex store state
    //     this.$store.dispatch('getUserInfo', accessToken) // Dispatch the getUserInfo action to retrieve user information
    //     this.$store.commit('setAuthenticated', true) // Commit the 'setAuthenticated' mutation to true to indicate that the user is logged in
    //   }
    // }
  }
</script>

<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  /* Gradient generator: https://cssgradient.io/ */

  /* DARK THEME START */
  .darkTheme {
    background: rgb(92, 92, 92);
    background: linear-gradient(
      301deg,
      rgba(92, 92, 92, 1) 0%,
      rgba(0, 0, 0, 1) 100%
    );
    color: white;
  }

  .darkTheme a {
    color: white;
    transition: 0.2s ease-in-out;
  }

  .darkTheme a:hover {
    color: rgb(175, 175, 175);
  }

  .darkTheme .MenuNav {
    background: rgba(255, 255, 255, 0.01);
    box-shadow: 0 4px 30px rgba(255, 255, 255, 0.2);
  }

  .darkTheme .logInOut {
    background-color: rgb(0, 0, 0, 0.1);
    border-width: 1px;
    border-color: white;
    border-style: solid;
    color: white;
    font-weight: lighter;
    padding: 20px;
    border-radius: 10px;
  }

  .darkTheme .searchBar input[type='text'] {
    color: white;
  }

  /* DARK THEME END */

  /* LIGHT THEME START */
  .lightTheme {
    background-color: rgb(255, 255, 255);
    color: #2b2b2b;
  }

  .lightTheme a {
    color: #2b2b2b;
  }

  /* LIGHT THEME END */
  /* BUBBLEGUM THEME START */
  .bubblegumTheme {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(198, 63, 184, 0.8) 25.52%,
      rgba(189, 173, 173, 0) 100%
    );
    color: rgba(106, 33, 99, 0.8);
  }

  .bubblegumTheme a {
    color: rgba(106, 33, 99, 0.8);
  }

  /* BUBBLEGUM THEME END */

  /* SUNSET THEME START */

  .sunsetTheme {
    background: rgb(255, 0, 142);
    background: linear-gradient(
      90deg,
      rgba(255, 0, 142, 1) 0%,
      rgba(255, 175, 0, 1) 100%
    );
    color: white;
  }

  .sunsetTheme a {
    color: white;
    transition: 0.2s ease-in-out;
  }

  .sunsetTheme a:hover {
    color: rgb(255, 228, 118);
  }

  .sunsetTheme .MenuNav {
    background: rgba(255, 229, 84, 0.3);
    box-shadow: 0 4px 30px rgba(255, 229, 84, 0.646);
  }

  .sunsetTheme .logInOut {
    background-color: rgb(0, 0, 0, 0.1);
    border-width: 1px;
    border-color: white;
    border-style: solid;
    color: white;
    font-weight: lighter;
    padding: 20px;
    border-radius: 10px;
  }

  /* THEME BUTTONS */
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

  .sunsetBtn {
    background-color: orange;
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
    backdrop-filter: blur(30px);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-bottom: 1px solid #535353;
    padding: 10px;
    width: 60px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
