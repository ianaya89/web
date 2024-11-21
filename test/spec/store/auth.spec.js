import sinon from 'sinon'
import { state, getters, mutations, actions } from '@/store/auth'

function extendState(updates) {
  return Object.assign({}, state(), updates)
}

describe('AuthStore', () => {
  const defaultState = extendState({})

  describe('getters', () => {
    it('provides an access token', () => {
      expect(getters.accessToken(defaultState)).toBeNull()

      const populatedState = extendState({
        accessToken: 'foo123'
      })

      expect(getters.accessToken(populatedState)).toBe('foo123')
    })

    it('provides a refresh token', () => {
      expect(getters.accessToken(defaultState)).toBeNull()

      const populatedState = extendState({
        refreshToken: 'foo123'
      })

      expect(getters.refreshToken(populatedState)).toBe('foo123')
    })

    it('refreshing token', () => {
      expect(getters.accessToken(defaultState)).toBeNull()

      const populatedState = extendState({
        refreshingToken: true
      })

      expect(getters.refreshingToken(populatedState)).toBeTruthy()
    })

    it('checks if user is authenticated', () => {
      expect(getters.isAuthenticated(defaultState)).toBeFalsy()

      const populatedState = extendState({
        accessToken: 'foo123'
      })

      expect(getters.isAuthenticated(populatedState)).toBeTruthy()
    })
  })

  describe('mutations', () => {
    it('persists an access token', () => {
      const state = extendState({})

      mutations.PERSIST_ACCESS_TOKEN(state, 'foo123')

      expect(state.accessToken).toBe('foo123')
    })

    it('persists a refresh token', () => {
      const state = extendState({})

      mutations.PERSIST_REFRESH_TOKEN(state, 'bar123')

      expect(state.refreshToken).toBe('bar123')
    })

    it('set state as refreshing token', () => {
      const state = extendState({})

      mutations.REFRESHING_TOKEN(state, true)

      expect(state.refreshingToken).toBeTruthy()
    })

    it('persists an expiration time', () => {
      const state = extendState({})

      mutations.PERSIST_EXPIRATION(state, 123)

      expect(state.expiresIn).toBe(123)
    })

    it('clears out the state', () => {
      const state = extendState({
        accessToken: 'foo123',
        refreshToken: 'bar123',
        expiresIn: 123
      })

      mutations.LOGOUT(state)

      expect(state.accessToken).toBeNull()
      expect(state.refreshToken).toBeNull()
      expect(state.expiresIn).toBeNull()
    })
  })

  describe('actions', () => {
    it('logs user in', () => {
      const commit = sinon.spy()

      actions.login(
        { commit, state: defaultState },
        {
          accessToken: 'access123',
          refreshToken: 'refresh123',
          expiresIn: 123
        }
      )

      expect(commit.args).toEqual([
        [mutations.REFRESHING_TOKEN.name, false],
        [mutations.PERSIST_ACCESS_TOKEN.name, 'access123'],
        [mutations.PERSIST_REFRESH_TOKEN.name, 'refresh123'],
        [mutations.PERSIST_EXPIRATION.name, 123]
      ])
    })

    it('logs user out', () => {
      const commit = sinon.spy()

      actions.logout({
        commit,
        state: defaultState
      })

      expect(commit.args).toEqual([
        [mutations.REFRESHING_TOKEN.name, false],
        [mutations.LOGOUT.name]
      ])
    })

    it('refreshing token', () => {
      const commit = sinon.spy()

      actions.refreshingToken({
        commit,
        state: defaultState
      })

      expect(commit.args).toEqual([[mutations.REFRESHING_TOKEN.name, true]])
    })
  })
  // it('check actions', () => {
  //   const $store = new Vuex.Store({
  //     state: {
  //       currentUser: {}
  //     },
  //     mutations: mutations,
  //     actions: actions
  //   })

  //   $store.dispatch('login', { id: 12, name: 'Lukas' })
  //   expect($store.state.currentUser.id).toBe(12)
  //   expect($store.state.currentUser.name).toBe('Lukas')

  //   $store.dispatch('logout')
  //   expect($store.state.currentUser.id).toBe(undefined)
  //   expect($store.state.currentUser.name).toBe(undefined)
  // })

  // it('check mutations', () => {
  //   const localState = {
  //     currentUser: {}
  //   }
  //   mutations.set(localState, { id: 12, name: 'Lukas' })
  //   expect(localState.currentUser.id).toBe(12)
  //   expect(localState.currentUser.name).toBe('Lukas')

  //   mutations.unset(localState)
  //   expect(localState.currentUser.id).toBe(undefined)
  //   expect(localState.currentUser.name).toBe(undefined)
  // })
})
