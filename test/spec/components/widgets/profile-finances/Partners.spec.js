import { mount, shallowMount } from '@vue/test-utils'
import Partners from '@/components/widgets/profile-finances/Partners'

describe('Partners', () => {
  it('renders Partners', () => {
    const wrapper = shallowMount(Partners, {
      propsData: {
        unitId: 1
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('returns unit entity partners', () => {
    const wrapper = mount(Partners, {
      propsData: {
        unitId: 1
      }
    })

    expect(wrapper.vm.partners).toEqual([])
  })
})
