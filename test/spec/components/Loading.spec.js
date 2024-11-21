import { shallowMount } from '@vue/test-utils'
import Loading from '@/components/Loading'

describe('Loading', () => {
  it('renders default loading', () => {
    const wrapper = shallowMount(Loading)
    expect(wrapper.element).toMatchSnapshot()

    wrapper.vm.start()
    expect(wrapper.element).toMatchSnapshot()
    wrapper.vm.finish()
    expect(wrapper.element).toMatchSnapshot()
  })
})
