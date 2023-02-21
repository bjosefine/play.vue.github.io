<script>
  export default {
    props: {
      msg: {
        required: true,
        type: String
      }
    }
  }
</script>

<style>
  p {
    font-weight: bold;
  }
</style>

<template>
  <h1>Tjoho!</h1>
  <img alt="" src="/assets/fox.jpeg" />
  <p>{{ msg }}</p>
</template>
