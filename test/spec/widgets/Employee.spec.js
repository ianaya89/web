import { shallowMount } from '@vue/test-utils'
import Employee from '@/components/widgets/Employee'

describe('Employee', () => {
  it('renders employee without email', () => {
    const wrapper = shallowMount(Employee, {
      propsData: {
        fullName: 'Some name',
        position: 'Founder'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
  it('renders employee with email', () => {
    const wrapper = shallowMount(Employee, {
      propsData: {
        fullName: 'Some name',
        position: 'Founder',
        email: 'test@test.com'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
