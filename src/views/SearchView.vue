<template>
  <!-- Searchbar and loading animation-->
  <div class="searchPage">
    <div class="searchBar">
      <input v-model="query" type="text" placeholder="Search for music" />
      <div v-if="loading" class="loadingAnimation">
        <i class="fas fa-spinner" />
      </div>
    </div>

    <!-- Show search result for artists -->
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

      <!-- Show search result for tracks -->
      <div v-if="tracks.length > 0" class="gridSection">
        <h3 class="resultTypeHeading">Tracks</h3>
        <div class="gridContainer">
          <router-link
            :to="'/track/' + track.id"
            v-for="(track, index) in tracks.slice(0, 4)"
            :key="index"
          >
            <div class="resultItem">
              <div class="resultImage">
                <img
                  :src="
                    track.album.images.length > 0
                      ? track.album.images[0].url
                      : ''
                  "
                  alt=""
                />
              </div>
              <div class="resultDetails">
                <div class="resultName">{{ track.name }}</div>
                <div class="resultArtists">
                  by {{ track.artists.map((artist) => artist.name).join(', ') }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Show search result for playlists -->
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

      <!-- Show search result for albums -->
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
    name: 'SearchView',
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
      },
      tracks() {
        return this.results.filter((result) => result.type === 'track')
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

<style scoped>
  .searchPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 0;
    font-size: 16px;
    margin: 20px;
  }

  .searchBar {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    width: 80%;
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
    align-items: center;
    background-color: #3b3f3c00;
    font-weight: bold;
    text-align: center;
    font-size: 1.3rem;
  }

  .loadingAnimation {
    position: absolute;
    right: 20px;
    font-size: 24px;
    color: #373535;
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
    font-size: 1.5rem;
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
    width: 100%;
  }

  .resultItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 10px;
    height: 100%;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out;
    max-width: 280px;
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
    margin-bottom: 20px;
    max-width: 250px;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: -30px;
  }

  .resultArtists {
    font-size: 14px;
    color: #373535;
    max-width: 250px;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-bottom: 20px;
    margin-top: -20px;
  }

  .gridSection {
    margin-bottom: 40px;
  }

  /* --------------Mobile-------------- */
  @media (max-width: 480px) {
    .resultItem {
      height: 200px;
      width: 150px;
    }

    .resultImage {
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }

    .resultImage img {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    .resultName {
      font-size: 13px;
      margin-top: -40px;
      max-width: 130px;
    }

    .resultArtists {
      max-width: 130px;
      font-size: 11px;
      padding-bottom: 5px;
    }

    .searchBar input[type='text'] {
      font-size: 14px;
      padding: 8px;
      width: 100%;
      margin-bottom: 5px;
    }

    .resultTypeHeading {
      margin-left: 28px;
      font-size: 20px;
    }
  }

  .loadingAnimation {
    margin-right: 10px;
    font-size: 18px;
    animation: spin 1s linear infinite;
  }

  /* --------------Tablet-------------- */
  @media (min-width: 481px) and (max-width: 767px) {
    .resultItem {
      height: 250px;
      width: 200px;
    }

    .resultImage {
      border-radius: 50%;
      width: 150px;
      height: 150px;
    }

    .resultImage img {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    .resultName {
      font-size: 14px;
      margin-top: -40px;
      max-width: 180px;
    }

    .resultArtists {
      max-width: 180px;
      font-size: 11px;
      padding-bottom: 10px;
    }

    .searchBar {
      max-width: 400px;
    }
    .searchBar input[type='text'] {
      font-size: 15px;
      padding: 8px;
      width: 100%;
      margin-bottom: 5px;
    }

    .resultTypeHeading {
      margin-left: 40px;
      font-size: 20px;
    }
  }

  .loadingAnimation {
    margin-right: 10px;
    font-size: 18px;
    animation: spin 1s linear infinite;
  }
</style>
