import { shallowMount } from '@vue/test-utils'
import BlogTagLink from '@/components/BlogTagLink'

describe('BlogTagLink', () => {
  it('renders a default blog tag link', () => {
    const wrapper = shallowMount(BlogTagLink, {
      propsData: {
        tag: {
          name: 'foo',
          occurrences: 123
        }
      },
      mocks: {
        $route: {
          query: {}
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders an active blog tag link', () => {
    const wrapper = shallowMount(BlogTagLink, {
      propsData: {
        tag: {
          name: 'foo',
          occurrences: 123
        }
      },
      mocks: {
        $route: {
          query: {
            tag: 'foo'
          }
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
