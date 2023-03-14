<template>
  <div class="artistPage">
    <!-- ARTIST HEADER -->
    <div class="artistHeader">
      <!-- Artist Image -->
      <div class="artistImage">
        <img :src="artistProfile.images[1].url" alt="Artist Image" />
      </div>
      <!-- Artist profile details -->
      <div class="artistDetails">
        <!-- Artist name -->
        <h1 class="playlistName">{{ artistProfile.name }}</h1>
        <!-- Artist followers -->
        <p class="artistFollowers">
          {{ artistProfile.followers.total }} followers
        </p>
      </div>
    </div>

    <div class="artistContent">
      <div class="popularSongs">
        <!-- Text for Popular songs -->
        <h2 class="sectionTitle">Popular songs</h2>

        <!-- Songlist -->
        <div class="playlist">
          <ol class="songList">
            <!-- Loop for tracks -->
            <li
              v-for="(track, index) in artistTracks.slice(0, 5)"
              :key="index"
              :class="{ selected: index === selectedTrackIndex }"
              class="trackItem"
              @click="playTrack(index)"
            >
              <div class="trackInfo">
                <!-- Track Image -->
                <div class="songImage">
                  <img :src="track.album.images[0].url" alt="Song Image" />
                </div>
                <!-- Track Title -->
                <div class="trackTitle">
                  <div class="animateTrackName">
                    {{ track.name }}
                  </div>
                </div>

                <!-- Track length -->
                <div class="trackLength">
                  {{ formatDuration(track.duration_ms) }}
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <!-- Artist Albums -->
      <div class="albums">
        <!-- Title -->
        <h2 class="sectionTitle">Albums</h2>
        <!-- Album list -->
        <div class="albumContainer">
          <ul class="albumList">
            <li v-for="album in artistAlbums" :key="album.id" class="albumItem">
              <div class="albumDetails">
                <!-- Album image -->
                <div class="albumImage">
                  <router-link :to="`/album/${album.id}`" class="albumPicture">
                    <img :src="album.images[0].url" alt="Album Image" />
                  </router-link>
                </div>
                <!-- Album name and release date -->
                <div class="albumInfo">
                  <h3 class="albumName">{{ album.name }}</h3>
                  <p class="albumReleaseDate">{{ album.release_date }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- End of Albums div -->
    </div>
  </div>
  <!-- Player controller -->
  <div v-if="selectedTrackIndex !== null">
    <PlayerController
      :key="artistTracks[selectedTrackIndex].id"
      :track="artistTracks[selectedTrackIndex]"
      :audio="audio"
      :autoplay="autoplay"
      @play-next="playNext()"
      @play-prev="playPrev()"
    />
  </div>
</template>

<script>
  import spotify from '../api/spotify.js'
  import PlayerController from '../components/PlayerController.vue'

  export default {
    components: {
      PlayerController
    },
    data() {
      return {
        artistProfile: null,
        artistAlbums: null,
        artistTracks: null,
        playlist: null,
        tracks: null,
        selectedTrackIndex: null,
        autoplay: true,
        isPlaying: false,
        audio: new Audio()
      }
    },

    methods: {
      formatDuration(durationMs) {
        const minutes = Math.floor(durationMs / 1000 / 60)
        const seconds = Math.floor((durationMs / 1000) % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      },
      // play track from list
      playTrack(index) {
        if (index === this.selectedTrackIndex) {
          return
        }

        this.selectedTrackIndex = index
        this.isPlaying = true
        console.log(this.selectedTrackIndex, 'current')
        console.log(this.tracks, 'tracksdata')
      },
      // play next track in list
      playNext() {
        this.selectedTrackIndex = this.selectedTrackIndex + 1
        console.log(this.selectedTrackIndex + 1, 'test next')
      },
      // play previous track in list
      playPrev() {
        this.selectedTrackIndex = this.selectedTrackIndex - 1
        console.log(this.selectedTrackIndex - 1, 'test prev')
      }
    },

    async created() {
      const artistId = this.$route.params.id
      this.artistProfile = await spotify.getArtists(artistId)
      this.artistAlbums = await spotify.getArtistsAlbums(artistId)
      this.artistTracks = await spotify.getToptracks(artistId)
      this.tracks = this.artistTracks
      console.log(this.artistTracks, 'url')
      console.log(this.artistAlbums[0].uri, 'uri artistAlbums')
      console.log(this.artistTracks[0].uri, 'uri artistTrack')
    }
  }
</script>

<style scoped>
  .trackInfo {
    /* changed from flex to grid */
    display: grid;
    justify-items: start;
    align-items: center;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(35px, auto);
    grid-template-areas: 'trackImage trackImage trackTitle  trackArtist trackArtist trackLength';
    margin-right: auto;
  }
  .playerContainer {
    background: rgba(138, 51, 138, 0.02);
    border-radius: 3px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
  }

  /* Artist Header */
  .artistPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  .artistHeader {
    display: flex;
    width: 50%;
    justify-content: left;
    margin-bottom: 2rem;
    padding: 0;
    margin-right: 50%;
  }

  .artistImage {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: auto;
  }

  .artistImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .artistDetails {
    display: flex;
    height: 300px;

    flex-direction: column;
    font-size: 4rem;
  }
  .artistName h1 {
    font-size: 4rem;
  }
  .artistName {
    margin-bottom: 0.5rem;
    /* color: rgb(58, 57, 57); */
  }

  .artistFollowers {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    /* color: black; */
  }

  .artistGenres {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .popularSongs {
    margin-bottom: 2rem;

    width: 100%;
  }

  .sectionTitle {
    font-size: 2.5rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
    width: 100%;
    display: flex;
    /* color: rgb(21, 20, 20); */
  }

  /* .songList {
        list-style: none;
        padding: 0;
        margin: 0;
      } */

  .songItem {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .songImage {
    width: 64px;
    height: 64px;
    margin-right: 1rem;
    overflow: hidden;
    border-radius: 4px;
  }

  .songImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .songInfo {
    display: flex;
    flex-direction: column;
  }
  .songName {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .songAlbum {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .songReleaseDate {
    font-size: 1rem;
  }

  /* ALBUMS */
  /* .playlistname {
    color: rgb(58, 57, 57);
  } */

  .albumContainer {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .albumList {
    justify-content: center;
    list-style: none;
    width: 100%;
    flex-direction: row;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  }

  .albumItem {
    display: flex;
    background: rgba(255, 255, 255, 0.23);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    align-items: column;
    margin: 0;
    padding: 20px;
  }

  .albumImage {
    width: 19rem;
    height: 19rem;
  }

  .albumImage img {
    width: 100%;
    height: 100%;
  }

  .albumInfo {
    display: flex;
    flex-direction: column;
    width: 19rem;
    margin: 0;
    padding: 0;
    font-size: 3rem;
  }

  .albumName {
    margin-top: 2rem;
    font-size: 1rem;
    font-weight: 900;
  }

  .albumReleaseDate {
    font-size: 0.8rem;
    /* color: #5e5c5c; */
    padding: 0;
    margin: 0;
  }

  .playlist {
    display: flex;
    justify-content: center;
  }
  /*from tablets smallest mesurment to desktop smallest measurment*/

  @media screen and (min-width: 481px) and (max-width: 767px) {
    .playerContainer {
      background: rgba(138, 51, 138, 0.02);
      border-radius: 3px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(7.9px);
      -webkit-backdrop-filter: blur(7.9px);
    }
    /* Artist Header */
    .artistPage {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
    }

    .artistHeader {
      display: flex;
      justify-content: center;
      width: 80%;
      margin-bottom: 1rem;
    }

    .artistImage {
      display: flex;
      align-items: center;
      width: 200px;
      height: 200px;
    }
    .artistImage img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      margin-right: auto;
    }

    .artistDetails {
      display: flex;
      height: 200px;
      justify-content: space-between;
      flex-direction: column;
      font-size: 4rem;
      margin: 0;
    }
    .artistName h1 {
      font-size: 4rem;
    }
    .artistName {
      margin-bottom: 0.5rem;
      /* color: rgb(58, 57, 57); */
    }

    .artistFollowers {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .artistGenres {
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    .popularSongs {
      margin-bottom: 2rem;
    }

    .sectionTitle {
      display: flex;
      justify-content: center;
      font-size: 2rem;
      margin-top: 3rem;
      margin-bottom: 3rem;
      width: 100%;
      display: flex;
      /* color: rgb(21, 20, 20); */
    }

    /* .songList {
          list-style: none;
          padding: 0;
          margin: 0;
        } */

    .songItem {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    .songImage {
      width: 64px;
      height: 64px;
      margin-right: 1rem;
      overflow: hidden;
      border-radius: 4px;
    }

    .songImage img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .songInfo {
      display: flex;
      flex-direction: column;
    }
    .songName {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .songAlbum {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .songReleaseDate {
      font-size: 1rem;
    }

    /* ALBUMS */
    /* .playlistname {
      color: rgb(58, 57, 57);
    } */

    .albumContainer {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .albumList {
      justify-content: center;
      list-style: none;
      width: 100%;
      flex-direction: row;
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
    }

    .albumItem {
      display: flex;
      background: rgba(255, 255, 255, 0.23);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      align-items: column;
      margin: 0;
      padding: 20px;
    }

    .albumImage {
      width: 19rem;
      height: 19rem;
    }

    .albumImage img {
      width: 100%;
      height: 100%;
    }

    .albumInfo {
      display: flex;
      flex-direction: column;
      width: 19rem;
      margin: 0;
      padding: 0;
      font-size: 3rem;
    }

    .albumName {
      margin-top: 2rem;
      font-size: 1rem;
      font-weight: 900;
    }

    .albumReleaseDate {
      font-size: 0.8rem;
      /* color: #5e5c5c; */
      padding: 0;
      margin: 0;
    }
  }
  /* mobile version from 0 to tablets smallest measurment*/

  @media screen and (min-width: 375px) and (max-width: 480px) {
    .trackInfo {
      /* changed from flex to grid */
      display: grid;
      justify-items: start;
      align-items: center;
      grid-template-columns: repeat(9, 1fr);
      grid-auto-rows: minmax(35px, auto);
      grid-template-areas: 'trackImage trackTitle trackArtist trackArtist trackLength';
      margin-right: auto;
    }
    .artistContent {
      margin-right: 5%;
    }
    .playerContainer {
      background: rgba(138, 51, 138, 0.02);
      border-radius: 3px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(7.9px);
      -webkit-backdrop-filter: blur(7.9px);
      border: 1px solid rgba(138, 51, 138, 0.624);
      /* color: rgb(0, 0, 0); */
      font-weight: 800;
    }
    /* Artist Header */
    .artistPage {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .artistHeader {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin: 0px;
      height: 400px;
    }

    .artistImage {
      display: flex;
      align-items: center;
      width: 200px;
      height: 200px;
    }

    .artistImage img {
      width: 200px;
      height: 200px;
      margin: 0;
      padding: 0;
    }

    .artistDetails {
      display: flex;
      height: 200px;
      justify-content: space-between;
      flex-direction: column;
      font-size: 4rem;
    }
    .artistName h1 {
      font-size: 4rem;
    }
    /* .artistName {
      color: rgb(58, 57, 57);
    } */

    .artistFollowers {
      font-size: 1rem;
    }

    .artistGenres {
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    .popularSongs {
      margin-bottom: 2rem;
      max-width: 400px;
      margin-left: 40px;
    }

    .sectionTitle {
      display: flex;
      justify-content: center;
      font-size: 2.5rem;
      margin-top: 3rem;
      margin-bottom: 3rem;
      width: 100%;
      display: flex;
      /* color: rgb(21, 20, 20); */
    }

    .songList {
      display: grid;

      list-style: none;
      padding: 0;
      margin: 0;
    }

    .songItem {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    .songImage {
      width: 64px;
      height: 64px;
      margin-right: 1rem;
      overflow: hidden;
      border-radius: 4px;
    }

    .songImage img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .songInfo {
      display: flex;
      flex-direction: column;
    }
    .songName {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .songAlbum {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .songReleaseDate {
      font-size: 1rem;
    }

    /* ALBUMS */
    /* .playlistname {
      color: rgb(58, 57, 57);
    } */

    .albumContainer {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .albumList {
      justify-content: center;
      list-style: none;
      width: 100%;
      flex-direction: row;
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
    }

    .albumItem {
      display: flex;
      background: rgba(255, 255, 255, 0.23);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      align-items: column;
      margin: 0;
      padding: 20px;
    }

    .albumImage {
      width: 19rem;
      height: 19rem;
    }

    .albumImage img {
      width: 100%;
      height: 100%;
    }

    .albumInfo {
      display: flex;
      flex-direction: column;
      width: 19rem;
      margin: 0;
      padding: 0;
      font-size: 3rem;
    }

    .albumName {
      margin-top: 2rem;
      font-size: 1rem;
      font-weight: 900;
    }

    .albumReleaseDate {
      font-size: 0.8rem;
      /* color: #5e5c5c; */
      padding: 0;
      margin: 0;
    }
    .trackLength {
      margin-right: 20%;
    }
  }
</style>
