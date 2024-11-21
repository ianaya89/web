import { mount, shallowMount } from '@vue/test-utils'
import Checkbox from '@/components/Checkbox'

describe('Checkbox', () => {
  it('renders default checkbox', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        checkboxValue: 10
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('check event value', () => {
    const wrapper = mount(Checkbox, {
      propsData: {
        checkboxValue: 10
      }
    })
    const input = wrapper.find('input')
    input.trigger('click')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toEqual(10)

    wrapper.setProps({ value: false })
    expect(wrapper.emitted('input')).toBeTruthy()
  })
})
