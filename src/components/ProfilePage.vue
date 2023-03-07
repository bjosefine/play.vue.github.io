<template>
  <div flexContainer>
    <div class="pictureContainer">
      <img :src="profileImgUrl" alt="Profile picture" />
    </div>
    <h1>{{ displayName }}</h1>
  </div>
</template>

<script>
  import { getUserInfo } from '../api/spotify.js'

  export default {
    name: 'UserProfile',
    data() {
      return {
        displayName: null,
        profileImgUrl: null
      }
    },
    async created() {
      const accessToken = localStorage.getItem('access_token')
      const userInfo = await getUserInfo(accessToken)
      this.displayName = userInfo.display_name
      this.profileImgUrl = userInfo.images[0].url
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
