import { mount, shallowMount } from '@vue/test-utils'
import Accordion from '@/components/Accordion'
import AccordionItem from '@/components/AccordionItem'

describe('Accordion', () => {
  it('renders empty accordion', () => {
    const wrapper = shallowMount(Accordion)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders no-mutli accordion', () => {
    const firstItem = {
      render(render) {
        return render(AccordionItem, {
          slots: {
            header: 'First header',
            default: 'Profile fans link'
          }
        })
      }
    }
    const secondItem = {
      render(render) {
        return render(AccordionItem, {
          slots: {
            header: 'Second header',
            default: 'Dashboard'
          }
        })
      }
    }

    const wrapper = mount(Accordion, {
      slots: {
        default: [firstItem, secondItem]
      }
    })
    expect(wrapper.element).toMatchSnapshot()

    const openers = wrapper.findAll('.opener')
    openers.at(0).trigger('click')
    expect(wrapper.element).toMatchSnapshot()

    openers.at(1).trigger('click')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders multi accordion', () => {
    const firstItem = {
      render(render) {
        return render(AccordionItem, {
          slots: {
            header: 'First header',
            default: 'Profile fans link'
          }
        })
      }
    }
    const secondItem = {
      render(render) {
        return render(AccordionItem, {
          slots: {
            header: 'Second header',
            default: 'Dashboard'
          }
        })
      }
    }

    const wrapper = mount(Accordion, {
      propsData: {
        multi: true
      },
      slots: {
        default: [firstItem, secondItem]
      }
    })

    expect(wrapper.element).toMatchSnapshot()

    const openers = wrapper.findAll('.opener')
    openers.at(0).trigger('click')
    expect(wrapper.element).toMatchSnapshot()

    openers.at(1).trigger('click')
    expect(wrapper.element).toMatchSnapshot()
  })
})
