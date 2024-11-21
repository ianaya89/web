import { shallowMount } from '@vue/test-utils'
import InventorySpecialPricing from '@/components/inventory/InventorySpecialPricing'

describe('InventorySpecialPricing', () => {
  it('renders default InventorySpecialPricing', () => {
    const wrapper = shallowMount(InventorySpecialPricing)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('returns special pricing form validation based on data', () => {
    const wrapper = shallowMount(InventorySpecialPricing)

    expect(wrapper.vm.specialPricingFormValidation.required).toBeFalsy()

    wrapper.vm.shouldValidateSpecialPricingModalFrom = true

    expect(wrapper.vm.specialPricingFormValidation.required).toBeTruthy()
  })

  it('returns special pricings with industries', () => {
    const wrapper = shallowMount(InventorySpecialPricing, {
      propsData: {
        value: []
      }
    })

    expect(wrapper.vm.specialPricingItemsWithIndustries).toEqual([])

    wrapper.vm.industries = [
      {
        id: 2,
        name: 'industry name'
      }
    ]

    wrapper.vm.specialPricing = [
      {
        type: 'industry',
        meta: {
          conditionValue: 2
        }
      }
    ]

    expect(
      wrapper.vm.specialPricingItemsWithIndustries[0].industry.text
    ).toEqual('industry name')

    expect(
      wrapper.vm.specialPricingItemsWithIndustries[0].industry.value
    ).toEqual(2)
  })

  it('returns price increasing special pricings', () => {
    const wrapper = shallowMount(InventorySpecialPricing, {
      propsData: {
        value: [
          {
            type: 'industry',
            meta: {
              conditionValue: 2,
              coefficient: 0.1
            }
          },
          {
            type: 'industry',
            meta: {
              conditionValue: 2,
              coefficient: -0.1
            }
          }
        ]
      }
    })

    wrapper.vm.industries = [
      {
        id: 2,
        name: 'industry name'
      }
    ]

    expect(wrapper.vm.priceIncreasingSpecialPricingItems.length).toEqual(1)
    expect(
      wrapper.vm.priceIncreasingSpecialPricingItems[0].meta.coefficient
    ).toEqual(0.1)
  })

  it('returns price decreasing special pricings', () => {
    const wrapper = shallowMount(InventorySpecialPricing, {
      propsData: {
        value: [
          {
            type: 'industry',
            meta: {
              conditionValue: 2,
              coefficient: 0.1
            }
          },
          {
            type: 'industry',
            meta: {
              conditionValue: 2,
              coefficient: -0.1
            }
          }
        ]
      }
    })

    wrapper.vm.industries = [
      {
        id: 2,
        name: 'industry name'
      }
    ]

    expect(wrapper.vm.priceDecreasingSpecialPricingItems.length).toEqual(1)
    expect(
      wrapper.vm.priceDecreasingSpecialPricingItems[0].meta.coefficient
    ).toEqual(-0.1)
  })

  it('returns correct special pricing types', () => {
    const wrapper = shallowMount(InventorySpecialPricing)

    expect(wrapper.vm.specialPricingTypes.length).toEqual(4)
    expect(wrapper.vm.specialPricingTypes[0].value).toEqual('sessions')
    expect(wrapper.vm.specialPricingTypes[1].value).toEqual('exact_time')
    expect(wrapper.vm.specialPricingTypes[2].value).toEqual('quantity')
    expect(wrapper.vm.specialPricingTypes[3].value).toEqual('industry')
  })

  it('returns correct special pricing condition types', () => {
    const wrapper = shallowMount(InventorySpecialPricing)

    expect(wrapper.vm.specialPricingConditionTypes.length).toEqual(2)
    expect(wrapper.vm.specialPricingConditionTypes[0].value).toEqual('more')
    expect(wrapper.vm.specialPricingConditionTypes[1].value).toEqual('less')
  })

  it('returns exact times options', () => {
    const wrapper = shallowMount(InventorySpecialPricing, {
      propsData: {
        slots: [
          {
            slot: '2019'
          },
          {
            slot: '2020'
          }
        ]
      }
    })

    expect(wrapper.vm.specialPricingExactTimes.length).toEqual(2)
    expect(wrapper.vm.specialPricingExactTimes[0].value).toEqual('2019')
    expect(wrapper.vm.specialPricingExactTimes[1].value).toEqual('2020')
  })

  it('has correct industries for select boxes', () => {
    const wrapper = shallowMount(InventorySpecialPricing)

    wrapper.vm.industries = [
      {
        id: 1,
        name: 'industry name'
      },
      {
        id: 2,
        name: 'industry name 2'
      }
    ]

    expect(wrapper.vm.specialPricingIndustries.length).toEqual(2)
    expect(wrapper.vm.specialPricingIndustries[0].value).toEqual(1)
    expect(wrapper.vm.specialPricingIndustries[0].text).toEqual('industry name')
    expect(wrapper.vm.specialPricingIndustries[1].value).toEqual(2)
    expect(wrapper.vm.specialPricingIndustries[1].text).toEqual(
      'industry name 2'
    )
  })

  it('set specialPricing from value prop', () => {
    const wrapper = shallowMount(InventorySpecialPricing, {
      propsData: {
        value: [
          {
            type: 'quantity',
            meta: {
              conditionValue: 2,
              conditionType: 'more',
              coefficient: 0.1
            }
          }
        ]
      }
    })

    expect(wrapper.vm.specialPricing.length).toEqual(1)
    expect(wrapper.vm.specialPricing[0].type).toEqual('quantity')
    expect(wrapper.vm.specialPricing[0].meta.conditionType).toEqual('more')
    expect(wrapper.vm.specialPricing[0].meta.conditionValue).toEqual(2)
    expect(wrapper.vm.specialPricing[0].meta.coefficient).toEqual(0.1)
  })
})
