<template>
  <div class="artistPage">
    <!-- ARTIST HEADER -->
    <div class="artistHeader">
      <!-- Artist Image -->
      <div class="artistImage">
        <img :src="uniquetracks.album.images[0].url" alt="Artist Image" />
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
    <div
      class="trackDetails"
      :key="index"
      :class="{ selected: index === selectedTrackIndex }"
      @click="playTrack(index), playSpotifyTrack()"
    >
      <!-- image -->
      <div class="trackImage">
        <img :src="uniquetracks.album.images[0].url" alt="" />
      </div>
      <div class="trackartist">
        <router-link :to="`/artist/${uniquetracks.artists[0].id}`">
          {{ uniquetracks.artists[0].name }}
        </router-link>
      </div>
      <!-- title -->
      <div class="trackTitle">
        {{ uniquetracks.name }}
      </div>

      <!-- duration -->
      <div class="trackLength">
        {{ formatDuration(uniquetracks.duration_ms) }}
      </div>
    </div>
  </ol>
  <!-- Player controller -->
  <div v-if="selectedTrackIndex !== null">
    <PlayerController
      v-if="!isAuthenticated"
      :key="uniquetracks.id"
      :track="uniquetracks"
      :audio="audio"
      :autoplay="autoplay"
      @play-next="playNext()"
      @play-prev="playPrev()"
    />
    <!-- <PlayerController
      :key="uniquetracks[selectedTrackIndex]"
      :track="uniquetracks[selectedTrackIndex]"
      :audio="audio"
      :autoplay="autoplay"
      @play-next="playNext()"
      @play-prev="playPrev()"
    /> -->
  </div>
</template>

<script>
  import spotify from '../api/spotify'
  import PlayerController from '../components/PlayerController.vue'
  import { mapGetters } from 'vuex'
  import { playOneSong } from '../api/spotify.js'

  export default {
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    components: {
      PlayerController
    },

    async created() {
      const songId = this.$route.params.id
      this.uniquetracks = await spotify.getTracks(songId)
      this.tracks = this.uniquetracks.preview_url

      console.log(this.tracks, 'hej')
    },
    data() {
      return {
        uniquetracks: null,
        tracks: null,
        selectedTrackIndex: null,
        autoplay: true,
        isPlaying: false,
        audio: new Audio()
      }
    },

    methods: {
      async playSpotifyTrack() {
        const accessToken = this.$store.state.accessToken
        const songId = this.$route.params.id
        const track = await spotify.getTracks(songId)
        const uri = track.uri
        console.log(uri, 'hdhdhdhvff')

        // const track = this.tracks[index].track.uri
        const playThis = await playOneSong(accessToken, uri)
        // console.log(track, 'is this right?')
        return playThis
      },
      formatDuration(durationMs) {
        const minutes = Math.floor(durationMs / 1000 / 60)
        const seconds = Math.floor((durationMs / 1000) % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      },
      // play track from list
      playTrack(index) {
        if (index === this.selectedTrackIndex) {
          return
        }

        const track = this.uniquetracks
        console.log('Playing track:', track.name)
        console.log('Track URL:', track.preview_url)
        this.selectedTrackIndex = index
        this.isPlaying = true
      }
    }
  }
</script>

<style scoped>
  /* player-container Used on many pages important, don't adjust*/
  .playerContainer {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(18.2px);
    -webkit-backdrop-filter: blur(18.2px);
    /* color: rgb(41, 38, 38); */
  }
  /* Artist Header */
  .artistPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  .artistHeader {
    display: flex;
    justify-content: left;
    margin-bottom: 2rem;
    margin-right: 50%;
    align-items: baseline;
  }

  .artistImage {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 3rem;
    margin-left: 5rem;
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
    padding-bottom: 100px;
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
      '. headerLine headerLine headerLine headerLine headerLine headerLine ';
    margin-right: auto;
  }

  h1 {
    padding: 0px;
    margin-bottom: 0px;
    font-size: medium;
  }

  /* track heading */
  .titleHeading {
    font-size: 17px;
    margin-left: 9rem;
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
    /* margin-right: 5rem;
    margin-top: 0;
    margin-bottom: 0; */
    margin: 0 5rem;
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
    margin-left: 4rem;
  }

  .trackImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 768px) and (max-width: 980px) {
    .headerLine {
      margin-right: 4rem;
      margin-top: 0;
      margin-bottom: 4rem;
    }

    .titleHeading {
      margin-left: 11rem;
    }
    .trackImage {
      margin-left: 5rem;
    }

    .headerline {
      margin-left: 5rem;
    }
  }

  @media (min-width: 481px) and (max-width: 767px) {
    .artistHeader {
      margin-left: 5rem;
    }

    .trackHeadings {
      display: none;
    }
    .artistImage {
      width: 200px;
      height: 200px;
    }

    .trackDetails {
      display: grid;
      justify-items: start;
      align-items: left;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: minmax(35px, auto);
      grid-template-areas:
        'trackImage trackTitle trackTitle'
        'trackImage trackArtist trackLength';
      margin-right: 2rem;
      margin-left: 0;
    }

    .trackTitle {
      font-size: 16px;
      width: 180px;
      margin-left: 0;
    }

    .headerLine {
      margin-right: 1rem;
      margin-left: 1rem;
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  @media (max-width: 480px) {
    .artistImage {
      width: 150px;
      height: 150px;
    }
    .trackDetails {
      display: grid;
      justify-items: start;
      align-items: left;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: minmax(35px, auto);
      grid-template-areas:
        'trackImage trackTitle trackTitle'
        'trackImage trackArtist trackLength';
      margin-right: 4rem;
      margin-left: 0;
    }

    .trackTitle {
      font-size: 16px;
      font-weight: bold;
      width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }

    .headerLine {
      margin-right: 1rem;
      margin-left: 1rem;
      margin-top: 0;
      margin-bottom: 0;
    }

    .trackImage {
      margin-left: 0;
    }

    .trackHeadings {
      display: none;
    }
  }
</style>
