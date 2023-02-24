<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Spotify from "./api/spotify.js" 

export default {
  name: "App",
  data() {
    return {
      accessToken: null
    };
  },
  methods: {
    async login() {
      const token = await Spotify.getToken();
      if (token) {
        this.accessToken = token;
        this.$router.push({ name: "home" });
      }
    }
    
  }
};
</script>

<style>
#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: large;
  text-align: center;
  background: radial-gradient(50% 50% at 50% 50%, rgba(198, 63, 184, 0.8) 25.52%, rgba(189, 173, 173, 0) 100%);
  background-blend-mode: darken;
}


</style>