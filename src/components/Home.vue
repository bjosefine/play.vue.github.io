<template>
  <div class="home">
      <h1>Featured Playlists</h1>
      <div class="playlist-container" v-if="featuredPlaylists">
        <div class="playlist-list">
          <div v-for="playlist in featuredPlaylists" :key="playlist.id" class="playlist-item">
            <router-link :to="{ name: 'playlist', params: { id: playlist.id }}" class="playlist-link">
              <div class="playlist-image">
                <img :src="playlist.images[0].url" :alt="playlist.name" />
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="loading" v-else>
        Loading...
      </div>
    </div>
  
  </template>
  
    <script>
    import spotify from '../api/spotify.js'
    
    export default {
      name: "Home",
      data() {
        return {
          featuredPlaylists: null,
        };
      },
      async created() {
  
        this.featuredPlaylists = await spotify.getFeaturedPlaylists();
        console.log(this.playlist)
      },
    };
    </script>
    
  
    <style>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #191414;
    color: white;
    
  }
  
  h1 {
    font-size: 36px;
    margin: 40px 0;
    text-align: center;
  }
  
  .playlist-container {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
  }
  
  .playlist-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-bottom: 50px;
  }
  
  .playlist-item {
    width: 60px;
    min-width: 260px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(76, 43, 130, 0.25);
    box-shadow: 0 8px 32px 0 rgba(105, 38, 139, 0.37);
    backdrop-filter: blur( 7.5px );
    -webkit-backdrop-filter: blur( 7.5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  
  }
  
  .playlist-item:hover {
    transform: scale(1.05);
  }
  
  .playlist-link {
    text-decoration: none;
  }
  
  .playlist-image {
    width: 100%;
    max-width:140px;
    margin: 0 auto;
  }
  
  .playlist-image img {
    width: 100%;
    height: 100%;
    margin-top: 4%;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  .playlist-details {
    padding: 10px;
    text-align: center;
  }
  
  h2 {
    color: aliceblue;
    font-size: 18px;
    margin: 10px 0;
  }
  
  p {
    color: #aaa4a4;
    font-size: 14px;
    margin: 10px 0;
    height: 50px;
    
    
  }
  
  .loading {
    font-size: 24px;
    margin: 40px 0;
  }
  </style>