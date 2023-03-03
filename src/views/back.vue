<!-- <template>
  <div class="Search">
    <input v-model="query" type="text" placeholder="Search for music" />

    <div class="results" v-if="results">
      <div v-for="result in results" :key="result.id" class="result">
        <router-link
          :to="
            result.type === 'artist'
              ? '/artist/' + result.id
              : '/' + result.type + '/' + result.id
          "
        >
          <div class="result-image">
            <img :src="result.images[0].url" alt="" />
          </div>
          <div class="result-details">
            <div class="result-name">{{ result.name }}</div>
            <div class="result-artists" v-if="result.artists">
              by {{ result.artists.map((artist) => artist.name).join(', ') }}
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div v-if="loading">Loading...</div>
  </div>
</template>
<script>
  import spotify from '../api/spotify.js'

  export default {
    name: 'Search',

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

    methods: {
      async search() {
        if (!this.query) {
          return
        }

        this.loading = true

        const tracksResponse = await spotify.search('track', this.query)
        const artistsResponse = await spotify.search('artist', this.query)
        const albumsResponse = await spotify.search('album', this.query)
        const playlistsResponse = await spotify.search('playlist', this.query)

        const tracks = tracksResponse?.items?.map((track) => {
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
          ...(tracks || []),
          ...(artists || []),
          ...(albums || []),
          ...(playlists || [])
        ]

        this.loading = false
      }
    }
  }
</script>

<style>
  .Search {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  input[type='text'] {
    font-size: 18px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    width: 300px;
  }

  .results {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    width: 400px;
  }

  .result {
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 800px;
    background-color: #f7f7f7;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }

  .result:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }

  .result-image {
    width: 64px;
    height: 64px;
    margin-right: 10px;
  }

  .result-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  .result-details {
    flex: 1;
  }

  .result-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .result-artists {
    font-size: 14px;
    color: #666;
  }

  .loading {
    margin-top: 20px;
  }
</style> -->
