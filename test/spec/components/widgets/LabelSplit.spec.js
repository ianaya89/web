import { mount } from '@vue/test-utils'
import LabelSplit from '@/components/widgets/LabelSplit'

describe('LabelSplit', () => {
  it('renders LabelSplit', () => {
    const wrapper = mount(LabelSplit, {
      propsData: {
        values: [
          {
            label: 'Test',
            value: 1
          }
        ]
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
