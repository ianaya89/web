import { shallowMount } from '@vue/test-utils'
import PublicMenu from '@/components/menus/PublicMenu'

describe('PublicMenu', () => {
  it('renders PublicMenu', () => {
    const wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false
          }
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('determines whether termsMenu should be shown', () => {
    let wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false,
            'public-menu/getTermsPrivacyMenu': 'TERMS_MENU'
          }
        }
      }
    })

    expect(wrapper.vm.termsMenu).toBeTruthy()

    wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false,
            'public-menu/getTermsPrivacyMenu': null
          }
        }
      }
    })

    expect(wrapper.vm.termsMenu).toBeFalsy()
  })

  it('determines whether privacyMenu should be shown', () => {
    let wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false,
            'public-menu/getTermsPrivacyMenu': 'PRIVACY_MENU'
          }
        }
      }
    })

    expect(wrapper.vm.privacyMenu).toBeTruthy()

    wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false,
            'public-menu/getTermsPrivacyMenu': null
          }
        }
      }
    })

    expect(wrapper.vm.privacyMenu).toBeFalsy()
  })

  it('determines whether menu is pernament', () => {
    let wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false,
            'public-menu/isPermanentMenu': true
          }
        }
      }
    })

    expect(wrapper.vm.isPermanentMenu).toBeTruthy()

    wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false,
            'public-menu/isPermanentMenu': false
          }
        }
      }
    })

    expect(wrapper.vm.isPermanentMenu).toBeFalsy()
  })

  it('scrolledHeaderVariant', () => {
    const wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false
          }
        }
      }
    })

    expect(wrapper.vm.scrolledHeaderVariant).toBeFalsy()

    wrapper.setData({
      bodyScrolled: true
    })

    expect(wrapper.vm.scrolledHeaderVariant).toBeTruthy()
  })

  it('scrolledLogoVariant', () => {
    const wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false
          }
        }
      }
    })

    expect(wrapper.vm.scrolledLogoVariant).toBeFalsy()

    wrapper.setData({
      permanentDarkLogo: true
    })

    expect(wrapper.vm.scrolledLogoVariant).toBeTruthy()
  })

  it('scrolledHeader', () => {
    const wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false
          }
        }
      }
    })

    expect(wrapper.vm.scrolledHeader).toEqual('')

    wrapper.setData({
      bodyScrolled: true
    })

    expect(wrapper.vm.scrolledHeader).toEqual('scrolled-header')
  })

  it('resolvedEnterInApp', () => {
    const wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false
          }
        }
      }
    })

    expect(wrapper.vm.resolvedEnterInApp).toEqual({ name: 'logout' })

    wrapper.setData({
      me: {
        units: [{ id: 4, entity: { __typename: 'Brand' } }]
      }
    })

    expect(wrapper.vm.resolvedEnterInApp).toEqual({
      name: 'unit-id-dashboard',
      params: { id: 4 }
    })
  })

  it('toggleMobileMenu', () => {
    const wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false
          }
        }
      }
    })

    expect(wrapper.vm.mobileMenuVisible).toBeFalsy()

    wrapper.vm.toggleMobileMenu()

    expect(wrapper.vm.mobileMenuVisible).toBeTruthy()

    wrapper.vm.toggleMobileMenu()

    expect(wrapper.vm.mobileMenuVisible).toBeFalsy()
  })

  it('sets correct bodyScrolled onScroll', () => {
    const wrapper = shallowMount(PublicMenu, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false
          }
        }
      }
    })

    expect(wrapper.vm.bodyScrolled).toBeFalsy()

    global.pageYOffset = 0

    wrapper.vm.onScroll()

    expect(wrapper.vm.bodyScrolled).toBeFalsy()

    global.pageYOffset = 30

    wrapper.vm.onScroll()

    expect(wrapper.vm.bodyScrolled).toBeTruthy()

    global.pageYOffset = 0

    wrapper.vm.onScroll()

    expect(wrapper.vm.bodyScrolled).toBeFalsy()
  })
})
