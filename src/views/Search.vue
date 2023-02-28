<template>
  <div class="Search">
    <input v-model="query" type="text" placeholder="Search for music" />

    <ul v-if="results">
      <li v-for="result in results" :key="result.id">
        <router-link
          :to="
            result.type === 'artist'
              ? '/artist/' + result.id
              : '/' + result.type + '/' + result.id
          "
        >
          {{ result.name }}
          <span v-if="result.artists">
            by {{ result.artists.map((artist) => artist.name).join(', ') }}
          </span>
        </router-link>
      </li>
    </ul>

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
        console.log(this.results)

        this.results = [
          ...(tracksResponse?.items?.map((track) => {
            return {
              id: track.id,
              name: track.name,
              type: 'track',
              artists: track.artists
            }
          }) || []),
          ...(artistsResponse?.artists?.items?.map((artist) => {
            return {
              id: artist.id,
              name: artist.name,
              type: 'artist'
            }
          }) || []),
          ...(albumsResponse?.albums?.items?.map((album) => {
            return {
              id: album.id,
              name: album.name,
              type: 'album',
              artists: album.artists
            }
          }) || []),
          ...(playlistsResponse?.playlists?.items?.map((playlist) => {
            return {
              id: playlist.id,
              name: playlist.name,
              type: 'playlist'
            }
          }) || [])
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

  button {
    font-size: 18px;
    padding: 10px 20px;
    background-color: #1db954;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-top: 10px;
  }

  .loading {
    margin-top: 20px;
  }
</style>
