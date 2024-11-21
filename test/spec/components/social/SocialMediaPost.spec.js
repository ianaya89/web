import { shallowMount } from '@vue/test-utils'
import SocialMediaPost from '@/components/social/SocialMediaPost'

describe('SocialMediaPost', () => {
  it('renders SocialMediaPost', () => {
    const wrapper = shallowMount(SocialMediaPost, {
      propsData: {
        post: {
          type: 'video'
        },
        socialType: 'facebook'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('checks if post has media', () => {
    const wrapper = shallowMount(SocialMediaPost, {
      propsData: {
        post: {
          type: 'video'
        },
        socialType: 'facebook'
      }
    })

    expect(wrapper.vm.hasMedia).toBeTruthy()

    wrapper.setProps({
      post: {
        type: 'image'
      }
    })

    expect(wrapper.vm.hasMedia).toBeTruthy()

    wrapper.setProps({
      post: {
        type: 'text'
      }
    })

    expect(wrapper.vm.hasMedia).toBeFalsy()
  })
})
