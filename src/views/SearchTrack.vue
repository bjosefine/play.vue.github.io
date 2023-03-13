<template>
  <div class="artistPage">
    <!-- ARTIST HEADER -->
    <div class="artistHeader">
      <!-- Artist Image -->
      <div class="artistImage">
        <img :src="uniquetracks.artists[0].url" alt="Artist Image" />
      </div>
      <!-- Artist profile details -->
      <div class="artistDetails">
        <!-- Artist name -->
        <h1 class="playlistName">{{ uniquetracks.artists[0].name }}</h1>
      </div>
    </div>
  </div>

  <div class="trackHeadings">
    <div>
      <h1 class="titleHeading">Title</h1>
    </div>
    <h1 class="artistHeading">Artist</h1>
    <h1 class="trackTime">Time</h1>
  </div>
  <!-- end of headings -->
  <!-- a line -->
  <hr class="headerLine" />
  <!-- end of line -->
  <ol class="trackList">
    <div class="trackDetails">
      <!-- image -->
      <div class="trackImage">
        <img :src="uniquetracks.album.images[0].url" alt="" />
      </div>

      <div class="trackartist">
        {{ uniquetracks.artists[0].name }}
      </div>
      <!-- title -->
      <div class="trackTitle">
        <div class="animateTrackName">{{ uniquetracks.name }}</div>
      </div>

      <!-- duration -->
      <div class="trackLength">
        {{ formatDuration(uniquetracks.duration_ms) }}
      </div>
    </div>
  </ol>
  <div v-if="tracks == null">Loading...</div>
</template>

<script>
  import spotify from '../api/spotify'

  export default {
    async created() {
      const songId = this.$route.params.id
      this.uniquetracks = await spotify.getTracks(songId)
      console.log(this.uniquetracks, 'hej')
    },
    data() {
      return {
        uniquetracks: null
      }
    },
    methods: {
      formatDuration(durationMs) {
        const minutes = Math.floor(durationMs / 1000 / 60)
        const seconds = Math.floor((durationMs / 1000) % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      }
    }
  }
</script>

<style scoped>
  /* Artist Header */
  .artistPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  .artistHeader {
    display: flex;
    width: 50%;
    justify-content: left;
    margin-bottom: 2rem;
    padding: 0;
    margin-right: 50%;
  }

  .artistImage {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: auto;
  }

  .artistImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .artistDetails {
    display: flex;
    height: 300px;

    flex-direction: column;
    font-size: 4rem;
  }
  .artistName h1 {
    font-size: 4rem;
  }
  .artistName {
    margin-bottom: 0.5rem;
    color: rgb(58, 57, 57);
  }

  .artistFollowers {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: black;
  }
  .trackList {
    list-style: none;
    color: black;
    margin: 0;
    padding: 0;
  }

  /* headings grid layout */
  .trackHeadings {
    display: grid;
    justify-items: start;
    align-items: center;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(35px, auto);
    grid-template-areas:
      '. titleHeading titleHeading titleHeading artistHeading artistHeading . timeHead'
      '. headerLine headerLine headerLine headerLine headerLine headerLine headerLine ';
    margin-right: auto;
  }

  h1 {
    padding: 0px;
    margin-bottom: 0px;
    font-size: medium;
    color: rgb(69, 67, 67);
  }

  /* track heading */
  .titleHeading {
    font-size: 17px;
    margin-left: 8rem;
    margin-bottom: 0;
    grid-area: titleHeader;
  }

  /* artist heading */
  .artistHeading {
    font-size: 17px;
    grid-area: artistHeading;
    justify-self: center;
    padding-left: 1rem;
    margin-bottom: 0;
  }

  /* track heading */
  .trackTime {
    font-size: 17px;
    grid-area: timeHead;
    justify-self: end;
    margin-bottom: 0;
  }

  .headerLine {
    grid-area: headerLine;
    margin-right: 5rem;
    margin-top: 0;
    margin-bottom: 0;
  }

  .trackDetails {
    /* changed from flex to grid */
    display: grid;
    justify-items: start;
    align-items: center;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(35px, auto);
    grid-template-areas: 'trackImage trackTitle trackTitle trackTitle trackTitle trackArtist trackArtist trackLength';
    margin-right: auto;
  }

  .trackItem {
    padding: 0.3rem;
    align-items: center;
    transition: background-color 0.3s;
  }

  .trackItem:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  /* selected song */
  .selected {
    background-color: rgba(0, 0, 0, 0.2);
  }

  /* bild */
  .trackImage {
    grid-area: trackImage;
    justify-self: center;
    /* object-fit: cover; */
  }

  /* titel */
  .trackTitle {
    font-weight: bold;
    width: 330px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    grid-area: trackTitle;
    text-align: left;
  }

  /* artist */
  .trackArtist {
    grid-area: trackArtist;
  }

  /* duration time */
  .trackLength {
    font-size: 0.8rem;
    grid-area: trackLength;
    justify-self: end;
  }

  .trackImage {
    width: 64px;
    height: 64px;
    margin-right: 1rem;
    overflow: hidden;
    border-radius: 4px;
  }

  .trackImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
