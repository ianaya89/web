import { mount, shallowMount } from '@vue/test-utils'
import Heroes from '@/components/widgets/Heroes'

describe('Heroes', () => {
  it('renders Heroes', () => {
    const wrapper = shallowMount(Heroes, {
      propsData: {
        items: [
          {
            name: 'John',
            description: 'Lorem ipsum',
            logo: {
              url: 'URLLOGO'
            }
          }
        ]
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('toggleAll accordion items', () => {
    const wrapper = mount(Heroes, {
      propsData: {
        items: [
          {
            name: 'John',
            description: 'Lorem ipsum',
            logo: {
              url: 'URLLOGO'
            }
          }
        ]
      }
    })

    expect(wrapper.vm.toggledAll).toBeFalsy()
    expect(wrapper.element).toMatchSnapshot()

    wrapper.vm.toggleAll()

    expect(wrapper.vm.toggledAll).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()

    wrapper.vm.toggleAll()

    expect(wrapper.vm.toggledAll).toBeFalsy()
    expect(wrapper.element).toMatchSnapshot()
  })
})
