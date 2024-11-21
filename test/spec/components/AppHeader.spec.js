import { shallowMount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader'

describe('AppHeader', () => {
  it('renders default app header', () => {
    const wrapper = shallowMount(AppHeader, {
      slots: {
        default: 'some nav items'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
