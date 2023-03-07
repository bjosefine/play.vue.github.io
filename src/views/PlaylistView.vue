<template>
  <!-- playlist image and name -->
  <!-- <div class="flexContainerPlaylist"> -->
  <div class="playlistImage">
    <img :src="playlist.images[0].url" :alt="playlist.name" />
  </div>
  <div class="PlaylistHeadingContent">
    <h2 class="playlistName">{{ playlist.name }}</h2>
  </div>
  <!-- </div> -->
  <!-- end of playlist image and name -->
  <!-- headings  -->
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
  <div class="playlist" v-if="playlist">
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
            <div class="animateTrackName">{{ track.track.name }}</div>
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

    <!-- this code gave an error in console
    :key="tracks[selectedTrackIndex].track.id" -->

    <div v-if="selectedTrackIndex !== null">
      <PlayerController
        :track="tracks[selectedTrackIndex].track"
        :audio="audio"
        :autoplay="autoplay"
        @play-next="playNext()"
        @play-prev="playPrev()"
      />
    </div>
    <!-- end of player container -->
  </div>
</template>

<script>
  // import { onMounted } from 'vue'
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
      // play track from list
      playTrack(index) {
        if (index === this.selectedTrackIndex) {
          return
        }

        this.selectedTrackIndex = index
        this.isPlaying = true
        console.log(this.selectedTrackIndex, 'current')
      },
      // play next track in list
      playNext() {
        this.selectedTrackIndex = this.selectedTrackIndex + 1
        console.log(this.selectedTrackIndex + 1, 'test next')
      },
      // play previous track in list
      playPrev() {
        this.selectedTrackIndex = this.selectedTrackIndex - 1
        console.log(this.selectedTrackIndex - 1, 'test prev')
      },
      formatDuration(durationMs) {
        const minutes = Math.floor(durationMs / 1000 / 60)
        const seconds = Math.floor((durationMs / 1000) % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      }
      // makeAnimate() {
      //   console.log(this.animateTrackName, 'trackname')
      // }
    }
    // mounted() {
    //   this.makeAnimate()
    // }
  }
</script>

<style>
  /* player-container Used on many pages important, don't adjust*/
  .playerContainer {
    background: rgba(236, 172, 236, 0.02);
    border-radius: 3px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
    color: rgb(41, 38, 38);
  }

  /* end of player container */

  .playlistImage {
    top: 2rem;
    position: relative;
  }
  .playlist {
    margin-bottom: 8%;
  }

  .playlistName {
    margin-top: 4rem;
    font-size: 40px;
    color: rgb(58, 57, 57);
  }

  a {
    text-decoration: none;
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
    width: 400px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    grid-area: trackTitle;
    text-align: left;
  }
  /* animation values */
  /* .animateTrackName {
    float: left;
    animation-duration: 10s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-name: move;
  }
  /* animation to move from right to left */
  /* @keyframes move {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translate(-50%);
    }
  } */

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

  /* from tablets smallest measurement to desktop smallest measurement */
  @media (min-width: 750px) and (max-width: 800px) {
    /* player-container Used on many pages important, don't adjust*/
    .playerContainer {
      background: rgba(236, 172, 236, 0.02);
      border-radius: 3px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(7.9px);
      -webkit-backdrop-filter: blur(7.9px);
      color: rgb(41, 38, 38);
    }

    /* end of player container */
    .playlist {
      margin-bottom: 8%;
    }

    .playlistName {
      margin-top: 4rem;
      font-size: 40px;
      color: rgb(58, 57, 57);
    }

    a {
      text-decoration: none;
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
      width: 185px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      grid-area: trackTitle;
      text-align: left;
      margin-left: 1rem;
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
  }

  /* mobile version, from 0 to smallest tablet */
  @media (min-width: 375px) and (max-width: 749px) {
    .playlist {
      margin-bottom: 8%;
    }

    .playlistImage {
      margin-top: 2rem;
    }

    .playlistName {
      margin-top: 4rem;
      font-size: 20px;
      color: rgb(58, 57, 57);
    }

    a {
      text-decoration: none;
      color: black;
    }

    .trackList {
      list-style: none;
      color: black;
      margin: 0;
      padding: 0;
    }

    /* heading line grid layout */
    .trackHeadings {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas: ' headerLine headerLine headerLine ';
    }

    h1 {
      padding: 0px;
      margin-bottom: 0px;
      font-size: medium;
      color: rgb(69, 67, 67);
    }

    /* track heading */
    .titleHeading {
      display: none;
    }

    /* artist heading */
    .artistHeading {
      display: none;
    }

    /* track heading */
    .trackTime {
      display: none;
    }

    .headerLine {
      grid-area: headerLine;
      margin-right: 1rem;
      margin-left: 1rem;
      margin-top: 0;
      margin-bottom: 0;
    }

    .trackDetails {
      /* changed from flex to grid */
      display: grid;
      justify-items: start;
      align-items: center;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: minmax(35px, auto);
      grid-template-areas:
        'trackImage trackTitle trackTitle'
        'trackImage trackArtist trackLength';
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
      font-size: 16px;
      font-weight: bold;
      width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      grid-area: trackTitle;
      text-align: left;
    }

    /* artist */
    .trackArtist {
      font-size: 16px;
      grid-area: trackArtist;
    }

    /* duration time */
    .trackLength {
      font-size: 0.8rem;
      grid-area: trackLength;
      justify-self: end;
      margin-right: 1em;
    }
  }
</style>
