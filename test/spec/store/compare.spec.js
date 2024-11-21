import sinon from 'sinon'
import { mutations, actions, getters, state } from '@/store/compare'

function extendState(updates) {
  return Object.assign({}, state(), updates)
}

describe('CompareStore', () => {
  const defaultState = extendState({})

  describe('getters', () => {
    it('isInCompare', () => {
      const state = extendState({ items: [10] })

      expect(getters.isInCompare(state)(10)).toBeTruthy()
      expect(getters.isInCompare(state)(20)).toBeFalsy()
    })

    it('itemsCount', () => {
      expect(getters.itemsCount(defaultState)).toBe(0)

      const state = extendState({ items: [10] })
      expect(getters.itemsCount(state)).toBe(1)
    })

    it('items', () => {
      expect(getters.items(defaultState)).toEqual([])

      const state = extendState({ items: [10] })
      expect(getters.items(state, 10)).toEqual([10])
    })
  })

  describe('mutations', () => {
    it('add', () => {
      const state = extendState({})

      mutations.ADD(state, 10)

      expect(state.items).toEqual([10])

      mutations.ADD(state, 10)

      expect(state.items).toEqual([10])
    })

    it('remove', () => {
      const state = extendState({ items: [10] })
      expect(state.items).toEqual([10])

      mutations.REMOVE(state, 10)

      expect(state.items).toEqual([])

      mutations.REMOVE(state, 10)

      expect(state.items).toEqual([])
    })

    it('clear', () => {
      const state = extendState({ items: [10, 20] })

      expect(state.items).toEqual([10, 20])

      mutations.CLEAR(state)

      expect(state.items).toEqual([])
    })
  })

  describe('actions', () => {
    it('clear', () => {
      const commit = sinon.spy()

      actions.clear({ commit, state: defaultState })

      expect(commit.args).toEqual([[mutations.CLEAR.name]])
    })

    it('add', () => {
      const commit = sinon.spy()

      actions.add({ commit, state: defaultState }, 10)

      expect(commit.args).toEqual([[mutations.ADD.name, 10]])
    })

    it('addAll', () => {
      const commit = sinon.spy()

      actions.addAll({ commit, state: defaultState }, [10, 20])

      expect(commit.args).toEqual([
        [mutations.ADD.name, 10],
        [mutations.ADD.name, 20]
      ])
    })

    it('remove', () => {
      const commit = sinon.spy()

      actions.remove({ commit, state: defaultState }, 10)

      expect(commit.args).toEqual([[mutations.REMOVE.name, 10]])
    })
  })
})
