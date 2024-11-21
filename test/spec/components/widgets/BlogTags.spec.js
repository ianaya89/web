import { shallowMount } from '@vue/test-utils'
import BlogTags from '@/components/widgets/BlogTags'

describe('BlogTags', () => {
  it('renders BlogTags', () => {
    const wrapper = shallowMount(BlogTags)

    expect(wrapper.element).toMatchSnapshot()
  })
})
