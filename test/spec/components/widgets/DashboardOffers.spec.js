import { shallowMount } from '@vue/test-utils'
import DashboardOffers from '@/components/widgets/DashboardOffers'

describe('DashboardOffers', () => {
  it('renders DashboardOffers', () => {
    const wrapper = shallowMount(DashboardOffers, {
      propsData: {
        unitId: 1
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
