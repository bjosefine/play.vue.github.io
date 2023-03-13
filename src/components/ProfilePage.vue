<template>
  <div class="home">
    <!-- flexbox for header -->
    <div class="profileFlexContainer">
      <!-- container for profile picture -->
      <div class="pictureContainer">
        <img
          class="profilePicture"
          :src="profileImgUrl"
          alt="Profile picture"
        />
      </div>
      <!-- end of picture container -->
      <!-- user name -->
      <h1 class="profileUserName">{{ user.display_name }}</h1>
    </div>
    <div class="userPlaylistContainer" v-if="playlists">
      <h1 class="userPlaylistHeading">My playlists</h1>
      <!-- user playlists -->
      <div class="userPalylistCollection">
        <div
          v-for="playlist in playlists"
          :key="playlist.id"
          class="playlistCollection"
        >
          <!-- makes the playlists clickable -->
          <router-link
            :to="{ name: 'playlist', params: { id: playlist.id } }"
            class="playlistLink"
          >
            <!-- container for playlist image and playlist name -->
            <div class="paylistImageAndName">
              <img :src="playlist.images[0].url" alt="playlist.name" />
              <p class="nameOfPlaylist">{{ playlist.name }}</p>
            </div>
          </router-link>
        </div>
      </div>
      <!-- end of playlists -->
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

  .profileUserName {
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
    color: black;
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

  /* from tablets smallest measurement to desktop smallest measurement */
  @media (min-width: 481px) and (max-width: 767px) {
    .home {
      padding: 0;
    }
    .profileFlexContainer {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      margin-left: 50%;
      margin-bottom: 2rem;
    }

    .profileUserName {
      font-size: 20px;
      margin-bottom: 0;
    }

    .profilePicture {
      width: 210px;
      height: 210px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0;
    }

    .userPlaylistHeading {
      font-size: 16px;
      margin-bottom: 0;
      margin-top: 0;
    }

    .playlistCollection {
      max-width: 200px;
      height: 200px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .paylistImageAndName {
      /* width: 100%; */
      max-width: 150px;
      height: 150px;
      margin: 0 auto;
    }

    .nameOfPlaylist {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      color: black;
      width: 150px;
    }
  }

  /* mobile version, from 0 to smallest tablet */
  @media (max-width: 480px) {
    .home {
      padding: 0;
    }

    main {
      margin-left: 0;
    }
    .profileFlexContainer {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-bottom: 0;
      margin-left: 50%;
      margin-right: 50%;
    }

    .profileUserName {
      font-size: 20px;
      margin-bottom: 2rem;
    }

    .userPlaylistHeading {
      font-size: 16px;
      margin-bottom: 0;
      margin-top: 0;
    }

    .profilePicture {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin: 0;
    }

    .playlistCollection {
      max-width: 150px;
      height: 150px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .paylistImageAndName {
      max-width: 100%;
      height: auto;
      margin: 0 auto;
    }

    .nameOfPlaylist {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      color: black;
      width: 150px;
    }

    .userPalylistCollection {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 25px;
      margin-bottom: 50px;
    }
  }
</style>
