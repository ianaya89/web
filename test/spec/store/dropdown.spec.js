import sinon from 'sinon'
import { mutations, actions, getters, state } from '@/store/dropdown'

function extendState(updates) {
  return Object.assign({}, state(), updates)
}

describe('DropdownStore', () => {
  const defaultState = extendState({})

  describe('getters', () => {
    it('no openedDropdown', () => {
      expect(getters.getActiveDropdown(defaultState)).toBeNull()
    })
  })

  describe('mutations', () => {
    it('set active dropdown', () => {
      const state = extendState({})
      const instance = {
        id: 10
      }

      mutations.SET_ACTIVE_DROPDOWN(state, instance)

      expect(state.openedDropdown).toBe(instance)
    })

    it('clear', () => {
      const state = extendState({
        openedDropdown: {
          id: 10
        }
      })

      expect(state.openedDropdown).not.toBeNull()

      mutations.CLEAR(state)

      expect(state.openedDropdown).toBeNull()
    })
  })

  describe('actions', () => {
    it('clear', () => {
      const commit = sinon.spy()

      actions.clear({ commit, state: defaultState })

      expect(commit.args).toEqual([[mutations.CLEAR.name]])
    })

    it('set active dropdown', () => {
      const commit = sinon.spy()
      const instance = {
        id: 10
      }

      actions.setActiveDropdown(
        {
          commit,
          state: defaultState
        },
        instance
      )

      expect(commit.args).toEqual([
        [mutations.SET_ACTIVE_DROPDOWN.name, instance]
      ])
    })
  })
})
