import sinon from 'sinon'
import { mutations, actions, getters, state } from '@/store/inventory'

function extendState(updates) {
  return Object.assign({}, state(), updates)
}

describe('InventoryStore', () => {
  const defaultState = extendState({})

  describe('getters', () => {
    it('no setUp package category', () => {
      expect(getters.setUpPackageCategory(defaultState)).toBeNull()
    })
  })

  describe('mutations', () => {
    it('set setUp package category', () => {
      const state = extendState({})
      const instance = {
        id: 10
      }

      mutations.SET_UP_PACKAGE_CATEGORY(state, instance)

      expect(state.setUpPackageCategory).toBe(instance)
    })

    it('clear', () => {
      const state = extendState({
        setUpPackageCategory: {
          id: 10
        }
      })

      expect(state.setUpPackageCategory).not.toBeNull()

      mutations.CLEAR(state)

      expect(state.setUpPackageCategory).toBeNull()
    })
  })

  describe('actions', () => {
    it('clear', () => {
      const commit = sinon.spy()

      actions.clear({ commit, state: defaultState })

      expect(commit.args).toEqual([[mutations.CLEAR.name]])
    })

    it('set setUp package category', () => {
      const commit = sinon.spy()
      const instance = {
        id: 10
      }

      actions.setUpPackageCategory(
        {
          commit,
          state: defaultState
        },
        instance
      )

      expect(commit.args).toEqual([
        [mutations.SET_UP_PACKAGE_CATEGORY.name, instance]
      ])
    })
  })
})
