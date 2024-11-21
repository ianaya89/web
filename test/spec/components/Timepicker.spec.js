import { mount, shallowMount } from '@vue/test-utils'
import Timepicker from '@/components/Timepicker'

describe('Timepicker', () => {
  it('renders default timepicker', () => {
    const wrapper = shallowMount(Timepicker)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('emit input event', () => {
    const wrapper = mount(Timepicker)

    wrapper.vm.onInput(1)

    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toEqual(1)
  })
})
