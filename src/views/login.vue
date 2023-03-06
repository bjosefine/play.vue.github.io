<template>
  <div class="login-container">
    <h1>Login to Spotify</h1>
    <button @click="handleClick">Connect with Spotify</button>
  </div>
</template>

<script>
  import { clientId } from '../api/spotify'

  export default {
    name: 'Login',

    methods: {
      handleClick() {
        const redirect_uri = 'http://localhost:8080/callback'
        const api_uri = 'https://accounts.spotify.com/authorize'
        const scope =
          'user-read-private user-read-email user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-recently-played user-top-read'
        const url = `${api_uri}?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token`
        window.location.href = url
      }
    }
  }
</script>

<style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  button {
    padding: 20px 40px;
    background-color: #1db954;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  button:hover {
    background-color: #1ed760;
  }
</style>
