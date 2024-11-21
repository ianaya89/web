import { mount } from '@vue/test-utils'
import TweenContent from '@/components/TweenContent'

describe('TweenContent', () => {
  it('renders tween', () => {
    const wrapper = mount(TweenContent, {
      propsData: {
        localQuerySelector: 'span',
        duration: 500
      },
      slots: {
        default: '<span>1230 ks</span>'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
