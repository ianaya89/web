import { shallowMount } from '@vue/test-utils'
import PublicHeader from '@/components/PublicHeader'

describe('PublicHeader', () => {
  it('renders PublicHeader', () => {
    const wrapper = shallowMount(PublicHeader, {
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

  it('returns current logged in user full name', () => {
    const wrapper = shallowMount(PublicHeader, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false
          }
        }
      }
    })

    expect(wrapper.vm.fullName).toEqual('')

    wrapper.vm.me = {
      profile: {
        firstName: 'John',
        lastName: 'Doe'
      }
    }

    expect(wrapper.vm.fullName).toEqual('John Doe')
  })

  it('returns link to dashboard for logged in user', () => {
    const wrapper = shallowMount(PublicHeader, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': true
          }
        }
      }
    })

    expect(wrapper.vm.resolvedEnterInApp).toEqual({})

    wrapper.vm.me = {
      units: [
        {
          id: 1
        }
      ]
    }

    expect(wrapper.vm.resolvedEnterInApp).toEqual({
      name: 'unit-id-dashboard',
      params: { id: 1 }
    })
  })
})
