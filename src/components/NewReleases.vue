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
          id="pictureHover"
        >
          <router-link :to="`/album/${album.id}`" class="newReleasesLink">
            <div class="newReleasesItem">
              <img :src="album.images[0].url" alt="Album cover" />
              <div class="infonewrelease">
                {{ album.name }} - {{ album.artists[0].name }}
              </div>
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

  #pictureHover:hover {
    transform: scale(1.05);
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

  .infonewrelease {
    visibility: hidden;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(30px);
    background: rgba(206, 17, 206, 0.062);
    box-shadow: 0 4px 30px rgba(213, 14, 170, 0.132);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-bottom: 1px solid #535353;
    filter: drop-shadow(4px 4px 4px rgba(199, 16, 184, 0.114));
    text-align: center;
    border-radius: 6px;
    padding: 5px 10px;
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s;
    font-weight: bold;
    -webkit-text-stroke: 0.5px #000;
  }

  .newReleasesItem:hover .infonewrelease {
    visibility: visible;
    opacity: 1;
  }

  h1 {
    font-size: 18px;
    margin: 10px 0;
    text-align: center;
  }
  @media (max-width: 767px) {
    /*making the pictures size down*/
    .newReleasesItem {
      width: 150px;
      height: 150px;
    }
  }
</style>
