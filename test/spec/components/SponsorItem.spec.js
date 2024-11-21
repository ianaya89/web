import { shallowMount } from '@vue/test-utils'
import SponsorItem from '@/components/SponsorItem'

describe('SponsorItem', () => {
  it('renders SponsorItem with name', () => {
    const wrapper = shallowMount(SponsorItem, {
      propsData: {
        name: 'John'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
