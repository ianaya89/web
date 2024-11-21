import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import InventoryPackageDetail from '@/components/inventory/InventoryPackageDetail'

describe('InventoryPackageDetail', () => {
  it('renders default InventoryPackageDetail', () => {
    const wrapper = shallowMount(InventoryPackageDetail)

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
