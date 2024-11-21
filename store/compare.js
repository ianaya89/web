import { clear, fetchStored, persist } from '@/services/helpers'

export const state = () => ({
  items: fetchStored('compareItems', [])
})

export const getters = {
  isInCompare: state => itemId => {
    return state.items.indexOf(itemId) >= 0
  },

  itemsCount: state => {
    return state.items.length
  },

  items: state => {
    return state.items
  }
}

export const mutations = {
  ADD(state, compareItemID) {
    if (state.items.indexOf(compareItemID) === -1) {
      state.items.push(compareItemID)
      clear('compareItems')
      persist('compareItems', state.items)
    }
  },

  REMOVE(state, compareItemID) {
    const compareItemIndex = state.items.indexOf(compareItemID)
    if (compareItemIndex >= 0) {
      state.items.splice(compareItemIndex, 1)
      clear('compareItems')
      persist('compareItems', state.items)
    }
  },

  CLEAR(state) {
    state.items = []
    clear('compareItems')
    persist('compareItems', state.items)
  }
}

export const actions = {
  addAll({ commit }, compareItemsID) {
    compareItemsID.forEach(compareItemID => {
      commit(mutations.ADD.name, compareItemID)
    })
  },

  add({ commit }, compareItemID) {
    commit(mutations.ADD.name, compareItemID)
  },

  clear({ commit }) {
    commit(mutations.CLEAR.name)
  },

  remove({ commit }, compareItemID) {
    commit(mutations.REMOVE.name, compareItemID)
  }
}
