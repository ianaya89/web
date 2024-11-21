import { mount, shallowMount } from '@vue/test-utils'
import Sidebar from '@/components/Sidebar'
import SidebarLink from '@/components/SidebarLink'

describe('Sidebar', () => {
  it('renders default empty sidebar', () => {
    const wrapper = shallowMount(Sidebar)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders sidebar with links', () => {
    const linkWrapper = {
      render(render) {
        return render(SidebarLink, {
          propsData: {
            href: {
              name: 'team-profile-fans'
            }
          },
          slots: {
            default: 'Profile fans link'
          }
        })
      }
    }
    const linkWrapper2 = {
      render(render) {
        return render(SidebarLink, {
          propsData: {
            href: {
              name: 'team-dashboard'
            }
          },
          slots: {
            default: 'Dashboard'
          }
        })
      }
    }

    const wrapper = mount(Sidebar, {
      slots: {
        default: [linkWrapper, linkWrapper2]
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
