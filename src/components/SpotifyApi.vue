<script>
export default {
  methods: {
    created() {
      fetch('https://api.spotify.com/v1/artists/7IlRNXHjoOCgEAWN5qYksg'),{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer BQBD254PsYO4zxB2IdGMjKNYs1T88g2pWgkmf2fIH9YYdv5pdUxnhveFgRYUg2gIpkmpR6WgX39B5EHyc6yTcQhjb9aLHIiKs339_Af-ivEWRE4XATdwXNk_9nXgGu1mmveCN4SgrTyN9LuNqXGqIsDTOMSrIqJtp5_e6K51bmtWchys0zfCrwey2h8'
      }
    }
      .then((response) => response.json())
      .then((result) => {
        this.data = result
        console.log(result, 'spotify')
      })
    }
   },
   data(){
    return {
      data: null
    }
   }
  }
</script>
<template>
<p>hej sposdfsgddkjldgsgdjlitify</p>
</template>
