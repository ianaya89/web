import { mount } from '@vue/test-utils'
import CompareHeaderInfo from '@/components/CompareHeaderInfo'

describe('CompareHeaderInfo', () => {
  it('renders default compare header info', () => {
    const wrapper = mount(CompareHeaderInfo)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('check toggle compare dropdown', () => {
    const wrapper = mount(CompareHeaderInfo)

    wrapper.vm.toggleDropdown()
    expect(wrapper.element).toMatchSnapshot()
    wrapper.vm.toggleDropdown()
    expect(wrapper.element).toMatchSnapshot()
  })
})
