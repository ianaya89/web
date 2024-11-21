import { mount, shallowMount } from '@vue/test-utils'
import Switcher from '@/components/Switcher'

describe('Switcher', () => {
  it('renders default switcher', () => {
    const wrapper = shallowMount(Switcher)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('switcher test value', () => {
    const wrapper = mount(Switcher, {
      propsData: {
        value: true
      }
    })

    expect(wrapper.element).toMatchSnapshot()
    wrapper.find('input').setChecked(false)
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toBeFalsy()
  })

  it('disabled switcher', () => {
    const wrapper = shallowMount(Switcher, {
      propsData: {
        disabled: true,
        label: 'My label'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
