import { shallowMount } from '@vue/test-utils'
import LabelChart from '@/components/LabelChart'

describe('LabelChart', () => {
  it('renders default label chart', () => {
    const wrapper = shallowMount(LabelChart, {
      stubs: {
        PieChart: "<div class='PieChart'></div>"
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
