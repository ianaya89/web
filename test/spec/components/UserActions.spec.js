import { shallowMount } from '@vue/test-utils'
import UserActions from '@/components/UserActions'

describe('UserActions', () => {
  it('renders default UserActions', () => {
    const wrapper = shallowMount(UserActions)

    expect(wrapper.element).toMatchSnapshot()
  })
})
