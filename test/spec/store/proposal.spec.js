import sinon from 'sinon'
import { mutations, actions, getters, state } from '@/store/proposal'

function extendState(updates) {
  return Object.assign({}, state(), updates)
}

describe('ProposalStore', () => {
  const defaultState = extendState({})
  const mockedItems = [
    {
      marketplaceItem: { id: 10, price: 10, unit: { id: 10 } },
      slots: [{ slot: 12, quantity: 1 }, { slot: 12, quantity: 2 }]
    },
    {
      marketplaceItem: { id: 14, price: 10, unit: { id: 13 } },
      slots: [{ slot: 12, quantity: 1 }, { slot: 12, quantity: 2 }]
    },
    {
      marketplaceItem: {
        id: 12,
        price: 10,
        unit: { id: 10 },
        itemType: 'package'
      },
      slots: [{ slot: 12, quantity: 1 }, { slot: 12, quantity: 2 }]
    }
  ]

  describe('getters', () => {
    it('getLastMarketplaceSearch', () => {
      expect(getters.getLastMarketplaceSearch(defaultState)).toEqual(null)

      const state = extendState({
        lastMarketplaceSearch: {
          search: 1
        }
      })

      expect(getters.getLastMarketplaceSearch(state)).toEqual({
        search: 1
      })
    })

    it('isInProposal', () => {
      expect(getters.isInProposal(defaultState)(10)).toBeFalsy()

      const state = extendState({
        items: mockedItems
      })
      expect(getters.isInProposal(state)(10)).toBeTruthy()
    })

    it('itemPrice', () => {
      expect(getters.itemPrice(defaultState)(10)).toBe(0)

      const state = extendState({
        items: mockedItems
      })
      expect(getters.itemPrice(state)(10)).toBe(30)
    })

    it('allItems', () => {
      expect(getters.allItems(defaultState)).toEqual([])

      const state = extendState({
        items: mockedItems
      })
      expect(getters.allItems(state)).toEqual(mockedItems)
    })

    it('items', () => {
      expect(getters.items(defaultState)(13)).toEqual([])

      const state = extendState({
        items: mockedItems
      })
      expect(getters.items(state)(13)).toEqual([
        {
          marketplaceItem: { id: 14, price: 10, unit: { id: 13 } },
          slots: [{ slot: 12, quantity: 1 }, { slot: 12, quantity: 2 }]
        }
      ])
    })

    it('packagesCount', () => {
      expect(getters.packagesCount(defaultState)).toBe(0)

      const state = extendState({
        items: mockedItems
      })
      expect(getters.packagesCount(state)).toBe(1)
    })

    it('itemsCount', () => {
      expect(getters.itemsCount(defaultState)).toBe(0)

      const state = extendState({
        items: mockedItems
      })
      expect(getters.itemsCount(state)).toBe(2)
    })

    it('units', () => {
      expect(getters.units(defaultState)).toEqual([])

      const state = extendState({
        items: mockedItems
      })
      expect(getters.units(state).length).toBe(2)
    })

    it('unitSum', () => {
      expect(getters.unitSum(defaultState)(10)).toBe(0)

      const state = extendState({
        items: mockedItems
      })
      expect(getters.unitSum(state)(10)).toBe(60)
    })

    it('proposalSum', () => {
      expect(getters.proposalSum(defaultState)).toBe(0)

      const state = extendState({
        items: mockedItems
      })
      expect(getters.proposalSum(state)).toBe(90)
    })
  })

  describe('mutations', () => {
    it('test item structure', () => {
      const state = extendState({})
      let instance = {
        marketplaceItem: { id: 10, price: 10, unit: { id: 10 } },
        slots: [{ slot: 12 }, { slot: 12, quantity: 2 }]
      }

      expect(() => {
        mutations.ADD(state, instance)
      }).toThrow('Item has not proper structure.')

      expect(() => {
        mutations.UPDATE(state, instance)
      }).toThrow('Item has not proper structure.')

      instance = {
        marketplaceItem: { id: 10, price: 10, unit: { id: 10 } },
        slots: [{ slot: 12, quantity: 2 }, { slot: 12 }]
      }

      expect(() => {
        mutations.ADD(state, instance)
      }).toThrow('Item has not proper structure.')

      expect(() => {
        mutations.UPDATE(state, instance)
      }).toThrow('Item has not proper structure.')

      instance = {
        slots: [{ slot: 12, quantity: 1 }, { slot: 12, quantity: 2 }]
      }

      expect(() => {
        mutations.ADD(state, instance)
      }).toThrow('Item has not proper structure.')

      expect(() => {
        mutations.UPDATE(state, instance)
      }).toThrow('Item has not proper structure.')
    })

    it('add', () => {
      const state = extendState({})

      const instance = {
        marketplaceItem: { id: 10, price: 10, unit: { id: 10 } },
        slots: [{ slot: 12, quantity: 1 }, { slot: 12, quantity: 2 }]
      }

      mutations.ADD(state, instance)
      mutations.ADD(state, instance)

      expect(state.items).toEqual([instance])
    })

    it('update', () => {
      const state = extendState({
        items: [
          {
            marketplaceItem: { id: 10, price: 10, unit: { id: 10 } },
            slots: [{ slot: 12, quantity: 1 }, { slot: 12, quantity: 2 }]
          }
        ]
      })

      const instance = {
        marketplaceItem: { id: 10, price: 10, unit: { id: 10 } },
        slots: [{ slot: 1, quantity: 2 }, { slot: 2, quantity: 3 }]
      }

      mutations.UPDATE(state, instance)

      expect(state.items).toEqual([instance])
    })

    it('remove', () => {
      const state = extendState({
        items: [
          {
            marketplaceItem: { id: 10, price: 10, unit: { id: 10 } },
            slots: [{ slot: 12, quantity: 1 }, { slot: 12, quantity: 2 }]
          }
        ]
      })

      mutations.REMOVE(state, 10)
      mutations.REMOVE(state, 10)

      expect(state.items).toEqual([])
    })

    it('clear', () => {
      const state = extendState({
        items: mockedItems
      })

      expect(state.items).toEqual(mockedItems)

      mutations.CLEAR(state)

      expect(state.items).toEqual([])
    })

    it('set marketplace search', () => {
      const state = extendState({
        lastMarketplaceSearch: null
      })

      expect(state.lastMarketplaceSearch).toEqual(null)

      mutations.SET_MARKETPLACE_SEARCH(state, {
        search: 1
      })

      expect(state.lastMarketplaceSearch).toEqual({
        search: 1
      })
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

      actions.add({ commit, state: defaultState }, { id: 10 })

      expect(commit.args).toEqual([[mutations.ADD.name, { id: 10 }]])
    })

    it('updateItem', () => {
      const commit = sinon.spy()

      actions.updateItem({ commit, state: defaultState }, { id: 10 })

      expect(commit.args).toEqual([[mutations.UPDATE.name, { id: 10 }]])
    })

    it('removeItem', () => {
      const commit = sinon.spy()

      actions.removeItem({ commit, state: defaultState }, 10)

      expect(commit.args).toEqual([[mutations.REMOVE.name, 10]])
    })

    it('set marketplace search', () => {
      const commit = sinon.spy()

      actions.setMarketplaceSearch(
        { commit, state: defaultState },
        {
          search: 1
        }
      )

      expect(commit.args).toEqual([
        [
          mutations.SET_MARKETPLACE_SEARCH.name,
          {
            search: 1
          }
        ]
      ])
    })
  })
})
