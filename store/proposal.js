import Vue from 'vue'
import { uniqBy, cloneDeep } from 'lodash'
import { clear, fetchStored, get, persist } from '@/services/helpers'

const checkStructure = proposalItem => {
  if (!Object.prototype.hasOwnProperty.call(proposalItem, 'slots')) {
    throw new Error(
      '[PROPOSAL_STORE]: Item has not proper structure. Property slots is missing.'
    )
  }
  proposalItem.slots.forEach(item => {
    if (!Object.prototype.hasOwnProperty.call(item, 'slot')) {
      throw new Error(
        '[PROPOSAL_STORE]: Item has not proper structure. Slot item in slot is missing.'
      )
    }
    if (!Object.prototype.hasOwnProperty.call(item, 'quantity')) {
      throw new Error(
        '[PROPOSAL_STORE]: Item has not proper structure. Quantity item in slot is missing.'
      )
    }
  })
  if (!Object.prototype.hasOwnProperty.call(proposalItem, 'marketplaceItem')) {
    throw new Error(
      '[PROPOSAL_STORE]: Item has not proper structure. Property marketplaceItem is missing.'
    )
  }
}

export const state = () => ({
  items: fetchStored('proposalItems', []),
  lastMarketplaceSearch: fetchStored('lastMarketplaceSearch', null)
})

export const appliedSpecialPricingsForItem = (marketplaceItem, slot) => {
  return get(marketplaceItem, 'specialPricing', []).filter(pricing => {
    if (pricing.type === 'exact_time') {
      const itemSlot = marketplaceItem.slots.filter(s => s.id === slot.slot)[0]

      if (!itemSlot) {
        return false
      }

      return itemSlot.slot === pricing.meta.conditionValue
    }

    if (pricing.type === 'quantity') {
      if (pricing.conditionType === 'more') {
        return slot.quantity >= pricing.meta.conditionValue
      }

      return slot.quantity < pricing.meta.conditionValue
    }

    return false
  })
}

export const getSumOfItems = (items, ignoreSlotQuantities) => {
  return items
    .map(item => {
      const price = item.marketplaceItem.price

      return item.slots.reduce((sum, slot) => {
        const slotPrice = ignoreSlotQuantities ? price : price * slot.quantity

        const discount =
          slotPrice *
          appliedSpecialPricingsForItem(item.marketplaceItem, slot).reduce(
            (slotSum, pricing) => {
              return slotSum + pricing.meta.coefficient
            },
            0
          )

        return sum + (slotPrice + discount)
      }, 0)
    })
    .reduce((sum, item) => sum + item, 0)
}

export const getSumToOfItems = (items, ignoreSlotQuantities) => {
  return items
    .map(item => {
      let price = item.marketplaceItem.priceTo

      if (price === 0 || price === null) price = item.marketplaceItem.price

      return item.slots.reduce((sum, slot) => {
        const slotPrice = ignoreSlotQuantities ? price : price * slot.quantity

        const discount =
          slotPrice *
          appliedSpecialPricingsForItem(item.marketplaceItem, slot).reduce(
            (slotSum, pricing) => {
              return slotSum + pricing.meta.coefficient
            },
            0
          )

        return sum + (slotPrice + discount)
      }, 0)
    })
    .reduce((sum, item) => sum + item, 0)
}

const getUnitItems = (items, unitId) => {
  return items.filter(item => item.marketplaceItem.unit.id === unitId)
}

export const getters = {
  getLastMarketplaceSearch: state => {
    return state.lastMarketplaceSearch
  },

  hasError: state => {
    let hasError = false
    state.items.forEach(item => {
      if (uniqBy(item.slots, 'slot').length !== item.slots.length) {
        hasError = true
        return
      }

      item.slots.forEach(slot => {
        if (
          Number(slot.quantity) < 1 ||
          Number(slot.quantity) >
            item.marketplaceItem.slots.find(slot2 => slot2.id === slot.slot)
              .quantity
        ) {
          hasError = true
          return true
        }
      })
    })
    return hasError
  },

  isInProposal: state => itemId => {
    return state.items.find(item => item.marketplaceItem.id === itemId) != null
  },

  itemPrice: state => itemId => {
    const item = state.items.find(item => item.marketplaceItem.id === itemId)
    if (item == null) {
      return 0
    }
    return [getSumOfItems([item]), getSumToOfItems([item])]
  },

  items: state => unitId => {
    return getUnitItems(state.items, unitId)
  },

  allItems: state => {
    return state.items
  },

  packagesCount: state => {
    return state.items
      .filter(item => item.marketplaceItem.itemType === 'package')
      .reduce(sum => sum + 1, 0)
  },

  itemsCount: state => {
    return state.items
      .filter(item => item.marketplaceItem.itemType !== 'package')
      .reduce(sum => sum + 1, 0)
  },

  units: state => {
    const units = state.items.map(item => {
      return item.marketplaceItem.unit
    })

    return uniqBy(units, 'id')
  },

  unitSum: state => unitId => {
    return [
      getSumOfItems(getUnitItems(state.items, unitId)),
      getSumToOfItems(getUnitItems(state.items, unitId))
    ]
  },

  proposalSum: state => {
    return [getSumOfItems(state.items), getSumToOfItems(state.items)]
  }
}

export const mutations = {
  ADD(state, proposalItem) {
    checkStructure(proposalItem)
    if (state.items.indexOf(proposalItem) === -1) {
      state.items.push(proposalItem)
      clear('proposalItems')
      persist('proposalItems', state.items)
    }
  },

  UPDATE(state, newProposalItem) {
    checkStructure(newProposalItem)
    const proposalItemIndex = state.items.findIndex(
      item => item.marketplaceItem.id === newProposalItem.marketplaceItem.id
    )
    if (proposalItemIndex >= 0) {
      Vue.set(state.items, proposalItemIndex, newProposalItem)
      clear('proposalItems')
      persist('proposalItems', state.items)
    }
  },

  REMOVE(state, proposalItemId) {
    const proposalItemIndex = state.items.findIndex(
      item => item.marketplaceItem.id === proposalItemId
    )
    if (proposalItemIndex >= 0) {
      state.items.splice(proposalItemIndex, 1)
      clear('proposalItems')
      persist('proposalItems', state.items)
    }
  },

  CLEAR(state) {
    state.items = []
    clear('proposalItems')
  },

  SET_MARKETPLACE_SEARCH(state, searchFilterObj) {
    state.lastMarketplaceSearch = cloneDeep(searchFilterObj)
    persist('lastMarketplaceSearch', state.lastMarketplaceSearch)
  }
}

export const actions = {
  add({ commit }, proposalItem) {
    commit(mutations.ADD.name, proposalItem)
  },

  setMarketplaceSearch({ commit }, searchFilterObj) {
    commit(mutations.SET_MARKETPLACE_SEARCH.name, searchFilterObj)
  },

  clear({ commit }) {
    commit(mutations.CLEAR.name)
  },

  updateItem({ commit }, newProposalItem) {
    commit(mutations.UPDATE.name, newProposalItem)
  },

  removeItem({ commit }, proposalItemId) {
    commit(mutations.REMOVE.name, proposalItemId)
  }
}
