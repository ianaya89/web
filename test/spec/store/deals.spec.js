import sinon from 'sinon'
import { state, getters, mutations, actions } from '@/store/deals'

function extendState(updates) {
  return Object.assign({}, state(), updates)
}

describe('DealsStore', () => {
  const defaultState = extendState({})

  describe('getters', () => {
    it('provides a default active view mobile', () => {
      expect(getters.activeViewMobile(defaultState)).toEqual('deal')
    })
  })

  describe('mutations', () => {
    it('set mobile view', () => {
      const state = extendState({})

      mutations.SET_MOBILE_VIEW(state, 'test')

      expect(state.activeViewMobile).toBe('test')
    })
  })

  describe('actions', () => {
    it('set mobile view', () => {
      const commit = sinon.spy()

      actions.setMobileView({ commit, state: defaultState }, 'test')

      expect(commit.args).toEqual([[mutations.SET_MOBILE_VIEW.name, 'test']])
    })
  })
})
