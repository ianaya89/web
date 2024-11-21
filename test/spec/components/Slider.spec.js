import { shallowMount } from '@vue/test-utils'
import Slider from '@/components/Slider'

describe('Slider', () => {
  it('renders default Slider', () => {
    const wrapper = shallowMount(Slider, {
      propsData: { value: 20 }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders range Slider specific min max', () => {
    const wrapper = shallowMount(Slider, {
      propsData: {
        range: true,
        value: [20, 500],
        min: 10,
        max: 10000
      }
    })
    expect(wrapper.element).toMatchSnapshot()

    wrapper.setProps({
      disabled: true
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
