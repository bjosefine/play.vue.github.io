<template>
  <div class="playerContaine">
    <p>play</p>
  </div>
</template>
<script>
  import { getDeviceId } from '../api/spotify.js'
  export default {
    data() {
      return {
        device: null
      }
    },

    async created() {
      const accessToken = this.$store.state.accessToken
      const deviceId = await getDeviceId(accessToken)
      this.device = deviceId
      console.log(this.device, 'device comp')
    }
  }
</script>
