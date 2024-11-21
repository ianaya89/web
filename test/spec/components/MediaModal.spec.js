import { mount, shallowMount } from '@vue/test-utils'
import MediaModal from '@/components/MediaModal'

describe('MediaModal', () => {
  it('renders default modal', () => {
    const wrapper = shallowMount(MediaModal)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has correct modal classes for full page modal', () => {
    const wrapper = mount(MediaModal, {
      propsData: {
        fullPage: true
      }
    })

    expect(wrapper.vm.modalClasses).toEqual('min-w-screen min-h-screen')
  })

  it('has correct modal classes for classic modal size', () => {
    const wrapper = mount(MediaModal, {
      propsData: {
        fullPage: false
      }
    })

    expect(wrapper.vm.modalClasses).toEqual(wrapper.vm.modalSizeClasses)
  })

  it('opens modal', () => {
    const wrapper = mount(MediaModal)

    wrapper.vm.open()

    expect(wrapper.vm.visible).toBeTruthy()
  })

  it('closes modal', () => {
    const wrapper = mount(MediaModal)

    wrapper.vm.visible = true
    wrapper.vm.close()

    expect(wrapper.vm.visible).toBeFalsy()
  })
})
