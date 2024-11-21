import { shallowMount } from '@vue/test-utils'
import Timeline from '@/components/Timeline'

describe('Timeline', () => {
  it('renders empty timeline', () => {
    const wrapper = shallowMount(Timeline)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders some props', () => {
    const wrapper = shallowMount(Timeline, {
      propsData: {
        items: [
          {
            id: 1,
            title: 'Bar',
            body: 'Some content',
            season: { name: '2018-19' }
          },
          {
            id: 2,
            title: 'Foo',
            body: 'Some content',
            season: { name: '2019-20' }
          }
        ],
        visible: 1
      }
    })

    expect(wrapper.element).toMatchSnapshot()
    wrapper.vm.showAll()
    expect(wrapper.element).toMatchSnapshot()
    wrapper.vm.hideAll()
    expect(wrapper.element).toMatchSnapshot()
  })
})
