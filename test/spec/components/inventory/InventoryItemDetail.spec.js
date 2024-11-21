import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import InventoryItemDetail from '@/components/inventory/InventoryItemDetail'

describe('InventoryItemDetail', () => {
  it('renders default inventory item detail', () => {
    const wrapper = shallowMount(InventoryItemDetail)

    wrapper.setData({
      rules: {
        slotNotSelected: jest.fn(),
        seasonSlotNotSelected: jest.fn()
      },
      validationRules: {
        required: m => jest.fn()
      }
    })

    Vue.nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
