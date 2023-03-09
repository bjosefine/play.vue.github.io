import { createStore } from 'vuex'
import {
  getTokenAuthorization,
  getUserInfo,
  revokeAccessToken,
  getDeviceId
} from './api/spotify'

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    isLoggingOut: false,
    deviceId: null
  },
  mutations: {
    // Set the authentication status
    setAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    },
    // Set the user object
    setUser(state, user) {
      state.user = user
    },
    // Set the access token
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken
    },
    // Set the logging out status
    setLoggingOut(state, isLoggingOut) {
      state.isLoggingOut = isLoggingOut
    },
    // Clear the user data when logging out
    logout(state) {
      state.isAuthenticated = false
      state.user = null
      state.accessToken = null
    },
    setDevice(state, getDevice) {
      state.deviceId = getDevice
    }
  },
  actions: {
    // Log the user in
    async loginUser({ commit }, loginCode) {
      const accessToken = await getTokenAuthorization(loginCode)
      const userInfo = await getUserInfo(accessToken)
      const userDevice = await getDeviceId(accessToken)
      commit('setUser', userInfo)
      commit('setAuthenticated', true)
      commit('setAccessToken', accessToken)
      commit('setDevice', userDevice)

      // Save the access token to localStorage
      localStorage.setItem('access_token', accessToken)
    },
    // Log the user out
    async logoutUser({ commit }) {
      commit('setLoading', true) // commit setLoading mutation to true
      await revokeAccessToken()
      commit('logout')

      // Remove the access token from localStorage
      localStorage.removeItem('access_token')
    },
    // Get the user information
    async getUserInfo({ commit, state }, accessToken) {
      if (!accessToken) {
        accessToken = state.accessToken
      }
      const userInfo = await getUserInfo(accessToken)
      commit('setUser', userInfo)
    },
    async getDeviceId({ commit, state }, accessToken) {
      if (!accessToken) {
        accessToken = state.accessToken
      }
      const userDevice = await getDeviceId(accessToken)
      commit('setDevice', userDevice)
    }
  },
  getters: {
    // Get the authentication status
    isAuthenticated: (state) => state.isAuthenticated,
    // Get the user object
    getUser: (state) => state.user,
    // Get the access token from state or localStorage
    accessToken: (state) =>
      state.accessToken || localStorage.getItem('access_token'),
    // Get the logging out status
    isLoggingOut: (state) => state.isLoggingOut,
    getDevice: (state) => state.deviceId
  }
})
