<template v-if="genrePlaylist">
  <div class="home">
    <h1>{{ $route.params.genre }}</h1>
    <!-- classnames on multiple pages GenreCategories, PlayListitems-->
    <div class="playlistContainer" v-if="genrePlaylist">
      <div class="genreCategoriesList">
        <div
          v-for="playlist in genrePlaylist.playlists.items"
          :key="playlist.id"
          class="genreCategoryItems"
        >
          <router-link
            :to="{ name: 'playlist', params: { id: playlist.id } }"
            class="playlistLink"
          >
            <div class="playlistImage">
              <img :src="playlist.images[0].url" alt="Playlist cover" />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import spotify from '../api/spotify'
  export default {
    name: 'GenreCollection',
    data() {
      return {
        genrePlaylist: null,
        genreName: null
      }
    },
    async created() {
      this.categoryId = this.$route.params.categoryId
      this.genrePlaylist = await spotify.getCategoryPlaylist(this.categoryId)
      // this.genreName = await spotify.getGenreName()
      // console.log(this.genreName, 'hej')
    }
  }
</script>

<style>
  /* .images img {
    margin-bottom: 100px;
  } */

  /* some of the classnames are the same as in PlayListitems file */
  /* body {
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(46, 35, 45, 0.8) 25.52%,
      rgba(189, 173, 173, 0) 100%
    );
    background-blend-mode: darken;
  } */

  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-size: 36px;
    margin: 40px 0;
    text-align: center;
  }

  .playlistContainer {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
  }

  .genreCategoriesList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
  }

  .genreCategoryItems {
    max-width: 200px;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .genreCategoryItems:hover {
    transform: scale(1.05);
  }

  .playlistLink:hover {
    text-decoration: none;
    color: rgb(38, 40, 40);
  }

  .playlistImage {
    width: 100%;
    max-width: 230px;
    height: 200px;
    margin: 0 auto;
  }

  .playlistImage img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 5px 13px 13px -3px rgba(0, 0, 0, 0.25);
    border-radius: 13px;
  }

  .playlistDetails {
    padding: 10px;
    text-align: center;
  }

  /* h2 {
    color: aliceblue;
    font-size: 18px;
    margin: 10px 0;
  }

  p {
    color: #aaa4a4;
    font-size: 14px;
    margin: 10px 0;
    height: 50px;
  } */
  .loading {
    font-size: 24px;
    margin: 40px 0;
  }
</style>
