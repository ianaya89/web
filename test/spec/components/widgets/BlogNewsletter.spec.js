import { mount } from '@vue/test-utils'
import BlogNewsletter from '@/components/widgets/BlogNewsletter'

describe('BlogNewsletter', () => {
  it('renders BlogNewsletter', () => {
    const wrapper = mount(BlogNewsletter)

    expect(wrapper.element).toMatchSnapshot()
  })
})
