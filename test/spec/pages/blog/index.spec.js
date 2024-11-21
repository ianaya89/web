import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/index'

describe('Blog Index page', () => {
  it('renders desired sections', () => {
    const wrapper = shallowMount(Index)

    expect(wrapper.element).toMatchSnapshot()
  })
})
