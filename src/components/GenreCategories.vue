<template>
  <div class="home">
    <h1>Genres</h1>
    <!-- classnames on multiple pages GenreCollection, PlayListitems-->
    <div class="playlistContainer" v-if="genreCategories">
      <div class="genreCategoriesList">
        <div
          v-for="toplists in genreCategories"
          :key="toplists.id"
          class="genreCategoryItems"
        >
          <router-link
            :to="{
              name: 'CategoryPlaylist',
              params: { categoryId: toplists.id, genre: toplists.name }
            }"
            class="playlistLink"
          >
            <div class="genrePictures">
              <img :src="toplists.icons[0].url" alt="Genre cover" />
              {{ toplists.name }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- loading on multiple pages -->
    <div class="loading" v-else>Loading...</div>
  </div>
</template>

<script>
  import spotify from '../api/spotify'
  export default {
    name: 'GenreCategories',
    data() {
      return {
        genreCategories: null,
        genreName: null
      }
    },
    async created() {
      this.genreCategories = await spotify.getGenres()
    }
  }
</script>

<style>
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
    /* font-size: 36px; */
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

  .genrePictures {
    width: 100%;
    max-width: 230px;
    height: auto;
    margin: 0 auto;
  }

  .genrePictures img {
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
  @media (max-width: 767px) {
    .genrePictures {
      width: 150px;
      height: 150px;
      border-radius: 10px;
      border-radius: 13px;
    }
  }
</style>
