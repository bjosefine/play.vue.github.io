<template>
  <div class="mainnav" :class="{ 'navbar--visible': scrolled }">
    <div class="goback" @click="goBack" v-if="!hideGoBack && scrolled">
      <i class="bi bi-arrow-left-circle-fill" />
    </div>

    <div class="headprofile" />
    <div class="wheel" />
    <div class="nav-content">
      <div v-if="isAuthenticated" class="logInOut">
        <button class="logInOut" v-if="!loading" @click="Logout">
          Log out
        </button>
      </div>
      <button class="logInOut" v-else @click="login">Log In</button>
      <!-- <div class="settings">
        <router-link to="/settings">
          <span class="bi bi-gear" />
        </router-link>
      </div> -->
      <!-- Show login button when not authenticated -->
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Spotify from '../api/spotify.js'
  export default {
    data() {
      return {
        scrolled: false
      }
    },
    props: {
      hideGoBack: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'getUser', 'loading']) // Use Vuex mapGetters to access Vuex store state
      // hideGoBack() {
      //   // Computed property that returns true if the current route is HomeView
      //   return this.$route.name === 'HomeView'
      // }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
    },

    methods: {
      handleScroll() {
        this.scrolled = window.scrollY > 0
      },
      goBack() {
        this.$router.go(-1)
      },
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

<style scoped>
  .nav-content {
    display: flex;
    justify-content: right;
    align-items: end;
  }
  .logInOut {
    display: flex;
    justify-content: end;
    height: 40px;
    margin: 5px;
    align-items: center;
    /* color: purple; */
    margin: 5px;
    /* background: rgba(206, 17, 206, 0.062); */
    /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
    backdrop-filter: blur(18.2px);
    -webkit-backdrop-filter: blur(18.2px);
  }
  /* button {

  } */
  .mainnav {
    position: fixed;
    width: 100%;
    height: 50px;
    background-color: transparent;
    text-align: center;
    transition: background-color 0.3s;
    z-index: 1000;
  }

  .navbar--visible {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
    color: rgb(111, 13, 13);
    transition: background-color 0.3s;
    /* background: rgba(206, 17, 206, 0.062); */
  }

  .goback {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(240, 41, 226, 0.199);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    color: #fff;
    position: fixed;
    cursor: pointer;
    margin-left: 1%;
    margin-top: 5px;
  }

  .goback:hover {
    transform: scale(1.2);
    transition: 0.3s;
  }

  /* .settings {
    display: flex;
    align-items: center;
    justify-content: right;
    width: 95%;
    padding-right: 30px;

  .settings {
    height: 50px;
  }

  span {
    font-size: 20px;
  } */
  @media (max-width: 767px) {
    .logInOut {
      display: flex;
      justify-content: end;
      height: 30px;
      margin: 4px;
      align-items: center;
      font-size: 20px;
    }
  }
</style>
