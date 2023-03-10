<template>
  <div class="home">
    <div flexContainer>
      <div class="pictureContainer">
        <img
          class="profilePicture"
          :src="profileImgUrl"
          alt="Profile picture"
        />
      </div>
      <h1 class="profileUserName">Name: {{ user.display_name }}</h1>
      <h1>User playlists</h1>
    </div>
    <div class="userPlaylistContainer" v-if="playlists">
      <div class="userPalylistCollection">
        <div
          v-for="playlist in playlists"
          :key="playlist.id"
          class="playlistCollection"
        >
          <div class="paylistImageAndName">
            <img :src="playlist.images[0].url" alt="playlist.name" />
            <p class="nameOfPlaylist">{{ playlist.name }}</p>
          </div>
        </div>
      </div>
      <!-- <div class="loading" v-else>Loading...</div> -->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getUserPlaylist } from '../api/spotify'

  export default {
    name: 'UserProfile',
    data() {
      return {
        userProfile: null,
        playlists: null
      }
    },
    mounted() {
      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        return
      }
      this.userPlaylist(accessToken)
    },
    computed: {
      ...mapGetters(['getUser']),
      user() {
        return this.getUser
      },
      profileImgUrl() {
        return this.user.images[0]?.url
      }
    },
    async created() {
      this.$store.dispatch('getUserInfo')
    },
    methods: {
      async userPlaylist(accessToken) {
        const playlists = await getUserPlaylist(accessToken)
        this.playlists = playlists.items
      }
    }
  }
</script>

<style>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .nameOfPlaylist {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    color: black;
  }

  .pictureContainer {
    background-color: rgba(208, 145, 187, 0.2);
    width: 145px;
    height: 145px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 5rem;
    margin-left: 5rem;
  }

  .profilePicture {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .userPlaylistContainer {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
  }

  .userPalylistCollection {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
  }

  .playlistCollection {
    max-width: 200px;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .playlistCollection:hover {
    transform: scale(1.05);
  }

  .paylistImageAndName {
    width: 100%;
    max-width: 230px;
    height: 200px;
    margin: 0 auto;
  }

  .paylistImageAndName img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 5px 13px 13px -3px rgba(0, 0, 0, 0.25);
    border-radius: 13px;
  }
</style>
