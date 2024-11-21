import { mount, shallowMount } from '@vue/test-utils'
import AppSelect from '@/components/AppSelect'

describe('AppSelect', () => {
  it('renders default select', () => {
    const wrapper = shallowMount(AppSelect)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders some props', () => {
    const wrapper = shallowMount(AppSelect, {
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
        disabled: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('set value', () => {
    const wrapper = shallowMount(AppSelect, {
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

  it('emit input event', () => {
    const wrapper = mount(AppSelect, {
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

  it('it validate input field', async () => {
    const wrapper = mount(AppSelect, {
      propsData: {
        required: true,
        rules: [v => !!v || 'required'],
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

    wrapper.vm.validate()

    expect(wrapper.vm.$refs.select.valid).toBeFalsy()

    await wrapper.setProps({
      value: 1
    })

    wrapper.vm.validate()

    expect(wrapper.vm.$refs.select.valid).toBeTruthy()
  })

  it('it reset validation', () => {
    const wrapper = mount(AppSelect, {
      propsData: {
        required: true,
        rules: [v => !!v || 'required'],
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

    wrapper.vm.validate()

    expect(wrapper.vm.$refs.select.hasMessages).toBeTruthy()

    wrapper.vm.resetValidation()

    expect(wrapper.vm.$refs.select.hasMessages).toBeFalsy()
  })
})
