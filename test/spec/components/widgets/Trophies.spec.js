import { shallowMount } from '@vue/test-utils'
import Trophies from '@/components/widgets/Trophies'

describe('Trophies', () => {
  it('renders Trophies', () => {
    const wrapper = shallowMount(Trophies, {
      propsData: {
        items: [
          {
            name: 'test',
            season: {
              name: 'season name'
            }
          },
          {
            name: 'test',
            season: {
              name: 'season name'
            }
          },
          {
            name: 'test 2',
            season: {
              name: 'season name'
            }
          }
        ]
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
