<template>
  <div>
    <div class="playerContainer">
      <p>play</p>
    </div>
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
      console.log(deviceId, 'sdsds')
      console.log(this.device, 'dss')
      console.log(accessToken, 'jk')
    }
  }
</script>
