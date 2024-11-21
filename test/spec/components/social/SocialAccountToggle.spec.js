import { shallowMount } from '@vue/test-utils'
import SocialAccountToggle from '@/components/social/SocialAccountToggle'

describe('SocialAccountToggle', () => {
  it('renders SocialAccountToggle', () => {
    const wrapper = shallowMount(SocialAccountToggle, {
      mocks: {
        $helpers: {
          socialMediaIcon: jest.fn()
        }
      },
      propsData: {
        account: {
          id: 1,
          name: 'Totally awesome page',
          url: 'https://facebook.com/awesome-page',
          profilePicture: {
            url: ''
          },
          type: 'facebook',
          isAuthorized: true
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('checks if account is activated', () => {
    const wrapper = shallowMount(SocialAccountToggle, {
      mocks: {
        $helpers: {
          socialMediaIcon: jest.fn()
        }
      },
      propsData: {
        account: {
          id: 1,
          name: 'Totally awesome page',
          url: 'https://facebook.com/awesome-page',
          profilePicture: {
            url: ''
          },
          type: 'facebook',
          isAuthorized: false
        }
      }
    })

    expect(wrapper.vm.isActivated).toBeFalsy()

    wrapper.setProps({
      account: {
        id: 1,
        name: 'Totally awesome page',
        url: 'https://facebook.com/awesome-page',
        profilePicture: {
          url: ''
        },
        type: 'facebook',
        isAuthorized: true
      }
    })

    expect(wrapper.vm.isActivated).toBeTruthy()
  })
})
