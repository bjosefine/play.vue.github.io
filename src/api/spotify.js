const clientId = '424ae0b3a11c4659822d0aea1a2db86a'
const clientSecret = 'e9ee9f63754a4786b0b0a067253f7908'
// The redirect URI to be used when requesting access token from Spotify API
const redirectUri = 'http://localhost:5173/callback'

// The list of scopes that are being requested from the user
const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-read-playback-state',
  'user-modify-playback-state'
]

// A function that generates the authorization URL based on the above information
const getAuthorizationUrl = () => {
  const query = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes.join(' ')
  })

  return `https://accounts.spotify.com/authorize?${query.toString()}`
}

// A function that sends a request to Spotify API to exchange the login code for an access token
export const getTokenAuthorization = async (logincode) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: logincode,
      redirect_uri: redirectUri
    })
  })

  const data = await response.json()
  return data.access_token
}

// A function that sends a request to Spotify API to retrieve the user's information
export const getUserInfo = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })

  const data = await response.json()
  return data
}
// function to retrieve the device id
export const getDeviceId = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })

  const data = await response.json()
  console.log(data, 'DEVICE')
  return data.devices
}
// function to retrive the player
export const getSpotifyPlayer = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me/player', {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  const data = await response.json()
  console.log(data, 'PLAYER')
  return data
}
export const playThisSong = async (accessToken, uri, index) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: { Authorization: 'Bearer ' + accessToken },
    body: JSON.stringify({
      uris: [uri],
      offset: index
    })
  })
  console.log(response, 'ressksk')
  const data = await response.json()
  console.log(data, 'plaaythis')
  return data
}

// A function that sends a  request to Spotify API to revoke the access token
export const revokeAccessToken = async (accessToken) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      token: accessToken,
      token_type_hint: 'access_token'
    })
  })

  if (response.status === 200) {
    console.log('Access token revoked')
  } else {
    console.log('Failed to revoke access token')
  }
}

// gets current users playlists
export const getUserPlaylist = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })

  const data = await response.json()
  console.log(data, 'user playlist')
  console.log(accessToken, 'acessTok')
  return data
}
// A function that sends a request to Spotify API to retrieve the access token using the client credentials
const getToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })

  const data = await response.json()
  return data.access_token
}

// A function that sends a request to Spotify API to retrieve the featured playlists
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

/// Get specific playlist frosm api
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
  // Step 1: Get a valid access token
  const token = await getToken()

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track(name,id,album(name,images,release_date,uri),artists(name,id),duration_ms,preview_url,uri))`,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const data = await response.json()
  const tracks = data.items.filter((item) => item.track.preview_url)

  console.log(playlistId)
  console.log(data)
  return tracks
}

/// Get genres from api
const getGenres = async () => {
  const token = await getToken()
  const response = await fetch(`https://api.spotify.com/v1/browse/categories`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  const data = await response.json()
  console.log('genre', data.categories.items)
  return data.categories.items
}

// ///get genres name
// const getGenreName = async () => {
//   const token = await getToken()
//   const response = await fetch(
//     `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
//     {
//       headers: {
//         Authorization: 'Bearer ' + token
//       }
//     }
//   )
//   const data = await response.json()
//   return data
// }
// ///ends here

// Get category data to access categories playlists info
const getCategory = async (categoryId) => {
  const token = await getToken()
  const response = await fetch(
    `https://api.spotify.com/v1/browse/categories/${categoryId}`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )

  const data = await response.json()
  console.log('Category', data)
  return data
}
// Get categories for genres
const getCategoryPlaylist = async (categoryId) => {
  const token = await getToken()
  const response = await fetch(
    `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )

  const data = await response.json()
  console.log('Playlist', data)
  return data
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

const search = async (type, query) => {
  const token = await getToken()

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=${type}`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )

  const data = await response.json()

  return data
}

/// get featured artist
const getArtists = async (artistId) => {
  const token = await getToken()
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )

  const data = await response.json()
  console.log(data, 'hej')
  return data
}
// get artist top tracks
const getToptracks = async (artistId) => {
  const token = await getToken()
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=SE&limit=5`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )

  const data = await response.json()
  console.log(data.tracks, 'top')
  return data.tracks
}
// get albums
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
/// get new releases
const getNewReleases = async () => {
  const token = await getToken()
  const response = await fetch(
    'https://api.spotify.com/v1/browse/new-releases?country=SE&locale=sv-SE%2Csv%3Bq%3D0.8%2Cen-US%3Bq%3D0.5%2Cen%3Bq%3D0.3&offset=0&limit=12',
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )
  const data = await response.json()
  console.log(data.albums.items, 'new release')
  return data.albums.items
}

/// get tracks
const getTracks = async (songId) => {
  const token = await getToken()
  const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  const data = await response.json()

  console.log(data, 'låtar')
  return data
}

/// get artists albums
const getArtistsAlbums = async (artistId) => {
  const token = await getToken()
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )
  const data = await response.json()
  console.log(data.items, 'Albums')
  return data.items
}

//Get a specific albums tracks (No images)
const getAlbumTracks = async (albumId) => {
  const token = await getToken()
  const response = await fetch(
    `https://api.spotify.com/v1/albums/${albumId}/tracks`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )
  const data = await response.json()
  console.log(data.items, 'Album tracks')
  return data.items
}

// Get a specific album from album ID
const getSpecificAlbum = async (albumId) => {
  const token = await getToken()
  const response = await fetch(
    ` 	https://api.spotify.com/v1/albums/${albumId}`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )

  const data = await response.json()
  console.log(data, 'Get Specific Album')
  return data
}

export default {
  getFeaturedPlaylists,
  getPlaylist,
  getPlaylistTracks,
  searchTracks,
  getGenres,
  getAlbum,
  getNewReleases,
  getTracks,
  search,
  getArtists,
  getArtistsAlbums,
  getAlbumTracks,
  getToptracks,
  getSpecificAlbum,
  getCategoryPlaylist,
  getCategory,
  getAuthorizationUrl,
  getTokenAuthorization,
  getUserInfo,
  revokeAccessToken,
  getUserPlaylist,
  getDeviceId,
  getSpotifyPlayer,
  playThisSong
}
