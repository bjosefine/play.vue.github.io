<template>
  <div class="callback-container">
    <h1>Logging in ....</h1>
  </div>
</template>

<script>
  // Import the functions getTokenAuthorization and getUserInfo from the Spotify API

  export default {
    name: 'CallBack',

    async mounted() {
      const loginCode = new URLSearchParams(this.$route.query).get('code')
      await this.$store.dispatch('loginUser', loginCode)
      this.$router.push('/')
    }
  }
</script>
