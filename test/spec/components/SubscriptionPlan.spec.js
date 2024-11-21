import { shallowMount } from '@vue/test-utils'
import SubscriptionPlan from '@/components/SubscriptionPlan'

describe('SubscriptionPlan', () => {
  it('renders SubscriptionPlan', () => {
    const wrapper = shallowMount(SubscriptionPlan, {
      propsData: {
        plans: [
          {
            id: 1,
            free: true,
            name: 'Test',
            price: null,
            description: 'Test description',
            deal_commision: 10,
            features: [
              {
                id: 1,
                name: 'Feature name'
              }
            ]
          },
          {
            id: 2,
            free: false,
            name: 'Test 2',
            price: null,
            description: 'Test 2 description',
            deal_commision: 10,
            features: [
              {
                id: 2,
                name: 'Feature 2 name'
              }
            ]
          }
        ],
        plan: {
          id: 1,
          free: true,
          name: 'Test',
          price: null,
          description: 'Test description',
          deal_commision: 10,
          features: [
            {
              id: 1,
              name: 'Feature name'
            }
          ]
        },
        team: {
          subscription: {
            id: 1
          }
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('toggle features', () => {
    const wrapper = shallowMount(SubscriptionPlan, {
      propsData: {
        plans: [
          {
            id: 1,
            free: true,
            name: 'Test',
            price: null,
            description: 'Test description',
            deal_commision: 10,
            features: [
              {
                id: 1,
                name: 'Feature name'
              }
            ]
          },
          {
            id: 2,
            free: false,
            name: 'Test 2',
            price: null,
            description: 'Test 2 description',
            deal_commision: 10,
            features: [
              {
                id: 2,
                name: 'Feature 2 name'
              }
            ]
          }
        ],
        plan: {
          id: 1,
          free: true,
          name: 'Test',
          price: null,
          description: 'Test description',
          deal_commision: 10,
          features: [
            {
              id: 1,
              name: 'Feature name'
            }
          ]
        },
        team: {
          subscription: {
            id: 1
          }
        }
      }
    })

    expect(wrapper.vm.featuresVisible).toBeFalsy()

    wrapper.vm.toggleFeatures()

    expect(wrapper.vm.featuresVisible).toBeTruthy()
  })

  it('returns toggle features button title', () => {
    const wrapper = shallowMount(SubscriptionPlan, {
      propsData: {
        plans: [
          {
            id: 1,
            free: true,
            name: 'Test',
            price: null,
            description: 'Test description',
            deal_commision: 10,
            features: [
              {
                id: 1,
                name: 'Feature name'
              }
            ]
          },
          {
            id: 2,
            free: false,
            name: 'Test 2',
            price: null,
            description: 'Test 2 description',
            deal_commision: 10,
            features: [
              {
                id: 2,
                name: 'Feature 2 name'
              }
            ]
          }
        ],
        plan: {
          id: 1,
          free: true,
          name: 'Test',
          price: null,
          description: 'Test description',
          deal_commision: 10,
          features: [
            {
              id: 1,
              name: 'Feature name'
            }
          ]
        },
        team: {
          subscription: {
            id: 1
          }
        }
      }
    })

    expect(wrapper.vm.toggleFeaturesButtonTitle).toEqual(
      'TRANSLATE:general.show_more'
    )

    wrapper.vm.featuresVisible = true

    expect(wrapper.vm.toggleFeaturesButtonTitle).toEqual(
      'TRANSLATE:general.show_less'
    )
  })

  it('returns billing type', () => {
    const wrapper = shallowMount(SubscriptionPlan, {
      propsData: {
        plans: [
          {
            id: 1,
            free: true,
            name: 'Test',
            price: null,
            description: 'Test description',
            deal_commision: 10,
            features: [
              {
                id: 1,
                name: 'Feature name'
              }
            ]
          },
          {
            id: 2,
            free: false,
            name: 'Test 2',
            price: null,
            description: 'Test 2 description',
            deal_commision: 10,
            features: [
              {
                id: 2,
                name: 'Feature 2 name'
              }
            ]
          }
        ],
        plan: {
          id: 1,
          free: true,
          name: 'Test',
          price: null,
          description: 'Test description',
          deal_commision: 10,
          features: [
            {
              id: 1,
              name: 'Feature name'
            }
          ]
        },
        team: {
          subscription: {
            id: 1
          }
        }
      }
    })

    expect(wrapper.vm.isBilled({ free: true })).toEqual(
      'TRANSLATE:app.team.settings.subscriptions.free'
    )
    expect(wrapper.vm.isBilled({ free: false })).toEqual(
      'TRANSLATE:app.team.settings.subscriptions.billed_annually'
    )
  })

  it('returns plan button title', () => {
    const wrapper = shallowMount(SubscriptionPlan, {
      propsData: {
        plans: [
          {
            id: 1,
            free: true,
            name: 'Test',
            price: null,
            description: 'Test description',
            deal_commision: 10,
            features: [
              {
                id: 1,
                name: 'Feature name'
              }
            ]
          },
          {
            id: 2,
            free: false,
            name: 'Test 2',
            price: null,
            description: 'Test 2 description',
            deal_commision: 10,
            features: [
              {
                id: 2,
                name: 'Feature 2 name'
              }
            ]
          }
        ],
        plan: {
          id: 1,
          free: true,
          name: 'Test',
          price: null,
          description: 'Test description',
          deal_commision: 10,
          features: [
            {
              id: 1,
              name: 'Feature name'
            }
          ]
        },
        team: {
          subscription: {
            id: 1
          }
        }
      }
    })

    expect(wrapper.vm.btnPlanTitle({ id: 1 })).toEqual(
      'TRANSLATE:app.team.settings.subscriptions.current'
    )
    expect(wrapper.vm.btnPlanTitle({ id: 2 })).toEqual(
      'TRANSLATE:app.team.settings.subscriptions.change'
    )
  })

  it('returns plan button classes', () => {
    const wrapper = shallowMount(SubscriptionPlan, {
      propsData: {
        plans: [
          {
            id: 1,
            free: true,
            name: 'Test',
            price: null,
            description: 'Test description',
            deal_commision: 10,
            features: [
              {
                id: 1,
                name: 'Feature name'
              }
            ]
          },
          {
            id: 2,
            free: false,
            name: 'Test 2',
            price: null,
            description: 'Test 2 description',
            deal_commision: 10,
            features: [
              {
                id: 2,
                name: 'Feature 2 name'
              }
            ]
          }
        ],
        plan: {
          id: 1,
          free: true,
          name: 'Test',
          price: null,
          description: 'Test description',
          deal_commision: 10,
          features: [
            {
              id: 1,
              name: 'Feature name'
            }
          ]
        },
        team: {
          subscription: {
            id: 1
          }
        }
      }
    })

    expect(wrapper.vm.btnClass({ id: 1 })).toEqual('link w-full')
    expect(wrapper.vm.btnClass({ id: 2 })).toEqual('primary w-full')
  })

  it('checks if plan is active', () => {
    const wrapper = shallowMount(SubscriptionPlan, {
      propsData: {
        plans: [
          {
            id: 1,
            free: true,
            name: 'Test',
            price: null,
            description: 'Test description',
            deal_commision: 10,
            features: [
              {
                id: 1,
                name: 'Feature name'
              }
            ]
          },
          {
            id: 2,
            free: false,
            name: 'Test 2',
            price: null,
            description: 'Test 2 description',
            deal_commision: 10,
            features: [
              {
                id: 2,
                name: 'Feature 2 name'
              }
            ]
          }
        ],
        plan: {
          id: 1,
          free: true,
          name: 'Test',
          price: null,
          description: 'Test description',
          deal_commision: 10,
          features: [
            {
              id: 1,
              name: 'Feature name'
            }
          ]
        },
        team: {
          subscription: {
            id: 1
          }
        }
      }
    })

    expect(wrapper.vm.isActivePlan({ id: 1 })).toBeTruthy()
    expect(wrapper.vm.isActivePlan({ id: 2 })).toBeFalsy()
  })

  it('emits event', () => {
    const wrapper = shallowMount(SubscriptionPlan, {
      propsData: {
        plans: [
          {
            id: 1,
            free: true,
            name: 'Test',
            price: null,
            description: 'Test description',
            deal_commision: 10,
            features: [
              {
                id: 1,
                name: 'Feature name'
              }
            ]
          },
          {
            id: 2,
            free: false,
            name: 'Test 2',
            price: null,
            description: 'Test 2 description',
            deal_commision: 10,
            features: [
              {
                id: 2,
                name: 'Feature 2 name'
              }
            ]
          }
        ],
        plan: {
          id: 1,
          free: true,
          name: 'Test',
          price: null,
          description: 'Test description',
          deal_commision: 10,
          features: [
            {
              id: 1,
              name: 'Feature name'
            }
          ]
        },
        team: {
          subscription: {
            id: 1
          }
        }
      }
    })

    wrapper.vm.upgradePlan({ id: 1 })

    expect(wrapper.emitted('upgrade-plan')).toBeTruthy()
    expect(wrapper.emitted('upgrade-plan')[0][0]).toEqual({ id: 1 })
  })
})
