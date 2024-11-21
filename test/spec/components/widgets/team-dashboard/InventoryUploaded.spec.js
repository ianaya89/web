import { shallowMount } from '@vue/test-utils'
import InventoryUploaded from '@/components/widgets/team-dashboard/InventoryUploaded'

describe('InventoryUploaded', () => {
  it('renders InventoryUploaded', () => {
    const wrapper = shallowMount(InventoryUploaded, {
      propsData: {
        unitId: 1
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
