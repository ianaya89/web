export const state = () => ({
  openedDropdown: null
})

export const getters = {
  getActiveDropdown: state => {
    return state.openedDropdown
  }
}

export const mutations = {
  SET_ACTIVE_DROPDOWN(state, dropdownInstance) {
    state.openedDropdown = dropdownInstance
  },

  CLEAR(state) {
    state.openedDropdown = null
  }
}

export const actions = {
  setActiveDropdown({ commit }, dropdownInstance) {
    commit(mutations.SET_ACTIVE_DROPDOWN.name, dropdownInstance)
  },

  clear({ commit }) {
    commit(mutations.CLEAR.name)
  }
}
