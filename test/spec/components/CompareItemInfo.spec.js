import { shallowMount } from '@vue/test-utils'
import CompareItemInfo from '@/components/CompareItemInfo'

describe('CompareItemInfo', () => {
  it('renders CompareItemInfo value 3', () => {
    const wrapper = shallowMount(CompareItemInfo, {
      propsData: {
        id: '3',
        title: 'Title',
        info: 'Small info',
        src: 'someAvatarSource'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders CompareItemInfo and remove it', () => {
    const wrapper = shallowMount(CompareItemInfo, {
      propsData: {
        id: '3',
        title: 'Title',
        info: 'Small info',
        src: 'someAvatarSource',
        remover: true
      }
    })

    expect(wrapper.element).toMatchSnapshot()
    const remover = wrapper.find('.compare-item-remover')
    remover.trigger('click')
    expect(wrapper.emitted('compare-item-remove')).toBeTruthy()
  })
})
