import { mount, shallowMount } from '@vue/test-utils'
import AppLabel from '@/components/AppLabel'

describe('AppLabel', () => {
  it('renders default label', () => {
    const wrapper = shallowMount(AppLabel)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders some props', () => {
    const wrapper = shallowMount(AppLabel, {
      propsData: {
        label: 'Custom label',
        textColor: 'white',
        color: 'secondary',
        disabled: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders with closing', () => {
    const wrapper = mount(AppLabel, {
      propsData: {
        closeable: true,
        disabled: true
      }
    })

    expect(wrapper.element).toMatchSnapshot()

    wrapper.find('.label-close').trigger('click')
    expect(wrapper.emitted('close')).toBeUndefined()
    expect(wrapper.element).toMatchSnapshot()

    wrapper.setProps({ closeable: true, disabled: false })
    wrapper.find('.label-close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })
})
