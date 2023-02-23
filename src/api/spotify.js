const clientId = '424ae0b3a11c4659822d0aea1a2db86a'
const clientSecret = 'e9ee9f63754a4786b0b0a067253f7908'
/// send client id & secret to api
const getToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
  /// retrive the token from api
  const data = await response.json()
  console.log(data.access_token, 'token')
  return data.access_token
}
// Get  Featured Playlists from api
const getFeaturedPlaylists = async () => {
  const token = await getToken()
  const response = await fetch(
    'https://api.spotify.com/v1/browse/featured-playlists',
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )

  const data = await response.json()
  return data.playlists.items
}
/// Get specific playlist from api
const getPlaylist = async (playlistId) => {
  const token = await getToken()
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  const data = await response.json()
  return data
}
/// Get a list of song from playlist
const getPlaylistTracks = async (playlistId) => {
  const token = await getToken()
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  const data = await response.json()
  return data.items
}
/// Get genres from api
const getGenres = async () => {
  const token = await getToken()
  const response = await fetch('https://api.spotify.com/v1/browse/categories', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  const data = await response.json()
  return data.categories.items
}
/// search tracks from api
const searchTracks = async (query) => {
  const token = await getToken()
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )

  const data = await response.json()
  return data.tracks.items
}

const featuredPlaylistImages = async () => {
  const token = await getToken()
  const response = await fetch(
    `https://api.spotify.com/v1/browse/featured-playlists`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )
  console.log('hej')
  const data = await response.json()
  return data.playlist.images
}

/// get featured artist

const getAlbum = async () => {
  const token = await getToken()
  const response = await fetch(`https://api.spotify.com/v1/albums`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  const data = await response.json()
  return data.tracks.items
}

const getNewReleases = async () => {
  const token = await getToken()
  const response = await fetch(
    'https://api.spotify.com/v1/browse/new-releases?country=SE&locale=sv-SE%2Csv%3Bq%3D0.8%2Cen-US%3Bq%3D0.5%2Cen%3Bq%3D0.3&offset=0&limit=10',
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )
  const data = await response.json()
  console.log(data)
  return data
}

export default {
  getFeaturedPlaylists,
  getPlaylist,
  getPlaylistTracks,
  searchTracks,
  getGenres,
  featuredPlaylistImages,
  getAlbum,
  getNewReleases
}
