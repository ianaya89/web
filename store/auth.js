import { fetchStored, persist, clear } from '@/services/helpers'

export const state = () => ({
  accessToken: fetchStored('accessToken', null),
  refreshToken: fetchStored('refreshToken', null),
  expiresIn: fetchStored('expiresIn', null),
  refreshingToken: false
})

export const getters = {
  accessToken: state => {
    return state.accessToken
  },

  refreshToken: state => {
    return state.refreshToken
  },

  refreshingToken: state => {
    return state.refreshingToken
  },

  isAuthenticated: state => {
    return state.accessToken !== null
  }
}

export const mutations = {
  PERSIST_ACCESS_TOKEN(state, token) {
    persist('accessToken', token)
    state.accessToken = token
  },

  REFRESHING_TOKEN(state, status) {
    state.refreshingToken = status
  },

  PERSIST_REFRESH_TOKEN(state, token) {
    persist('refreshToken', token)
    state.refreshToken = token
  },

  PERSIST_EXPIRATION(state, token) {
    persist('expiresIn', token)
    state.expiresIn = token
  },

  LOGOUT(state) {
    clear('accessToken')
    clear('refreshToken')
    clear('expiresIn')

    state.accessToken = null
    state.refreshToken = null
    state.expiresIn = null
  }
}

export const actions = {
  login({ commit }, { accessToken, refreshToken, expiresIn }) {
    commit(mutations.REFRESHING_TOKEN.name, false)
    commit(mutations.PERSIST_ACCESS_TOKEN.name, accessToken)
    commit(mutations.PERSIST_REFRESH_TOKEN.name, refreshToken)
    commit(mutations.PERSIST_EXPIRATION.name, expiresIn)
  },

  refreshingToken({ commit }) {
    commit(mutations.REFRESHING_TOKEN.name, true)
  },

  logout({ commit }) {
    commit(mutations.REFRESHING_TOKEN.name, false)
    commit(mutations.LOGOUT.name)
  }
}
