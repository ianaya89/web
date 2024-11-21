export const state = () => ({
  duplicateCampaign: null
})

export const getters = {
  duplicateCampaign: state => {
    return state.duplicateCampaign
  }
}

export const mutations = {
  DUPLICATE_CAMPAIGN(state, campaign) {
    state.duplicateCampaign = campaign
  },

  CLEAR(state) {
    state.duplicateCampaign = null
  }
}

export const actions = {
  duplicateCampaign({ commit }, campaign) {
    commit(mutations.DUPLICATE_CAMPAIGN.name, campaign)
  },

  clear({ commit }) {
    commit(mutations.CLEAR.name)
  }
}
