import { shallowMount } from '@vue/test-utils'
import UserAvailableUnit from '@/components/UserAvailableUnit'

describe('UserAvailableUnit', () => {
  it('renders UserAvailableUnit', () => {
    const wrapper = shallowMount(UserAvailableUnit, {
      propsData: {
        unit: {
          id: 1,
          entity: {
            name: 'Test',
            logo: {
              url: ''
            }
          },
          organization: {
            name: 'Test two'
          }
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
