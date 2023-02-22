const clientId = "424ae0b3a11c4659822d0aea1a2db86a";
const clientSecret = "e9ee9f63754a4786b0b0a067253f7908";
/// Get token from api 
const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  console.log(data.access_token)
  return data.access_token;
};
// Get  FeaturedPlaylists from api
const getFeaturedPlaylists = async () => {
  const token = await getToken();
  const response = await fetch(
    "https://api.spotify.com/v1/browse/featured-playlists",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const data = await response.json();
  return data.playlists.items;
};

const getPlaylist = async (playlistId) => {
  const token = await getToken();
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

const getPlaylistTracks = async (playlistId) => {
  const token = await getToken();
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data.items;
};

const getGenres = async () => {
  const token = await getToken();
  const response = await fetch("https://api.spotify.com/v1/browse/categories", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  return data.categories.items;
};

const searchTracks = async (query) => {
  const token = await getToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const data = await response.json();
  return data.tracks.items;
};

export default {
  getFeaturedPlaylists,
  getPlaylist,
  getPlaylistTracks,
  searchTracks,
  getGenres,
};
