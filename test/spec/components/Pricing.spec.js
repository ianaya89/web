import { shallowMount } from '@vue/test-utils'
import Pricing from '@/components/Pricing'

describe('Pricing', () => {
  it('renders default Pricing', () => {
    const wrapper = shallowMount(Pricing)
    expect(wrapper.element).toMatchSnapshot()
    wrapper.setProps({
      loading: false
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders pricing with data', () => {
    const wrapper = shallowMount(Pricing, {
      mocks: {
        $store: {
          getters: {
            'auth/isAuthenticated': false
          }
        }
      },
      propsData: {
        loading: false,
        plans: {
          list: [
            {
              name: 'Free',
              slug: 'free',
              dealCommission: 0.06,
              accounts: 1,
              dataUpdates: 'QUARTERLY',
              free: true,
              custom: false,
              price: {
                monthly: 0,
                annualy: 0
              }
            },
            {
              name: 'Basic',
              slug: 'basic',
              dealCommission: 0.04,
              accounts: 3,
              dataUpdates: 'MONTHLY',
              free: false,
              custom: false,
              price: {
                monthly: 90,
                annualy: 900
              }
            },
            {
              name: 'Premium',
              slug: 'premium',
              dealCommission: 0.02,
              dataUpdates: 'CUSTOM',
              accounts: 10,
              free: false,
              custom: true,
              price: {}
            }
          ],
          support: [
            {
              name: 'Email',
              free: true,
              basic: true,
              premium: true
            }
          ],
          dashboards: [
            {
              name: 'Your team dashboard',
              free: true,
              basic: true,
              premium: true
            }
          ],
          features: [
            {
              name: 'Insights from social media you use',
              free: true,
              basic: true,
              premium: true
            }
          ]
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
