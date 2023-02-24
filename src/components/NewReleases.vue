<template>
  <div>
    <div v-show="newReleases" class="new-releases-section">
      <h1>New Releases</h1>
      <!-- Start: Show the New Releases -->
      <div class="new-releases-list">
        <div v-for="album in newReleases" :key="album.id" class="new-releases-items">
          <router-link :to="`/album/${album.id}`" class="new-releases-link">
            <div class="new-releases-item">
              <img :src="album.images[0].url" alt="Album cover" />
            </div>
          </router-link>
        </div>
      </div>
      <!-- Stop: Show the New Releases -->
    </div>
    <div v-show="!newReleases">Loading...</div>
  </div>
</template>

<script>
import spotify from '../api/spotify';

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
h1 {
  font-size: 36px;
  margin: 40px 0;
  text-align: center;
}

.new-releases-section {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-bottom: 50px;
}

.new-releases-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-bottom: 50px;
}

.new-releases-item {
    min-width: 260px;
    height: 250px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.new-releases-link {
  text-decoration: none;
}

.new-releases-item img {
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
