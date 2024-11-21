import { shallowMount } from '@vue/test-utils'
import AppHeaderMobile from '@/components/AppHeaderMobile'

describe('AppHeaderMobile', () => {
  it('renders default mobile header', () => {
    const wrapper = shallowMount(AppHeaderMobile)
    expect(wrapper.element).toMatchSnapshot()
  })
})
