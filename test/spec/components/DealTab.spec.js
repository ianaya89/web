import { shallowMount } from '@vue/test-utils'
import DealTab from '@/components/deals/DealTab'
import { mockObjects } from '@/services/graphql/_mocks'

describe('DealTab', () => {
  it('renders default animated image', () => {
    const history = mockObjects(4, j => {
      let total = 0
      const items = mockObjects(5, l => {
        const price = 1000
        total += price
        return {
          id: l,
          name: 'Some name',
          price: price,
          amount: 4,
          dimensions: '200 x 40 cm',
          duration: 24,
          photo1: 'some_image_url',
          photo2: 'some_image_url',
          description: 'some description'
        }
      })

      return {
        created_at: '20-12-2012 12:12:12',
        items: items,
        total: total
      }
    })

    const status = 'accepted'
    const props = {
      deal: {
        id: 10,
        created_at: '20-12-2012 12:12:12',
        history: history,
        declined_at: status === 'declined' ? '20-12-2012 12:12:12' : null,
        accepted_at: status === 'accepted' ? '20-12-2012 12:12:12' : null,
        status: status,
        brand: {
          id: 12,
          name: 'some title',
          logo: 'some_image_url',
          representative: {
            name: 'Some name',
            avatar: 'some_image_url'
          }
        }
      },
      active: false
    }

    const wrapper = shallowMount(DealTab, {
      propsData: props
    })
    expect(wrapper.element).toMatchSnapshot()

    wrapper.setProps({
      active: true
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
