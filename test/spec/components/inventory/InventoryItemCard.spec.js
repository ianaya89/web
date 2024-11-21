import { shallowMount } from '@vue/test-utils'
import InventoryItemCard from '@/components/inventory/InventoryItemCard'

describe('InventoryItemCard', () => {
  it('renders InventoryItemCard', () => {
    const wrapper = shallowMount(InventoryItemCard, {
      propsData: {
        item: {
          id: 1,
          nameOverride: 'override',
          category: {
            path: 'a / b / c'
          }
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('returns item categories', () => {
    const wrapper = shallowMount(InventoryItemCard, {
      propsData: {
        item: {
          id: 1,
          nameOverride: 'override',
          category: {
            path: 'a / b / c'
          }
        }
      }
    })

    expect(wrapper.vm.categories).toEqual({
      main: 'a',
      secondary: 'b',
      tertiary: 'c'
    })
  })

  it('returns item name', () => {
    let wrapper = shallowMount(InventoryItemCard, {
      propsData: {
        item: {
          id: 1,
          nameOverride: 'override',
          category: {
            path: 'a / b / c'
          }
        }
      }
    })

    expect(wrapper.vm.itemName).toEqual('override')

    wrapper = shallowMount(InventoryItemCard, {
      propsData: {
        item: {
          id: 1,
          nameOverride: false,
          category: {
            path: 'a / b / c'
          }
        }
      }
    })

    expect(wrapper.vm.itemName).toEqual(
      'TRANSLATE:app.marketplace.categories.c'
    )
  })
})
