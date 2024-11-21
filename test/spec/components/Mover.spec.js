import { shallowMount, mount } from '@vue/test-utils'
import Mover from '@/components/Mover'

describe('Mover', () => {
  it('renders default Mover', () => {
    const wrapper = shallowMount(Mover, {
      propsData: {
        data: [2, 3]
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Inverted Mover simulation', () => {
    const wrapper = mount(Mover, {
      propsData: {
        data: [2, 3]
      }
    })

    expect(wrapper.element).toMatchSnapshot()
    wrapper.find('.fa-chevron-right').trigger('click')
    expect(wrapper.emitted('change')).toBeFalsy()

    wrapper.find('.fa-chevron-left').trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Mover simulation', () => {
    const wrapper = mount(Mover, {
      propsData: {
        data: [2, 3],
        inverted: false
      }
    })

    expect(wrapper.element).toMatchSnapshot()
    wrapper.find('.fa-chevron-left').trigger('click')
    expect(wrapper.emitted('change')).toBeFalsy()

    wrapper.find('.fa-chevron-right').trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('reset selected index after data changes', async () => {
    const wrapper = mount(Mover, {
      propsData: {
        data: [2, 3],
        inverted: false
      }
    })

    wrapper.vm.selectedIndex = 1

    await wrapper.setProps({ data: [2, 3, 4] })

    expect(wrapper.vm.selectedIndex).toEqual(0)
  })

  it('move backward', () => {
    const wrapper = mount(Mover, {
      propsData: {
        data: [2, 3],
        inverted: false
      }
    })

    wrapper.vm.selectedIndex = 1

    wrapper.vm.moveBackward()

    expect(wrapper.vm.selectedIndex).toEqual(0)
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('move forward', () => {
    const wrapper = mount(Mover, {
      propsData: {
        data: [2, 3],
        inverted: false
      }
    })

    wrapper.vm.moveForward()

    expect(wrapper.vm.selectedIndex).toEqual(1)
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
