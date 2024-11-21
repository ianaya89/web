import { shallowMount } from '@vue/test-utils'
import PrivateMenu from '@/components/menus/PrivateMenu'

describe('PrivateMenu', () => {
  it('renders default PrivateMenu', () => {
    const wrapper = shallowMount(PrivateMenu)
    expect(wrapper.element).toMatchSnapshot()
  })
})
