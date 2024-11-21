import sinon from 'sinon'
import { mutations, actions, getters, state } from '@/store/public-menu'

function extendState(updates) {
  return Object.assign({}, state(), updates)
}

describe('PublicMenuStore', () => {
  const defaultState = extendState({})

  describe('getters', () => {
    it('isPermanentMenu', () => {
      expect(getters.isPermanentMenu(defaultState)).toBeFalsy()
    })

    it('getTermsPrivacyMenu', () => {
      expect(getters.getTermsPrivacyMenu(defaultState)).toBeNull()
    })
  })

  describe('mutations', () => {
    it('set permanent menu', () => {
      const state = extendState({})

      mutations.SET_PERMANENT_MENU(state, true)

      expect(state.permanentMenu).toBeTruthy()
    })

    it('set terms/privacy menu', () => {
      const state = extendState({})

      mutations.SET_TERMS_PRIVACY_MENU(state, 'terms')

      expect(state.termsPrivacyMenu).toBe('terms')
    })

    it('reset terms/privacy menu', () => {
      const state = extendState({
        termsPrivacyMenu: 'privacy'
      })

      mutations.RESET_TERMS_PRIVACY_MENU(state, 'terms')

      expect(state.termsPrivacyMenu).toBeNull()
    })

    it('default', () => {
      const state = extendState({
        permanentMenu: true,
        termsPrivacyMenu: 'privacy'
      })

      expect(state.permanentMenu).toBeTruthy()
      expect(state.termsPrivacyMenu).not.toBeNull()

      mutations.SET_DEFAULT(state)

      expect(state.permanentMenu).toBeFalsy()
    })
  })

  describe('actions', () => {
    it('setDefault', () => {
      const commit = sinon.spy()

      actions.setDefault({ commit, state: defaultState })

      expect(commit.args).toEqual([[mutations.SET_DEFAULT.name]])
    })

    it('setPermanentMenu', () => {
      const commit = sinon.spy()

      actions.setPermanentMenu(
        {
          commit,
          state: defaultState
        },
        true
      )

      expect(commit.args).toEqual([[mutations.SET_PERMANENT_MENU.name, true]])
    })

    it('setTermsPrivacyMenu', () => {
      const commit = sinon.spy()

      actions.setTermsPrivacyMenu(
        {
          commit,
          state: defaultState
        },
        'terms'
      )

      expect(commit.args).toEqual([
        [mutations.SET_TERMS_PRIVACY_MENU.name, 'terms']
      ])
    })

    it('resetTermsPrivacyMenu', () => {
      const commit = sinon.spy()

      actions.resetTermsPrivacyMenu({
        commit,
        state: defaultState
      })

      expect(commit.args).toEqual([[mutations.RESET_TERMS_PRIVACY_MENU.name]])
    })
  })
})
