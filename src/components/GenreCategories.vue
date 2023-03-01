<template>
  <h1>Hello World!</h1>
  <div class="genreCategoriesList">
    <div
      v-for="toplists in genreCategories"
      :key="toplists.id"
      class="genreCategoryItems"
    >
      {{ genreCategories.name }}
      <!-- <img :src="categories.icons[0].url" alt="Album cover" /> -->
    </div>
  </div>
</template>

<script>
  import spotify from '../api/spotify'
  export default {
    name: 'GenreCategories',
    data() {
      return {
        genreCategories: null
      }
    },
    async created() {
      this.genreCategories = await spotify.getGenres()
    }
  }
</script>
