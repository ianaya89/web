export const state = () => ({
  permanentMenu: false,
  termsPrivacyMenu: null
})

export const getters = {
  isPermanentMenu: state => {
    return state.permanentMenu
  },

  getTermsPrivacyMenu: state => {
    return state.termsPrivacyMenu
  }
}

export const mutations = {
  SET_PERMANENT_MENU(state, value) {
    state.permanentMenu = value
  },

  SET_TERMS_PRIVACY_MENU(state, value) {
    state.termsPrivacyMenu = value
  },

  RESET_TERMS_PRIVACY_MENU(state) {
    state.termsPrivacyMenu = null
  },

  SET_DEFAULT(state) {
    state.permanentMenu = false
  }
}

export const actions = {
  setPermanentMenu({ commit }, value) {
    commit(mutations.SET_PERMANENT_MENU.name, value)
  },

  setDefault({ commit }) {
    commit(mutations.SET_DEFAULT.name)
  },

  setTermsPrivacyMenu({ commit }, value) {
    commit(mutations.SET_TERMS_PRIVACY_MENU.name, value)
  },

  resetTermsPrivacyMenu({ commit }) {
    commit(mutations.RESET_TERMS_PRIVACY_MENU.name)
  }
}
