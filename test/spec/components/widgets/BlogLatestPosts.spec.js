import { mount } from '@vue/test-utils'
import BlogLatestPosts from '@/components/widgets/BlogLatestPosts'

describe('BlogLatestPosts', () => {
  it('renders BlogLatestPosts', () => {
    const wrapper = mount(BlogLatestPosts, {
      mocks: {
        $route: {
          query: {
            author: null,
            tag: null
          }
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('returns blog title', () => {
    let wrapper = mount(BlogLatestPosts, {
      mocks: {
        $route: {
          query: {
            author: 'john',
            tag: null
          }
        }
      }
    })

    expect(wrapper.vm.title).toEqual('TRANSLATE:blog.filters.author: john')

    wrapper = mount(BlogLatestPosts, {
      mocks: {
        $route: {
          query: {
            author: null,
            tag: 'goal'
          }
        }
      }
    })

    expect(wrapper.vm.title).toEqual('TRANSLATE:blog.filters.category: goal')

    wrapper = mount(BlogLatestPosts, {
      mocks: {
        $route: {
          query: {
            author: null,
            tag: null
          }
        }
      }
    })

    expect(wrapper.vm.title).toEqual('TRANSLATE:blog.headings.sections.news')
  })

  it('returns featured post', () => {
    const wrapper = mount(BlogLatestPosts, {
      mocks: {
        $route: {
          query: {
            author: null,
            tag: null
          }
        }
      }
    })

    wrapper.vm.posts = [
      {
        id: 1
      },
      {
        id: 2
      }
    ]

    expect(wrapper.vm.featuredPost).toEqual({ id: 1 })
  })

  it('returns additional posts except featured post', () => {
    const wrapper = mount(BlogLatestPosts, {
      mocks: {
        $route: {
          query: {
            author: null,
            tag: null
          }
        }
      }
    })

    wrapper.vm.posts = [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      }
    ]

    expect(wrapper.vm.additionalPosts).toEqual([{ id: 2 }, { id: 3 }])
  })
})
