<template>
  <div class="searchPage">
    <div class="searchBar">
      <input v-model="query" type="text" placeholder="Search for music" />
      <div v-if="loading" class="loadingAnimation">
        <i class="fas fa-spinner"></i>
      </div>
    </div>

    <div class="searchResults" v-if="results.length > 0">
      <div v-if="artists.length > 0" class="gridSection">
        <h3 class="resultTypeHeading">Artists</h3>
        <div class="gridContainer">
          <router-link
            :to="'/artist/' + artist.id"
            v-for="(artist, index) in artists.slice(0, 4)"
            :key="index"
          >
            <div class="resultItem">
              <div class="resultImage">
                <img
                  :src="artist.images.length > 0 ? artist.images[0].url : ''"
                  alt=""
                />
              </div>
              <div class="resultDetails">
                <div class="resultName">{{ artist.name }}</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="playlists.length > 0" class="gridSection">
        <h3 class="resultTypeHeading">Playlists</h3>
        <div class="gridContainer">
          <router-link
            :to="'/playlist/' + playlist.id"
            v-for="(playlist, index) in playlists.slice(0, 4)"
            :key="index"
          >
            <div class="resultItem">
              <div class="resultImage">
                <img
                  :src="
                    playlist.images.length > 0 ? playlist.images[0].url : ''
                  "
                  alt=""
                />
              </div>
              <div class="resultDetails">
                <div class="resultName">{{ playlist.name }}</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="albums.length > 0" class="gridSection">
        <h3 class="resultTypeHeading">Albums</h3>
        <div class="gridContainer">
          <router-link
            :to="'/album/' + album.id"
            v-for="(album, index) in albums.slice(0, 4)"
            :key="index"
          >
            <div class="resultItem">
              <div class="resultImage">
                <img
                  :src="album.images.length > 0 ? album.images[0].url : ''"
                  alt=""
                />
              </div>
              <div class="resultDetails">
                <div class="resultName">{{ album.name }}</div>
                <div class="resultArtists">
                  by {{ album.artists.map((artist) => artist.name).join(', ') }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <GenreCategories />
  </div>
</template>

<script>
  import spotify from '../api/spotify.js'
  import GenreCategories from '../components/GenreCategories.vue'

  export default {
    name: 'Search',
    components: {
      GenreCategories
    },
    data() {
      return {
        query: '',
        results: [],
        loading: false
      }
    },
    watch: {
      query: function (newQuery, oldQuery) {
        if (newQuery !== oldQuery) {
          this.search()
        }
      }
    },
    computed: {
      artists() {
        return this.results.filter((result) => result.type === 'artist')
      },
      playlists() {
        return this.results.filter((result) => result.type === 'playlist')
      },
      albums() {
        return this.results.filter((result) => result.type === 'album')
      }
    },
    methods: {
      async search() {
        if (!this.query) {
          return
        }
        this.loading = true
        const [
          tracksResponse,
          artistsResponse,
          albumsResponse,
          playlistsResponse
        ] = await Promise.all([
          spotify.search('track', this.query),
          spotify.search('artist', this.query),
          spotify.search('album', this.query),
          spotify.search('playlist', this.query)
        ])
        const tracks = tracksResponse?.tracks?.items?.map((track) => {
          return {
            id: track.id,
            name: track.name,
            type: 'track',
            artists: track.artists,
            preview_url: track.preview_url,
            album: {
              name: track.album.name,
              images: track.album.images
            }
          }
        })
        const artists = artistsResponse?.artists?.items?.map((artist) => {
          return {
            id: artist.id,
            name: artist.name,
            type: 'artist',
            images: artist.images
          }
        })
        const albums = albumsResponse?.albums?.items?.map((album) => {
          return {
            id: album.id,
            name: album.name,
            type: 'album',
            artists: album.artists,
            images: album.images
          }
        })
        const playlists = playlistsResponse?.playlists?.items?.map(
          (playlist) => {
            return {
              id: playlist.id,
              name: playlist.name,
              type: 'playlist',
              images: playlist.images
            }
          }
        )
        this.results = [
          ...(artists || []),
          ...(playlists || []),
          ...(albums || []),
          ...(tracks || [])
        ]
        this.loading = false
      }
    }
  }
</script>

<style>
  .searchPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 0;
    font-size: 16px;
    margin: 30px;
  }

  .searchBar {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    width: 90%;
    padding: 10px;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0);
    backdrop-filter: blur(0px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.329);
  }

  .searchBar input[type='text'] {
    flex: 1;
    padding: 30px;
    border: none;
    outline: none;
    font-size: 18px;
    align-items: center;
    background-color: #3b3f3c00;
    font-weight: bold;
    text-align: center;
    font-size: 1.6rem;
  }

  .loadingAnimation {
    margin-left: 20px;
    font-size: 24px;
    color: #35814f;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .searchQuery {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    display: none;
  }

  .resultTypeHeading {
    display: flex;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #373535;
    font-weight: 800;
  }

  .gridContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .resultItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 10px;
    height: 450px;
    width: 360px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .resultImage {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    margin: 30px;
    overflow: hidden;
  }

  .resultImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .resultItem:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .resultDetails {
    margin-top: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .resultName {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .resultArtists {
    font-size: 14px;
    color: #999;
  }

  .gridSection {
    margin-bottom: 40px;
  }
  @media (max-width: 768px) {
    .gridContainer {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .resultItem {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 20px;
      height: 300px;
      margin: 10px;
      text-align: center;
    }

    .resultImage {
      border-radius: 50%;
      width: 200px;
      height: 200px;
      overflow: hidden;
    }

    .resultImage img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .resultDetails {
      margin-top: 20px;
      text-align: center;
    }

    .resultName {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 2px;
    }

    .resultArtists {
      font-size: 12px;
    }

    .searchBar {
      flex-direction: column;
      align-items: center;
    }

    .searchBar input[type='text'] {
      font-size: 14px;
      padding: 8px;
      width: 100%;
      max-width: 300px;
      margin-bottom: 10px;
    }
  }
</style>
