import { mount } from '@vue/test-utils'
import MediaValue from '@/components/MediaValue'

describe('MediaValue', () => {
  it('renders MediaValue and iconSign is correct', () => {
    const wrapper = mount(MediaValue, {
      propsData: {
        media: {
          type: 'twitter',
          name: 'twitterAccount',
          followers: 456
        },
        metric: 'followers'
      }
    })

    expect(wrapper.vm.iconSign).toEqual('fab fa-twitter-square')
    expect(wrapper.element).toMatchSnapshot()
  })
})
