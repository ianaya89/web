import { shallowMount } from '@vue/test-utils'
import InventoryIcon from '@/components/inventory/InventoryIcon'

describe('InventoryIcon', () => {
  it('renders default inventory icon', () => {
    const wrapper = shallowMount(InventoryIcon)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders package inventory icon', () => {
    const wrapper = shallowMount(InventoryIcon, {
      propsData: {
        category: {
          path: ''
        },
        isPackage: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
