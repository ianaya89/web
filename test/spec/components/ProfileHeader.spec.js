import { mount } from '@vue/test-utils'
import ProfileHeader from '@/components/ProfileHeader'

describe('ProfileHeader', () => {
  it('renders default profile header', () => {
    const wrapper = mount(ProfileHeader, {
      stubs: {
        LeaguePositionChart: "<div class='LeaguePositionChart'></div>"
      }
    })
    expect(wrapper.element).toMatchSnapshot()

    wrapper.vm.toggleMoreInfo()
    expect(wrapper.element).toMatchSnapshot()
  })
})
