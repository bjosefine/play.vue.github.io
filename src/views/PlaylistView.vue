<template>
  <!-- headings  -->
  <div class="trackHeadings">
    <!-- <rowgap></rowgap> -->
    <div>
      <h1 class="trackTitle">Title</h1>
    </div>
    <h1 class="artistHeading">Artist</h1>
    <h1 class="trackTime">Time</h1>
  </div>
  <hr class="headerLine" />
  <div class="playlist" v-if="playlist">
    <h1>{{ playlist.name }}</h1>
    <ol class="track-list">
      <li
        v-for="(track, index) in tracks"
        :key="track.track.id"
        :class="{ selected: index === selectedTrackIndex }"
        class="track-item"
        @click="playTrack(index)"
      >
        <div class="track-details">
          <!-- image -->
          <div class="track-image">
            <img :src="track.track.album.images[2].url" alt="" />
          </div>
          <!-- title -->
          <div class="track-title">
            {{ track.track.name }}
          </div>

          <div class="track-artist">
            <!-- A router link to the artist page  -->
            <router-link :to="`/artist/${track.track.artists[0].id}`">
              {{ track.track.artists[0].name }}
            </router-link>
          </div>
          <!-- duration -->
          <div class="track-length">
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

  .track-list {
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
      '. tiHead tiHead tiHead aHead aHead . timeHead'
      '. hLine hLine hLine hLine hLine hLine hLine ';
    width: 80%;
    /* margin-left: 15.5rem; */
    margin-right: auto;
    /* border: solid black 1px; */
    /* padding: 0; */
  }
  h1 {
    padding: 0px;
    margin-bottom: 0px;
    font-size: medium;
    color: rgb(69, 67, 67);
  }
  /* track heading */
  .trackTitle {
    margin-left: 7rem;
    grid-area: titHead;
  }
  /* artist heading */
  .artistHeading {
    grid-area: aHead;
    justify-self: center;
    padding-left: 2rem;
  }
  /* track heading */
  .trackTime {
    grid-area: timeHead;
    justify-self: end;
  }

  .headerLine {
    grid-area: hLine;
    margin-right: 18rem;
    margin-top: 0;
    margin-bottom: 0;
  }
  .track-details {
    /* changed from flex to grid */
    display: grid;
    justify-items: start;
    align-items: center;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(35px, auto);
    grid-template-areas: 'ti tt tt tt tt ta ta tl';
    width: 80%;
    /* margin-left: 15.5rem; */
    margin-right: auto;
  }

  .track-item {
    padding: 0.3rem;
    align-items: center;
    transition: background-color 0.3s;
  }

  .track-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  /* selected song */
  .selected {
    background-color: rgba(0, 0, 0, 0.2);
  }

  /* bild */
  .track-image {
    grid-area: ti;
    justify-self: center;
    /* object-fit: cover; */
  }

  /* titel */
  .track-title {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    grid-area: tt;
  }

  /* artist */
  .track-artist {
    grid-area: ta;
  }

  /* duration time */
  .track-length {
    font-size: 0.8rem;
    grid-area: tl;
    justify-self: end;
  }
</style>
