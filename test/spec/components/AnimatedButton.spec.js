import { shallowMount } from '@vue/test-utils'
import AnimatedButton from '@/components/AnimatedButton'

describe('AnimatedButton', () => {
  it('renders default button', () => {
    const wrapper = shallowMount(AnimatedButton)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('button emit click event', () => {
    const wrapper = shallowMount(AnimatedButton)

    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.emitted('clicked')).toBeTruthy()
    expect(button.attributes().disabled).toBeUndefined()
  })

  it('button hidden loader', async () => {
    const wrapper = shallowMount(AnimatedButton, {
      propsData: {
        loader: true,
        shouldDisable: true
      }
    })

    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.props().loader).toBe(true)
    expect(wrapper.emitted('clicked')).toBeTruthy()
    expect(button.attributes().disabled).toBe('disabled')
    expect(wrapper.vm.loading).toBe(true)
    await wrapper.vm.loaded()
    expect(wrapper.vm.loading).toBe(false)
    expect(button.attributes().disabled).toBeUndefined()
  })

  it('can be disabled', () => {
    const wrapper = shallowMount(AnimatedButton, {
      propsData: {
        disabled: true
      }
    })

    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.emitted('clicked')).toBeFalsy()
    expect(button.attributes().disabled).toBe('disabled')
  })

  it('button custom title', () => {
    const wrapper = shallowMount(AnimatedButton, {
      propsData: {
        title: 'Huraaa'
      }
    })

    const button = wrapper.find('button')
    expect(button.text()).toBe('Huraaa')
  })

  it('button with icon', () => {
    const wrapper = shallowMount(AnimatedButton, {
      propsData: {
        title: 'Huraaa',
        icon: 'lni-download'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
