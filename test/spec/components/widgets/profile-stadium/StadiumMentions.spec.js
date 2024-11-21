import { shallowMount } from '@vue/test-utils'
import StadiumMentions from '@/components/widgets/profile-stadium/StadiumMentions'

describe('StadiumMentions', () => {
  it('renders StadiumMentions', () => {
    const wrapper = shallowMount(StadiumMentions, {
      propsData: {
        unitId: 1
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
