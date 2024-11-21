import { shallowMount } from '@vue/test-utils'
import AppButton from '@/components/AppButton'

describe('AppButton', () => {
  it('renders default button', () => {
    const wrapper = shallowMount(AppButton)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('button emit click event', () => {
    const wrapper = shallowMount(AppButton)

    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.emitted('clicked')).toBeTruthy()
    expect(button.attributes().disabled).toBeUndefined()
  })

  it('button hidden loader', async () => {
    const wrapper = shallowMount(AppButton, {
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
    expect(button.classes()).toContain('disabled')
    expect(wrapper.vm.loading).toBe(true)
    await wrapper.vm.loaded()
    expect(wrapper.vm.loading).toBe(false)
    expect(button.attributes().disabled).toBeUndefined()
  })

  it('can be disabled', () => {
    const wrapper = shallowMount(AppButton, {
      propsData: {
        disabled: true
      }
    })

    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.emitted('clicked')).toBeFalsy()
    expect(button.attributes().disabled).toBe('disabled')
    expect(button.classes()).toContain('disabled')
  })

  it('button custom title & class', () => {
    const wrapper = shallowMount(AppButton, {
      propsData: {
        title: 'Huraaa',
        btnClass: 'secondary'
      }
    })

    const button = wrapper.find('button')
    expect(button.text()).toBe('Huraaa')
    expect(button.classes()).toContain('button--secondary')
    expect(wrapper.props().title).toBe('Huraaa')
    expect(wrapper.props().btnClass).toBe('secondary')
  })

  it('button with icon', () => {
    const wrapper = shallowMount(AppButton, {
      propsData: {
        title: 'Huraaa',
        icon: 'lni-download'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
