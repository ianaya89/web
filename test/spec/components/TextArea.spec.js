import { mount, shallowMount } from '@vue/test-utils'
import TextArea from '@/components/TextArea'

describe('TextArea', () => {
  it('renders default textarea', () => {
    const wrapper = shallowMount(TextArea)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders sticky label', () => {
    const wrapper = shallowMount(TextArea, {
      propsData: {
        stickyLabel: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders input with placeholder outline and hint', () => {
    const wrapper = shallowMount(TextArea, {
      propsData: {
        placeholder: 'Your name',
        outline: true,
        label: 'First name',
        hint: 'Please write your first name',
        persistentHint: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('check input value', () => {
    const wrapper = mount(TextArea, {
      propsData: {
        value: 'Hello'
      }
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.element.value).toBe('Hello')
    textarea.setValue('value')
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0][0]).toEqual('value')
  })
})
