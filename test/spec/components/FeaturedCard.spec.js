import { shallowMount } from '@vue/test-utils'
import FeaturedCard from '@/components/FeaturedCard'

describe('FeaturedCard', () => {
  it('renders default', () => {
    const wrapper = shallowMount(FeaturedCard, {
      propsData: {
        unitId: '1',
        team: {}
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
