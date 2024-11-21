import { shallowMount } from '@vue/test-utils'
import FeaturedTopCard from '@/components/FeaturedTopCard'

describe('FeaturedTopCard', () => {
  it('renders default', () => {
    const wrapper = shallowMount(FeaturedTopCard)
    expect(wrapper.element).toMatchSnapshot()
  })
})
