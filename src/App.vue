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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>