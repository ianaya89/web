import { shallowMount } from '@vue/test-utils'
import AppFooter from '@/components/AppFooter'

describe('AppFooter', () => {
  const m$t = jest.fn()

  it('renders footer with current year and social media links', () => {
    const wrapper = shallowMount(AppFooter, {
      mocks: {
        $t: m$t
      }
    })

    expect(m$t).toHaveBeenCalledWith('general.rights')
    expect(m$t).toHaveBeenCalledWith('app.sidebar.team.privacy')
    expect(m$t).toHaveBeenCalledWith('app.sidebar.team.terms')
    expect(wrapper.text()).toContain(`© ${new Date().getFullYear()}`)
    expect(wrapper.element).toMatchSnapshot()
  })
})
