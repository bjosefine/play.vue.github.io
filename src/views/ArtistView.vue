<template>
  <div class="artistPage">
    <div class="artistHeader">
      <div class="artistImage">
        <img :src="artistProfile.images[0].url" alt="Artist Image" />
      </div>
      <div class="artistDetails">
        <h1 class="artistName">{{ artistProfile.name }}</h1>
        <p class="artistFollowers">
          {{ artistProfile.followers.total }} followers
        </p>
        <p class="artistGenres">
          Genres: {{ artistProfile.genres.join(', ') }}
        </p>
      </div>
    </div>
    <div class="artistContent">
      <div class="popularSongs">
        <h2 class="sectionTitle">Popular songs</h2>
        <ul class="songList">
          <li
            v-for="(track, index) in artistTracks.slice(0, 5)"
            :key="index"
            class="songItem"
          >
            <div class="songDetails">
              <div class="songImage">
                <img :src="track.album.images[0].url" alt="Song Image" />
              </div>
              <div class="songInfo">
                <h3 class="songName">{{ track.name }}</h3>
                <p class="songAlbum">{{ track.album.name }}</p>
                <p class="songReleaseDate">{{ track.album.release_date }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="albums">
        <h2 class="sectionTitle">Albums</h2>
        <ul class="albumList">
          <li v-for="album in artistAlbums" :key="album.id" class="albumItem">
            <div class="albumDetails">
              <div class="albumImage">
                <img :src="album.images[0].url" alt="Album Image" />
              </div>
              <div class="albumInfo">
                <h3 class="albumName">{{ album.name }}</h3>
                <p class="albumReleaseDate">{{ album.release_date }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
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

    async created() {
      const artistId = this.$route.params.id
      this.artistProfile = await spotify.getArtists(artistId)
      this.artistAlbums = await spotify.getArtistsAlbums(artistId)
      this.artistTracks = await spotify.getToptracks(artistId)
    }
  }
</script>

<style scoped>
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
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .songList {
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

  .albumList {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .albumItem {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .albumImage {
    width: 64px;
    height: 64px;
    margin-right: 1rem;
    overflow: hidden;
    border-radius: 4px;
  }

  .albumImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .albumInfo {
    display: flex;
    flex-direction: column;
  }

  .albumName {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .albumReleaseDate {
    font-size: 1rem;
  }
</style>
