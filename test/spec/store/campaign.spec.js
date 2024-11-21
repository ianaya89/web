import sinon from 'sinon'
import { state, getters, mutations, actions } from '@/store/campaign'

function extendState(updates) {
  return Object.assign({}, state(), updates)
}

describe('CampaignStore', () => {
  const defaultState = extendState({})

  describe('getters', () => {
    it('no duplicating campaign', () => {
      expect(getters.duplicateCampaign(defaultState)).toBeNull()
    })
  })

  describe('mutations', () => {
    it('set duplicate campaign', () => {
      const state = extendState({})
      const dupCampaign = {
        id: 10
      }

      mutations.DUPLICATE_CAMPAIGN(state, dupCampaign)

      expect(state.duplicateCampaign).toBe(dupCampaign)
    })

    it('clear', () => {
      const state = extendState({
        duplicateCampaign: {
          id: 10
        }
      })

      expect(state.duplicateCampaign).not.toBeNull()

      mutations.CLEAR(state)

      expect(state.duplicateCampaign).toBeNull()
    })
  })

  describe('actions', () => {
    it('clear', () => {
      const commit = sinon.spy()

      actions.clear({ commit, state: defaultState })

      expect(commit.args).toEqual([[mutations.CLEAR.name]])
    })

    it('set duplicate campaign', () => {
      const commit = sinon.spy()
      const dupCampaign = {
        id: 10
      }

      actions.duplicateCampaign(
        {
          commit,
          state: defaultState
        },
        dupCampaign
      )

      expect(commit.args).toEqual([
        [mutations.DUPLICATE_CAMPAIGN.name, dupCampaign]
      ])
    })
  })
})
