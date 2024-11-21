import { shallowMount, mount } from '@vue/test-utils'
import AppInput from '@/components/AppInput'

describe('AppInput', () => {
  it('renders default input', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: {
        appendIconClickCallback: jest.fn(),
        prependIconClickCallback: jest.fn()
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders email sticky label input', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: {
        type: 'email',
        stickyLabel: true,
        label: 'Email',
        appendIconClickCallback: jest.fn(),
        prependIconClickCallback: jest.fn()
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders input with placeholder outline and hint', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: {
        placeholder: 'Your name',
        outline: true,
        label: 'First name',
        hint: 'Please write your first name',
        persistentHint: true,
        appendIconClickCallback: jest.fn(),
        prependIconClickCallback: jest.fn()
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('check input value', async () => {
    const wrapper = mount(AppInput, {
      propsData: {
        value: 'Hello',
        appendIconClickCallback: jest.fn(),
        prependIconClickCallback: jest.fn()
      }
    })
    await wrapper.vm.$nextTick()
    const input = wrapper.find('input')
    expect(input.element.value).toBe('Hello')
    await input.setValue('value')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toEqual('value')
  })

  it('check password visible option', () => {
    const wrapper = mount(AppInput, {
      propsData: {
        type: 'password',
        passwordSwitch: true,
        appendedIcon: 'lni-eye',
        appendedIcon2: 'lni-cross-circle',
        appendIconClickCallback: jest.fn(),
        prependIconClickCallback: jest.fn()
      }
    })
    const appendIcon = wrapper.find('.v-input__icon--append .v-icon')

    expect(wrapper.element).toMatchSnapshot()
    appendIcon.trigger('click')
    expect(wrapper.element).toMatchSnapshot()
    appendIcon.trigger('click')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('check formatting currency value not affect event value', () => {
    const wrapper = mount(AppInput, {
      propsData: {
        isCurrency: true,
        appendIconClickCallback: jest.fn(),
        prependIconClickCallback: jest.fn()
      }
    })

    const input = wrapper.find('input')
    input.setValue(123123)
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toEqual(123123)
  })

  it('triggers input event with correct value format after input changes', () => {
    let wrapper = mount(AppInput, {
      propsData: {
        type: 'number'
      }
    })

    let input = wrapper.find('input')
    input.setValue('1234')

    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toEqual(Number(1234))

    wrapper = mount(AppInput)

    input = wrapper.find('input')
    input.setValue('1234')

    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toEqual('1234')
  })

  it('triggers change event with correct value format after onChange method', () => {
    let wrapper = mount(AppInput, {
      propsData: {
        type: 'number'
      }
    })

    wrapper.vm.onChange('1234')

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0][0]).toEqual(Number(1234))

    wrapper = mount(AppInput)

    wrapper.vm.onChange('1234')

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0][0]).toEqual('1234')
  })

  it('validate input field', () => {
    const wrapper = mount(AppInput, {
      propsData: {
        required: true,
        rules: [v => !!v || 'required']
      }
    })

    wrapper.vm.validate()

    expect(wrapper.vm.$refs.textfield.valid).toBeFalsy()

    const input = wrapper.find('input')
    input.setValue(123123)

    wrapper.vm.validate()

    expect(wrapper.vm.$refs.textfield.valid).toBeTruthy()
  })

  it('reset validation', () => {
    const wrapper = mount(AppInput, {
      propsData: {
        required: true,
        rules: [v => !!v || 'required']
      }
    })

    wrapper.vm.validate()

    expect(wrapper.vm.$refs.textfield.hasMessages).toBeTruthy()

    wrapper.vm.resetValidation()

    expect(wrapper.vm.$refs.textfield.hasMessages).toBeFalsy()
  })
})
