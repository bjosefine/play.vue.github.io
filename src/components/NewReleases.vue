<template>
  <div class="section">
    <h1>New Releases</h1>
    <div v-if="newReleases" class="newReleasesSection">
      <!-- Start: Show the New Releases -->
      <div class="newReleasesList">
        <div
          v-for="album in newReleases"
          :key="album.id"
          class="newReleasesItems"
        >
          <router-link :to="`/album/${album.id}`" class="newReleasesLink">
            <div class="newReleasesItem">
              <img :src="album.images[0].url" alt="Album cover" />
            </div>
          </router-link>
        </div>
      </div>
      <!-- Stop: Show the New Releases -->
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
  import spotify from '../api/spotify'

  export default {
    name: 'NewReleases',
    data() {
      return {
        newReleases: null
      }
    },
    async created() {
      this.newReleases = await spotify.getNewReleases()
    }
  }
</script>

<style>
  body {
    justify-content: center;
  }

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  h1 {
    color: #000;
    font-size: 36px;
    margin: 40px 0;
    text-align: center;
  }

  .newReleasesSection {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
  }

  .newReleasesList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
  }

  .newReleasesItem {
    max-width: 230px;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .newReleasesLink {
    text-decoration: none;
  }

  .newReleasesItem img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 5px 13px 13px -3px rgba(0, 0, 0, 0.25);
    border-radius: 13px;
  }

  h1 {
    color: aliceblue;
    font-size: 18px;
    margin: 10px 0;
    text-align: center;
  }
</style>
