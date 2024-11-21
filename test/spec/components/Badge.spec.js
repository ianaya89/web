import flushPromises from 'flush-promises'
import { shallowMount } from '@vue/test-utils'
import Badge from '@/components/Badge'

describe('Badge', () => {
  it('renders empty badge', () => {
    const wrapper = shallowMount(Badge)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders badge value 3', () => {
    const wrapper = shallowMount(Badge, {
      propsData: {
        value: '3'
      }
    })

    const badgeDiv = wrapper.find('div')
    expect(badgeDiv.find('span').exists()).toBe(true)
    expect(badgeDiv.find('span').text()).toBe('3')
    expect(wrapper.props().value).toBe('3')
  })

  it('renders big badge value', () => {
    const wrapper = shallowMount(Badge, {
      propsData: {
        value: '30'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
    wrapper.setProps({ value: 100 })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('check change badge value', async () => {
    const wrapper = shallowMount(Badge, {
      propsData: {
        value: '30'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
    wrapper.setProps({ value: 40 })
    wrapper.vm.valueChanged = true
    await flushPromises()
    wrapper.vm.valueChanged = false
  })
})
