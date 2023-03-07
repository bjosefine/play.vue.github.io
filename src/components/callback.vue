<template>
  <div class="callback-container">
    <h1>Logging in ....</h1>
  </div>
</template>

<script>
  // Import the functions getTokenAuthorization and getUserInfo from the Spotify API
  import { getTokenAuthorization, getUserInfo } from '../api/spotify'

  export default {
    name: 'Callback',
    async mounted() {
      const loginCode = new URLSearchParams(this.$route.query).get('code') // Retrieve the login code from URL query
      const accessToken = await getTokenAuthorization(loginCode) // Get access token using the login code
      localStorage.setItem('access_token', accessToken) // Store the access token in localStorage
      const userInfo = await getUserInfo(accessToken) // Get user information using the access token
      localStorage.setItem('user_id', userInfo.id) // Store user ID in localStorage
      localStorage.setItem('display_name', userInfo.display_name) // Store user display name in localStorage
      this.$router.push('/') // Redirect to home page
    }
  }
</script>
