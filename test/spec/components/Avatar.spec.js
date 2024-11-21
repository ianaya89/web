import { shallowMount } from '@vue/test-utils'
import Avatar from '@/components/Avatar'

describe('Avatar', () => {
  it('renders default avatar placeholder', () => {
    const wrapper = shallowMount(Avatar)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders avatar specific size', () => {
    const wrapper = shallowMount(Avatar, {
      propsData: {
        classes: 'h-10 w-10'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders not rounded avatar', () => {
    const wrapper = shallowMount(Avatar, {
      propsData: {
        rounded: false
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders avatar with icon sign', () => {
    const wrapper = shallowMount(Avatar, {
      propsData: {
        iconSign: 'fab fa-facebook-f'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders avatar with specific image', () => {
    const wrapper = shallowMount(Avatar, {
      propsData: {
        src: 'http://someurl.com/image.png'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
