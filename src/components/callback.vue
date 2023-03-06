<template>
  <div class="callback-container">
    <h1>Logging in to Spotify...</h1>
  </div>
</template>

<script>
  import { getToken, getUserInfo } from '../api/spotify'

  export default {
    name: 'Callback',

    async mounted() {
      try {
        // Get access token from the URL hash
        const hashParams = new URLSearchParams(window.location.hash.substr(1))
        const accessToken = hashParams.get('access_token')
        if (!accessToken) {
          throw new Error('Access token not found')
        }

        // Store access token in local storage
        localStorage.setItem('access_token', accessToken)

        // Get user information with the access token
        const userInfo = await getUserInfo(accessToken)

        // Store user information in local storage
        localStorage.setItem('user_id', userInfo.id)
        localStorage.setItem('display_name', userInfo.display_name)

        // Redirect to home page
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        alert('Unable to log in. Please try again later.')
      }
    }
  }
</script>
