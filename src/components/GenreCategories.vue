<template>
  <h1>Hello World!</h1>
  <div class="genreCategoriesList">
    <div
      v-for="toplists in genreCategories"
      :key="toplists.id"
      class="genreCategoryItems"
    >
      <router-link
        :to="{ name: 'CategoryPlaylist', params: { categoryId: toplists.id } }"
      >
        <div>
          <img :src="toplists.icons[0].url" alt="Genre cover" />
          {{ toplists.name }}
        </div>
      </router-link>
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
