import { shallowMount } from '@vue/test-utils'
import SlickSlider from '@/components/SlickSlider'

describe('SlickSlider', () => {
  it('renders slider', () => {
    const wrapper = shallowMount(SlickSlider, {
      propsData: {
        items: [
          {
            name: 'Name',
            link: 'Link',
            position: 'Position',
            image: 'some image'
          },
          {
            name: 'Name',
            link: 'Link',
            position: 'Position',
            image: 'some image'
          }
        ]
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('check moving', () => {
    const wrapper = shallowMount(SlickSlider, {
      propsData: {
        items: [
          {
            name: 'Name',
            link: 'Link',
            position: 'Position',
            image: 'some image'
          },
          {
            name: 'Name',
            link: 'Link',
            position: 'Position',
            image: 'some image'
          }
        ]
      }
    })

    wrapper.vm.sliderToLeft()
    expect(wrapper.vm.itemIndex).toBe(0)
    wrapper.vm.sliderToRight()
    expect(wrapper.vm.itemIndex).toBe(1)
    wrapper.vm.sliderToLeft()
    expect(wrapper.vm.itemIndex).toBe(0)
  })
})
