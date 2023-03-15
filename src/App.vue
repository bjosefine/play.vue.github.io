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
        newTheme: 'bubblegumTheme',
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
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  /* Dropdown toggle button */
  .dropDownTheme {
    z-index: 1000;
    position: fixed;
    right: 100px;
    margin-top: 5px;
    height: 40px;
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

  /* Tool for the themes background gradients: Gradient generator: https://cssgradient.io/ */

  /* ----------- DARK THEME ----------- */
  .darkTheme {
    background: rgb(0, 0, 0);
    background: linear-gradient(
      110deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(92, 92, 92, 1) 100%
    );
    color: white;
  }

  .darkTheme .dropdown-toggle {
    background-color: rgb(0, 0, 0, 0.1);
    color: white;
    border-color: white;
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

  .darkTheme .searchBar input[type='text'] {
    color: white;
  }

  .darkTheme .goback {
    background-color: rgba(255, 255, 255, 0.3);
  }

  /* ----------- BUBBLEGUM THEME ----------- */
  .bubblegumTheme {
    background: rgb(126, 218, 254);
    background: linear-gradient(
      110deg,
      rgba(255, 74, 210, 1) 0%,
      rgb(126, 218, 254) 100%
    );
    color: rgb(255, 255, 255);
  }

  .bubblegumTheme .dropdown-toggle {
    background-color: rgb(0, 0, 0, 0.1);
    color: white;
    border-color: white;
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

  .bubblegumTheme a {
    color: rgba(255, 255, 255, 0.8);
    transition: 0.2s ease-in-out;
  }

  .bubblegumTheme a:hover {
    color: rgb(126, 218, 254);
  }

  .bubblegumTheme .MenuNav {
    background: rgba(255, 255, 255, 0.01);
    box-shadow: 0 4px 30px rgba(255, 255, 255, 0.2);
  }

  .bubblegumTheme .searchBar input[type='text'] {
    color: white;
  }

  .bubblegumTheme .goback {
    background-color: rgba(255, 255, 255, 0.3);
  }

  /* ----------- LIGHT THEME ----------- */
  .lightTheme {
    background: rgb(161, 153, 133);
    background: linear-gradient(
      288deg,
      rgb(126, 120, 104) 0%,
      rgba(255, 251, 241, 1) 63%
    );
    color: #55756a;
  }

  .lightTheme .dropdown-toggle {
    background-color: rgba(255, 255, 255, 0.1);
    color: #55756a;
    border-color: #55756a;
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

  .lightTheme a {
    color: #55756a;
    transition: 0.2s ease-in-out;
  }

  .lightTheme a:hover {
    color: #0cbb75;
  }

  .lightTheme .MenuNav {
    background: rgba(0, 0, 0, 0.01);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  }

  .lightTheme .searchBar input[type='text'] {
    color: #55756a;
  }

  .lightTheme .goback {
    background-color: #55756a79;
  }

  /* ----------- SUNSET THEME ----------- */

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

  .sunsetTheme a {
    color: white;
    transition: 0.2s ease-in-out;
  }

  .sunsetTheme a:hover {
    color: rgb(255, 193, 58);
  }

  .sunsetTheme .MenuNav {
    background: rgba(250, 250, 250, 0.01);
    box-shadow: 0 4px 30px rgba(255, 255, 255, 0.3);
  }

  .sunsetTheme .searchBar input[type='text'] {
    color: white;
  }

  .sunsetTheme .goback {
    background-color: rgba(255, 255, 255, 0.3);
  }

  /* -----------THEME BUTTONS----------- */
  .darkBtn {
    background: linear-gradient(to right, #000000, #7b7b7b);
    width: 17px;
    height: 17px;
    border: none;
    border-bottom: 1px solid #535353;
    border-radius: 10px;
    margin-right: 5px;
  }

  .lightBtn {
    background: linear-gradient(to right, #a19985, #fffbf1);
    width: 17px;
    height: 17px;
    border: none;
    border-bottom: 1px solid #535353;
    border-radius: 10px;
    margin-right: 5px;
  }

  .bubblegumBtn {
    background: linear-gradient(to right, #ff4ad2, #7edafe);
    width: 17px;
    height: 17px;
    border: none;
    border-bottom: 1px solid #535353;
    border-radius: 10px;
    margin-right: 5px;
  }

  .sunsetBtn {
    background: linear-gradient(to right, #ff008e, #ffaf00);
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
  @media (max-width: 767px) {
    .dropDownTheme {
      right: 110px;
      height: 30px;
      width: 40px;
      margin: 4px;
      font-size: 16px;
    }
    .dropDownMenu.toggleDropdown {
      width: 90px;
    }
  }
</style>
