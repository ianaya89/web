import { shallowMount } from '@vue/test-utils'
import CompareHeaderInfoItem from '@/components/CompareHeaderInfoItem'

describe('CompareHeaderInfoItem', () => {
  it('renders default compare header info', () => {
    const wrapper = shallowMount(CompareHeaderInfoItem, {
      propsData: {
        compareItemId: 10
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
