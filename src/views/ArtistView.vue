<template>
  <div class="artistPage">
    <!-- ARTIST HEADER -->
    <div class="artistHeader">
      <!-- Artist Image -->
      <div class="artistImage">
        <img :src="artistProfile.images[0].url" alt="Artist Image" />
      </div>
      <!-- Artist profile details -->
      <div class="artistDetails">
        <!-- Artist name -->
        <h1 class="playlistName">{{ artistProfile.name }}</h1>
        <!-- Artist followers -->
        <p class="artistFollowers">
          {{ artistProfile.followers.total }} followers
        </p>
        <!-- Artist genre -->
        <p class="artistGenres">
          Genres: {{ artistProfile.genres.join(', ') }}
        </p>
      </div>
    </div>

    <!-- ARTIST PAGE CONTENT -->
    <div class="artistContent">
      <div class="popularSongs">
        <!-- Text for Popular songs -->
        <h2 class="sectionTitle">Popular songs</h2>

        <!-- Header for small headers, title, artist, time -->
        <div class="trackHeadings">
          <div>
            <h1 class="titleHeading">Title</h1>
          </div>
          <h1 class="artistHeading">Artist</h1>
          <h1 class="trackTime">Time</h1>
        </div>
        <hr class="headerLine" />

        <!-- Songlist -->
        <div class="playlist">
          <ol class="songList">
            <!-- Loop for tracks -->
            <li
              v-for="(track, index) in artistTracks.slice(0, 5)"
              :key="index"
              class="trackItem"
            >
              <div class="trackDetails">
                <!-- Track Image -->
                <div class="songImage">
                  <img :src="track.album.images[0].url" alt="Song Image" />
                </div>
                <!-- Track Title -->
                <div class="trackTitle">
                  {{ track.name }}
                </div>
                <!-- Track Artist -->
                <div class="trackArtist">
                  {{ artistProfile.name }}
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
                  <img :src="album.images[0].url" alt="Album Image" />
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
</template>

<script>
  import spotify from '../api/spotify.js'

  export default {
    data() {
      return {
        artistProfile: null,
        artistAlbums: null,
        artistTracks: null
      }
    },

    methods: {
      formatDuration(durationMs) {
        const minutes = Math.floor(durationMs / 1000 / 60)
        const seconds = Math.floor((durationMs / 1000) % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      }
    },

    async created() {
      const artistId = this.$route.params.id
      this.artistProfile = await spotify.getArtists(artistId)
      this.artistAlbums = await spotify.getArtistsAlbums(artistId)
      this.artistTracks = await spotify.getToptracks(artistId)
    }
  }
</script>

<style scoped>
  /* Artist Header */
  .artistPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  .artistHeader {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }

  .artistImage {
    width: 200px;
    height: 200px;
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
    flex-direction: column;
  }

  .artistName {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: rgb(58, 57, 57);
  }

  .artistFollowers {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .artistGenres {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  /* .popularSongs {
    margin-bottom: 2rem;
  } */

  .sectionTitle {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    width: 100%;
    display: flex;
    color: rgb(58, 57, 57);
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

  /* .songImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .songInfo {
    display: flex;
    flex-direction: column;
  } */

  /* .songName {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .songAlbum {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .songReleaseDate {
    font-size: 1rem;
  } */

  /* ALBUMS */
  .playlistname {
    color: rgb(58, 57, 57);
  }

  .albumContainer {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .albumList {
    list-style: none;
    width: 100%;
    flex-direction: row;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  }

  .albumItem {
    display: flex;
    align-items: column;
    margin: 0;
    padding: 0;
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
  }

  .albumName {
    font-size: 1rem;
  }

  .albumReleaseDate {
    font-size: 0.8rem;
    padding: 0;
    margin: 0;
  }
</style>
