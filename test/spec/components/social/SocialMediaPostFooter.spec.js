import { shallowMount } from '@vue/test-utils'
import SocialMediaPostFooter from '@/components/social/SocialMediaPostFooter'

describe('SocialMediaPostFooter', () => {
  it('renders SocialMediaPostFooter', () => {
    const wrapper = shallowMount(SocialMediaPostFooter, {
      mocks: {
        $helpers: {
          socialMediaIcon: jest.fn()
        }
      },
      propsData: {
        post: {
          type: 'video'
        },
        socialType: 'facebook'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
