import { mount, shallowMount } from '@vue/test-utils'
import Pagination from '@/components/Pagination'

describe('Pagination', () => {
  it('renders default pagination', () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        length: 4
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('updates currentValue after value prop changes', async () => {
    const wrapper = mount(Pagination, {
      propsData: {
        value: 4,
        length: 4
      }
    })

    expect(wrapper.vm.currentValue).toEqual(4)

    await wrapper.setProps({ value: 2 })

    expect(wrapper.vm.currentValue).toEqual(2)
  })
})
