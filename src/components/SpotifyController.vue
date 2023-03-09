<template>
  <div>
    <div class="playerContainer">
      <p>play</p>
      <h1>{{ device }}</h1>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['getDevice']),
      device() {
        return this.getDevice
      }
    },
    created() {
      this.$store.dispatch('getDeviceId')
      console.log(this.getDevice, 'device')
      console.log(this.getDevice, 'ddds')
      console.log(this.$store.state.accessToken, 'acs')
    }
  }
</script>
