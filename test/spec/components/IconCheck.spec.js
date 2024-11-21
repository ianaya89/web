import { mount, shallowMount } from '@vue/test-utils'
import IconCheck from '@/components/IconCheck'

describe('IconCheck', () => {
  it('renders empty icon check', () => {
    const wrapper = shallowMount(IconCheck)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders icon checker', () => {
    const wrapper = mount(IconCheck, {
      propsData: {
        size: 'w-10 h-10'
      },
      slots: {
        default: '<svg-icon class="w-full h-full" name="inventory/30" />'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
    wrapper.trigger('click')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toEqual(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders not clickable icon checker', () => {
    const wrapper = mount(IconCheck, {
      propsData: {
        size: 'w-10 h-10',
        clickable: false
      },
      slots: {
        default: '<svg-icon class="w-full h-full" name="inventory/30" />'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
    wrapper.trigger('click')
    expect(wrapper.emitted('input')).toBeFalsy()
    expect(wrapper.emitted('input')).toEqual(undefined)
    expect(wrapper.element).toMatchSnapshot()
  })
})
