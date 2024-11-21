import { shallowMount } from '@vue/test-utils'
import AboutList from '@/components/widgets/AboutList'

describe('AboutList', () => {
  it('renders AboutList', () => {
    const wrapper = shallowMount(AboutList)

    expect(wrapper.element).toMatchSnapshot()
  })
})
