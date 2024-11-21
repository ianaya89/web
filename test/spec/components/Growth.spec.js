import { shallowMount } from '@vue/test-utils'
import Growth from '@/components/Growth'

describe('Growth', () => {
  it('renders Growth with value: 30', () => {
    const wrapper = shallowMount(Growth, {
      propsData: {
        value: 30
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders Growth with value: -30', () => {
    const wrapper = shallowMount(Growth, {
      propsData: {
        value: -30
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders Growth not colored text', () => {
    const wrapper = shallowMount(Growth, {
      propsData: {
        value: -30,
        applyColorOnText: false
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
