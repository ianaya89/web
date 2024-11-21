import { shallowMount } from '@vue/test-utils'
import SidebarLink from '@/components/SidebarLink'

describe('SidebarLink', () => {
  it('renders sidebar link', () => {
    const wrapper = shallowMount(SidebarLink, {
      propsData: {
        href: { name: 'team-dashboard' }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders sidebar link with badge', () => {
    const wrapper = shallowMount(SidebarLink, {
      propsData: {
        href: { name: 'team-dashboard' },
        badge: true,
        badgeValue: 10
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
