import { shallowMount } from '@vue/test-utils'
import InventoryItemsList from '@/components/inventory/InventoryItemsList'

describe('InventoryItemsList', () => {
  it('renders default InventoryItemsList', () => {
    const wrapper = shallowMount(InventoryItemsList)
    expect(wrapper.element).toMatchSnapshot()
  })
})
