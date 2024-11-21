import { shallowMount } from '@vue/test-utils'
import Datepicker from '@/components/Datepicker'

describe('Datepicker', () => {
  it('renders default picker', () => {
    const wrapper = shallowMount(Datepicker)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('disabled picker', () => {
    const wrapper = shallowMount(Datepicker, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('bad type of picker', () => {
    const wrapper = shallowMount(Datepicker)

    const pickerType = wrapper.vm.$options.props.type

    expect(pickerType.type).toBe(String)
    expect(pickerType.validator && pickerType.validator('huaaaa')).toBeFalsy()
    expect(wrapper.element).toMatchSnapshot()
  })
})
