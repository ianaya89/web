import { mount, shallowMount } from '@vue/test-utils'
import TipsCard from '@/components/widgets/TipsCard'

describe('TipsCard', () => {
  it('renders TipsCard', () => {
    const wrapper = shallowMount(TipsCard)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('has correct number of tips', () => {
    const wrapper = mount(TipsCard)

    wrapper.vm.tips = [1, 2]

    expect(wrapper.vm.count).toEqual(2)
  })

  it('has correct body text', () => {
    const wrapper = mount(TipsCard)

    wrapper.vm.tips = [
      {
        body: 'lorem ipsum'
      }
    ]

    expect(wrapper.vm.body).toEqual('lorem ipsum')
  })

  it('can move tipIndex using methods', () => {
    const wrapper = mount(TipsCard)

    wrapper.vm.tips = [1, 2]

    expect(wrapper.vm.tipIndex).toEqual(0)

    wrapper.vm.next()
    expect(wrapper.vm.tipIndex).toEqual(1)

    wrapper.vm.next()
    expect(wrapper.vm.tipIndex).toEqual(1)

    wrapper.vm.previous()
    expect(wrapper.vm.tipIndex).toEqual(0)

    wrapper.vm.previous()
    expect(wrapper.vm.tipIndex).toEqual(0)
  })
})
