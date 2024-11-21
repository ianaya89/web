import { mount, shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal'

describe('Modal', () => {
  it('renders default modal', () => {
    const wrapper = shallowMount(Modal)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has correct modal classes for full page modal', () => {
    const wrapper = mount(Modal, {
      propsData: {
        fullPage: true
      }
    })

    expect(wrapper.vm.modalClasses).toEqual('min-w-screen min-h-screen')
  })

  it('has correct modal classes for classic modal size', () => {
    const wrapper = mount(Modal, {
      propsData: {
        fullPage: false
      }
    })

    expect(wrapper.vm.modalClasses).toEqual(wrapper.vm.modalSizeClasses)
  })

  it('opens modal and emits event', () => {
    const wrapper = mount(Modal)

    wrapper.vm.open()

    expect(wrapper.vm.visible).toBeTruthy()
    expect(wrapper.emitted('opened')).toBeTruthy()
  })

  it('closes modal and emits event', () => {
    const wrapper = mount(Modal)

    wrapper.vm.visible = true
    wrapper.vm.close()

    expect(wrapper.vm.visible).toBeFalsy()
    expect(wrapper.emitted('closed')).toBeTruthy()
  })
})
