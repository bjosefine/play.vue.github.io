<template>
  <!-- headings  -->
  <div class="trackHeadings">
    <!-- <rowgap></rowgap> -->
    <div>
      <h1 class="titleHeading">Title</h1>
    </div>
    <h1 class="artistHeading">Artist</h1>
    <h1 class="trackTime">Time</h1>
  </div>
  <hr class="headerLine" />
  <div class="playlist" v-if="playlist">
    <!-- <h1>{{ playlist.name }}</h1> -->
    <ol class="trackList">
      <li
        v-for="(track, index) in tracks"
        :key="track.track.id"
        :class="{ selected: index === selectedTrackIndex }"
        class="trackItem"
        @click="playTrack(index)"
      >
        <div class="trackDetails">
          <!-- image -->
          <div class="trackImage">
            <img :src="track.track.album.images[2].url" alt="" />
          </div>
          <!-- title -->
          <div class="trackTitle">
            {{ track.track.name }}
          </div>

          <div class="trackArtist">
            <!-- A router link to the artist page  -->
            <router-link :to="`/artist/${track.track.artists[0].id}`">
              {{ track.track.artists[0].name }}
            </router-link>
          </div>
          <!-- duration -->
          <div class="trackLength">
            {{ formatDuration(track.track.duration_ms) }}
          </div>
        </div>
      </li>
    </ol>
    <div v-if="tracks == null">Loading...</div>
    <!-- player-container used for many pages, important -->
    <div v-if="selectedTrackIndex !== null">
      <PlayerController
        :key="tracks[selectedTrackIndex].track.id"
        :track="tracks[selectedTrackIndex].track"
        :audio="audio"
        :autoplay="autoplay"
      ></PlayerController>
    </div>
    <!-- end of player container -->
  </div>
</template>

<script>
  import spotify from '../api/spotify.js'
  import PlayerController from '../components/PlayerController.vue'

  export default {
    name: 'PlayList',

    components: {
      PlayerController
    },

    data() {
      return {
        playlist: null,
        tracks: null,
        selectedTrackIndex: null,
        autoplay: true,
        isPlaying: false,
        audio: new Audio()
      }
    },

    async created() {
      const playlistId = this.$route.params.id
      this.playlist = await spotify.getPlaylist(playlistId)
      this.tracks = await spotify.getPlaylistTracks(playlistId)
      this.tracks = this.tracks.filter((track) => track.track.preview_url)
    },

    methods: {
      playTrack(index) {
        if (index === this.selectedTrackIndex) {
          return
        }

        this.selectedTrackIndex = index
        this.isPlaying = true
      },
      formatDuration(durationMs) {
        const minutes = Math.floor(durationMs / 1000 / 60)
        const seconds = Math.floor((durationMs / 1000) % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      }
    }
  }
</script>

<style>
  /* player-container Used on many pages important, don't adjust*/
  .player-container {
    background: rgba(138, 51, 138, 0.02);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
    border: 1px solid rgba(138, 51, 138, 0.3);
  }
  a {
    text-decoration: none;
    color: black;
  }
  /* end of player container */

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
    margin-left: 8rem;
    grid-area: titleHeader;
  }
  /* artist heading */
  .artistHeading {
    grid-area: artistHeading;
    justify-self: center;
    padding-left: 1rem;
  }
  /* track heading */
  .trackTime {
    grid-area: timeHead;
    justify-self: end;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    grid-area: trackTitle;
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
</style>
