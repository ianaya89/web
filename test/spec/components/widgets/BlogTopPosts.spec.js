import { shallowMount } from '@vue/test-utils'
import BlogTopPosts from '@/components/widgets/BlogTopPosts'

describe('BlogTopPosts', () => {
  it('renders BlogTopPosts', () => {
    const wrapper = shallowMount(BlogTopPosts)

    expect(wrapper.element).toMatchSnapshot()
  })
})
