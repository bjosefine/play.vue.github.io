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
        const hashParams = new URLSearchParams(window.location.hash.substr(1))
        const accessToken = hashParams.get('access_token')
        if (!accessToken) {
          throw new Error('Access token not found')
        }

        localStorage.setItem('access_token', accessToken)

        const userInfo = await getUserInfo(accessToken)

        localStorage.setItem('user_id', userInfo.id)
        localStorage.setItem('display_name', userInfo.display_name)

        this.$router.push('/')
      } catch (error) {
        console.error(error)
        alert('Unable to log in. Please try again later.')
      }
    }
  }
</script>
