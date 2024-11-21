import { shallowMount } from '@vue/test-utils'
import ProfileCompleted from '@/components/widgets/team-dashboard/ProfileCompleted'

describe('ProfileCompleted', () => {
  it('renders ProfileCompleted', () => {
    const wrapper = shallowMount(ProfileCompleted, {
      propsData: {
        unitId: 1
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
