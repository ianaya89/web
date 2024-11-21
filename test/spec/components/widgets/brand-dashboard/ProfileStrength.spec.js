import { shallowMount } from '@vue/test-utils'
import ProfileStrength from '@/components/widgets/brand-dashboard/ProfileStrength'

describe('ProfileStrength', () => {
  it('renders ProfileStrength', () => {
    const wrapper = shallowMount(ProfileStrength)

    expect(wrapper.element).toMatchSnapshot()
  })
})
