import { mount, shallowMount } from '@vue/test-utils'
import BlogPost from '@/components/widgets/BlogPost'

describe('BlogPost', () => {
  it('renders BlogPost', () => {
    const wrapper = shallowMount(BlogPost, {
      propsData: {
        post: {
          slug: 'test',
          title_photo: {
            url: 'someURL'
          },
          author: 'John',
          published_at: '2019-07-31 13:00:00',
          read_time: 30,
          tags: [
            {
              name: 'tagName'
            }
          ]
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('resolves correct mockedLines number', () => {
    const wrapper = mount(BlogPost, {
      propsData: {
        size: 'large',
        post: {
          slug: 'test',
          title_photo: {
            url: 'someURL'
          },
          author: 'John',
          published_at: '2019-07-31 13:00:00',
          read_time: 30,
          tags: [
            {
              name: 'tagName'
            }
          ]
        }
      }
    })

    expect(wrapper.vm.mockedLines).toEqual(8)
  })

  it('resolves correct mainTag', () => {
    const wrapper = mount(BlogPost, {
      propsData: {
        size: 'large',
        post: {
          slug: 'test',
          title_photo: {
            url: 'someURL'
          },
          author: 'John',
          published_at: '2019-07-31 13:00:00',
          read_time: 30,
          tags: [
            {
              name: 'tagName'
            },
            {
              name: 'another tag'
            }
          ]
        }
      }
    })

    expect(wrapper.vm.mainTag).toEqual('tagName')
  })
})
