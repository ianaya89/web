import { shallowMount } from '@vue/test-utils'
import TopSocialMediaPosts from '@/components/widgets/team-dashboard/TopSocialMediaPosts'

describe('TopSocialMediaPosts', () => {
  it('renders TopSocialMediaPosts', () => {
    const wrapper = shallowMount(TopSocialMediaPosts, {
      propsData: {
        unitId: 1
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
