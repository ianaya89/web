import { mount, shallowMount } from '@vue/test-utils'
import Multiselect from '@/components/Multiselect'

describe('Multiselect', () => {
  it('renders default multiselect', () => {
    const wrapper = shallowMount(Multiselect)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders multiselect with items', () => {
    const wrapper = shallowMount(Multiselect, {
      propsData: {
        items: [
          {
            text: 'First',
            value: 0
          },
          {
            text: 'Second',
            value: 1
          }
        ]
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('set value', () => {
    const wrapper = shallowMount(Multiselect, {
      propsData: {
        items: [
          {
            text: 'First',
            value: 0
          },
          {
            text: 'Second',
            value: 1
          }
        ]
      }
    })

    expect(wrapper.element).toMatchSnapshot()

    wrapper.setProps({
      value: 1
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('resolve correct labelMargins', () => {
    const wrapper = mount(Multiselect, {
      propsData: {
        items: [
          {
            text: 'First',
            value: 0
          },
          {
            text: 'Second',
            value: 1
          }
        ],
        label: null
      }
    })

    expect(wrapper.vm.labelMargins).toEqual('no-label')

    wrapper.setProps({
      label: 'Label'
    })

    expect(wrapper.vm.labelMargins).toEqual('')
  })

  it('emit input event', () => {
    const wrapper = mount(Multiselect, {
      propsData: {
        items: [
          {
            text: 'First',
            value: 0
          },
          {
            text: 'Second',
            value: 1
          }
        ]
      }
    })

    wrapper.vm.onSelect(1)

    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toEqual(1)
  })
})
