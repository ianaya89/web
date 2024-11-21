export const state = () => ({
  activeViewMobile: 'deal'
})

export const getters = {
  activeViewMobile: state => {
    return state.activeViewMobile
  }
}

export const mutations = {
  SET_MOBILE_VIEW(state, view) {
    state.activeViewMobile = view
  }
}

export const actions = {
  setMobileView({ commit }, view) {
    commit(mutations.SET_MOBILE_VIEW.name, view)
  }
}
