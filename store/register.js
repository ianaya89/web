import { clear, fetchStored, persist } from '@/services/helpers'

export const state = () => ({
  newEntity: fetchStored('newEntity', {}),
  stripeClientToken: null
})

export const getters = {
  getEntity: state => {
    return state.newEntity
  },
  getStripeClientToken: state => {
    return state.stripeClientToken
  }
}

export const mutations = {
  SET(state, newEntity) {
    state.newEntity = newEntity
    clear('newEntity')
    persist('newEntity', state.newEntity)
  },

  SET_STRIPE_CLIENT_TOKEN(state, stripeClientToken) {
    state.stripeClientToken = stripeClientToken
  },

  CLEAR(state) {
    state.newEntity = []
    clear('newEntity')
  },

  CLEAR_STRIPE_CLIENT_TOKEN(state) {
    state.stripeClientToken = null
  }
}

export const actions = {
  set({ commit }, newEntity) {
    commit(mutations.SET.name, newEntity)
  },

  clear({ commit }) {
    commit(mutations.CLEAR.name)
  },

  setStripeClientToken({ commit }, stripeClientToken) {
    commit(mutations.SET_STRIPE_CLIENT_TOKEN.name, stripeClientToken)
  },

  clearStripeClientToken({ commit }) {
    commit(mutations.CLEAR_STRIPE_CLIENT_TOKEN.name)
  }
}
