import { mount, shallowMount } from '@vue/test-utils'
import AppTooltip from '@/components/AppTooltip'

describe('AppTooltip', () => {
  it('renders default tooltip', () => {
    const wrapper = shallowMount(AppTooltip)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('activating tooltip', () => {
    const wrapper = mount(AppTooltip)

    const activator = wrapper.find('.activator')
    activator.trigger('mouseenter')

    expect(wrapper.element).toMatchSnapshot()
    activator.trigger('mouseleave')
    expect(wrapper.element).toMatchSnapshot()
  })
})
