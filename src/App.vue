<template>
  <div class="appContainer" :class="newTheme">
    <MenuNav />
    <main class="mainContent">
      <HeaderNav :hide-go-back="hideGoBack" />
      <div class="dropDownTheme">
        <button class="dropdown-toggle" @click="toggleDropdown">
          <i class="bi bi-gear" />
        </button>
        <div class="dropDownMenu" :class="{ toggleDropdown: settings }">
          <button class="darkBtn" @click="newTheme = 'darkTheme'" />

          <button class="bubblegumBtn" @click="newTheme = 'bubblegumTheme'" />

          <button class="lightBtn" @click="newTheme = 'lightTheme'" />

          <button class="sunsetBtn" @click="newTheme = 'sunsetTheme'" />
        </div>
      </div>

      <router-view />
      <SpotifyPlayer v-if="isAuthenticated" />
    </main>
  </div>
</template>

<script>
  // import { mapGetters, mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  // import Spotify from './api/spotify.js'
  import MenuNav from './components/MenuNav.vue'
  import HeaderNav from './components/HeaderNav.vue'
  import SpotifyPlayer from './components/SpotifyPlayer.vue'

  export default {
    data() {
      return {
        newTheme: 'lightTheme',
        settings: false
      }
    },
    methods: {
      toggleDropdown() {
        this.settings = !this.settings
      }
    },
    components: {
      MenuNav,
      HeaderNav,
      SpotifyPlayer
    },
    name: 'App',
    computed: {
      ...mapGetters(['isAuthenticated', 'getUser', 'loading']) // Use Vuex mapGetters to access Vuex store state
      // hideGoBack() {
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
    }
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
  .dropDownTheme {
    z-index: 1000;
    position: fixed;
    right: 100px;
    margin-top: 5px;
  }
  .dropDownMenu {
    height: 0;
    overflow: hidden;
  }
  .dropDownMenu.toggleDropdown {
    height: 50px;
  }

  .dropdown-toggle {
    border-style: solid;
    border-radius: 10px;
    border-width: 1px;
    height: 42px;
    padding-left: 10px;
    padding-right: 10px;
  }
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

  .darkTheme .dropdown-toggle {
    background-color: rgb(0, 0, 0, 0.1);
    color: white;
    border-color: white;
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
    background: rgb(161, 153, 133);
    background: linear-gradient(
      288deg,
      rgba(161, 153, 133, 1) 0%,
      rgba(255, 251, 241, 1) 63%
    );
    color: #55756a;
  }

  .lightTheme .logInOut {
    background-color: rgba(255, 255, 255, 0.1);
    border-width: 1px;
    border-color: #55756a;
    border-style: solid;
    color: #55756a;
    font-weight: lighter;
    padding: 20px;
    border-radius: 10px;
  }

  .lightTheme .dropdown-toggle {
    background-color: rgba(255, 255, 255, 0.1);
    color: #55756a;
    border-color: #55756a;
  }

  .lightTheme a {
    color: #55756a;
  }

  .lightTheme .searchBar input[type='text'] {
    color: #55756a;
  }

  /* LIGHT THEME END */
  /* BUBBLEGUM THEME START */
  .bubblegumTheme {
    background: rgb(140, 144, 218);
    background: linear-gradient(
      122deg,
      rgba(140, 144, 218, 1) 0%,
      rgba(255, 46, 224, 1) 100%
    );
    color: rgba(255, 255, 255, 0.8);
  }

  .bubblegumTheme a {
    color: rgba(255, 255, 255, 0.8);
  }

  .bubblegumTheme .logInOut {
    background-color: rgb(0, 0, 0, 0.1);
    border-width: 1px;
    border-color: rgb(255, 255, 255);
    border-style: solid;
    color: rgb(255, 255, 255);
    font-weight: lighter;
    padding: 20px;
    border-radius: 10px;
  }

  .bubblegumTheme .MenuNav {
    background: rgba(255, 255, 255, 0.01);
    box-shadow: 0 4px 30px rgba(255, 255, 255, 0.2);
  }

  .bubblegumTheme .dropdown-toggle {
    background-color: rgb(0, 0, 0, 0.1);
    color: white;
    border-color: white;
  }

  .bubblegumTheme .searchBar input[type='text'] {
    color: white;
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

  .sunsetTheme .dropdown-toggle {
    background-color: rgb(0, 0, 0, 0.1);
    color: white;
    border-color: white;
  }

  .sunsetTheme .searchBar input[type='text'] {
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
    border-radius: 10px;
    margin-right: 5px;
  }

  .lightBtn {
    background-color: rgb(255, 251, 241, 1);
    width: 17px;
    height: 17px;
    border: none;
    border-bottom: 1px solid #535353;
    border-radius: 10px;
    margin-right: 5px;
  }

  .bubblegumBtn {
    background-color: rgb(198, 63, 184, 0.8);
    width: 17px;
    height: 17px;
    border: none;
    border-bottom: 1px solid #535353;
    border-radius: 10px;
    margin-right: 5px;
  }

  .sunsetBtn {
    background-color: rgb(255, 0, 142);
    width: 17px;
    height: 17px;
    border: none;
    border-bottom: 1px solid #535353;
    border-radius: 10px;
  }

  .smallContainer {
    width: 100%;
    margin-top: 50px;
    background-color: red;
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
