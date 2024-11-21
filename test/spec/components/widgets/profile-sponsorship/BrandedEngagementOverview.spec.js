import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import BrandedEngagementOverview from '@/components/widgets/profile-sponsorship/BrandedEngagementOverview'

describe('BrandedEngagementOverview', () => {
  it('renders BrandedEngagementOverview', () => {
    const wrapper = shallowMount(BrandedEngagementOverview)

    wrapper.setData({
      labelFormatter: jest.fn()
    })

    Vue.nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
