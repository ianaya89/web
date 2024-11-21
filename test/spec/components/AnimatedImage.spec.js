import { shallowMount } from '@vue/test-utils'
import AnimatedImage from '@/components/AnimatedImage'

jest.useFakeTimers()

describe('AnimatedImage', () => {
  it('renders default animated image', () => {
    const wrapper = shallowMount(AnimatedImage, {
      propsData: {
        src: 'some_image_url',
        alt: 'Image ale'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
    wrapper.vm.animateImg()

    // before the timeout runs out
    expect(wrapper.element).toMatchSnapshot()

    jest.runAllTimers()

    // after the timeout
    expect(wrapper.element).toMatchSnapshot()
  })
})
