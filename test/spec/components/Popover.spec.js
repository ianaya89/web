import { shallowMount } from '@vue/test-utils'
import Popover from '@/components/Popover'

describe('Popover', () => {
  it('renders default popover', () => {
    const wrapper = shallowMount(Popover)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('popover position validation', () => {
    const wrapper = shallowMount(Popover)

    const position = wrapper.vm.$options.props.position

    expect(position.type).toBe(String)
    expect(position.validator && position.validator('huaaaa')).toBeFalsy()
    expect(position.validator && position.validator('bottom')).toBeTruthy()
  })
})
