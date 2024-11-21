import { mount, shallowMount } from '@vue/test-utils'
import Dropdown from '@/components/Dropdown'

describe('Dropdown', () => {
  it('renders default', () => {
    const wrapper = shallowMount(Dropdown)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('check open/hide dropdown', () => {
    const wrapper = mount(Dropdown)

    wrapper.vm.toggleDropdown()
    expect(wrapper.element).toMatchSnapshot()
    wrapper.vm.toggleDropdown()
    expect(wrapper.element).toMatchSnapshot()

    wrapper.vm.toggleDropdown()
    expect(wrapper.element).toMatchSnapshot()
    wrapper.vm.hideDropdown()
    expect(wrapper.element).toMatchSnapshot()
  })
})
