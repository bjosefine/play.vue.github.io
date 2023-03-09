<template>
  <div flexContainer>
    <div class="pictureContainer">
      <img :src="profileImgUrl" alt="Profile picture" />
    </div>
    <h1 class="profileUserName">Name: {{ user.display_name }}</h1>
    <h1>playlists</h1>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'UserProfile',
    computed: {
      ...mapGetters(['getUser']),
      user() {
        return this.getUser
      },
      profileImgUrl() {
        return this.user.images[0]?.url ?? ''
      }
    },
    created() {
      this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style>
  .pictureContainer {
    background-color: rgba(208, 145, 187, 0.2);
    width: 145px;
    height: 145px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 5rem;
    margin-left: 5rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
