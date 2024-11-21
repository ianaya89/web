export const state = () => ({
  setUpPackageCategory: null
})

export const getters = {
  setUpPackageCategory: state => {
    return state.setUpPackageCategory
  }
}

export const mutations = {
  SET_UP_PACKAGE_CATEGORY(state, category) {
    state.setUpPackageCategory = category
  },

  CLEAR(state) {
    state.setUpPackageCategory = null
  }
}

export const actions = {
  setUpPackageCategory({ commit }, category) {
    commit(mutations.SET_UP_PACKAGE_CATEGORY.name, category)
  },

  clear({ commit }) {
    commit(mutations.CLEAR.name)
  }
}
