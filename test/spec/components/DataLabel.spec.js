import { shallowMount } from '@vue/test-utils'
import DataLabel from '@/components/DataLabel'

describe('DataLabel', () => {
  it('renders default', () => {
    const wrapper = shallowMount(DataLabel)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders dash when value is undefined', () => {
    const wrapper = shallowMount(DataLabel, {
      propsData: {
        label: 'Custom label'
      },
      slots: {
        default: 'Some value in slot'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
