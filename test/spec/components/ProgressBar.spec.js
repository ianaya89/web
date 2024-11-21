import { shallowMount } from '@vue/test-utils'
import ProgressBar from '@/components/ProgressBar'

describe('ProgressBar', () => {
  it('renders default progressbar', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders 30 progressbar', () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: {
        value: '30',
        height: 10
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders 30 progressbar with label', () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: {
        value: '30',
        height: 10,
        label: true
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders inactive progressbar', () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: {
        value: '30',
        active: false
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
