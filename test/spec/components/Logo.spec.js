import { shallowMount } from '@vue/test-utils'
import Logo from '@/components/Logo'

describe('Logo', () => {
  it('renders default logo', () => {
    const wrapper = shallowMount(Logo, {
      propsData: {
        variant: 'dark'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
    wrapper.setProps({
      variant: 'light'
    })
    expect(wrapper.element).toMatchSnapshot()
    wrapper.setProps({
      variant: 'mobile'
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
