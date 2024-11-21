import { mount, shallowMount } from '@vue/test-utils'
import AccordionItem from '@/components/AccordionItem'

describe('AccordionItem', () => {
  it('renders default accordion item', () => {
    const wrapper = shallowMount(AccordionItem)
    expect(wrapper.element).toMatchSnapshot()
    wrapper.vm.show()
    expect(wrapper.element).toMatchSnapshot()
    wrapper.vm.hide()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders slots accordion item', () => {
    const wrapper = shallowMount(AccordionItem, {
      slots: {
        header: 'First header',
        default: 'Profile fans link'
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('check activation accordion item with custom icons', () => {
    const wrapper = mount(AccordionItem, {
      propsData: {
        showIcon: 'lni-plus',
        hideIcon: 'lni-close'
      }
    })
    const opener = wrapper.find('.opener')

    opener.trigger('click')
    expect(wrapper.element).toMatchSnapshot()
    opener.trigger('click')
    expect(wrapper.element).toMatchSnapshot()
  })
})
