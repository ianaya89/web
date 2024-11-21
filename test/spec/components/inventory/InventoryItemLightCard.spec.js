import { shallowMount } from '@vue/test-utils'
import InventoryItemLightCard from '@/components/inventory/InventoryItemLightCard'

describe('InventoryItemLightCard', () => {
  it('renders InventoryItemLightCard', () => {
    const wrapper = shallowMount(InventoryItemLightCard, {
      propsData: {
        item: {
          nameOverride: 'Name',
          category: {
            path: 'some / very / long / path'
          }
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('emits item-remove event', () => {
    const item = {
      nameOverride: 'Name',
      category: {
        path: 'some / very / long / path'
      }
    }

    const wrapper = shallowMount(InventoryItemLightCard, {
      propsData: {
        item
      }
    })

    wrapper.vm.onRemoveClick()

    expect(wrapper.emitted('item-remove')).toBeTruthy()
    expect(wrapper.emitted('item-remove')[0][0]).toEqual(item)
  })
})
