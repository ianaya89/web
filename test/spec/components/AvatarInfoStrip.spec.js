import { shallowMount } from '@vue/test-utils'
import AvatarInfoStrip from '@/components/AvatarInfoStrip'

describe('AvatarInfoStrip', () => {
  it('renders default', () => {
    const wrapper = shallowMount(AvatarInfoStrip)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders some prop', () => {
    const wrapper = shallowMount(AvatarInfoStrip, {
      propsData: {
        title: 'Custom title',
        info: 'Some basic long lorem ipsum',
        alt: 'My alt'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
