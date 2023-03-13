<template>
  <div class="home">
    <div class="profileFlexContainer">
      <div class="pictureContainer">
        <img
          class="profilePicture"
          :src="profileImgUrl"
          alt="Profile picture"
        />
      </div>

      <h1 class="profileUserName">{{ user.display_name }}</h1>
    </div>
    <div class="userPlaylistContainer" v-if="playlists">
      <h1 class="userPlaylistHeading">My playlists</h1>
      <div class="userPalylistCollection">
        <div
          v-for="playlist in playlists"
          :key="playlist.id"
          class="playlistCollection"
        >
          <router-link
            :to="{ name: 'playlist', params: { id: playlist.id } }"
            class="playlistLink"
          >
            <div class="paylistImageAndName">
              <img :src="playlist.images[0].url" alt="playlist.name" />
              <p class="nameOfPlaylist">{{ playlist.name }}</p>
            </div>
          </router-link>
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
    padding: 2rem;
  }

  .profileFlexContainer {
    display: flex;
    width: 50%;
    justify-content: left;
    margin-bottom: 4rem;
    margin-right: 50%;
    margin-left: 15rem;
    align-items: baseline;
  }

  .profileHeading {
    font-size: 36px;
  }

  .userPlaylistHeading {
    font-size: 36px;
    margin-bottom: 0;
  }

  .nameOfPlaylist {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    /* color: black; */
    width: 210px;
  }

  .profilePicture {
    width: 210px;
    height: 210px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 4rem;
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
