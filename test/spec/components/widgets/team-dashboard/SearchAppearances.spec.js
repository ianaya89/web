import { shallowMount } from '@vue/test-utils'
import SearchAppearances from '@/components/widgets/team-dashboard/SearchAppearances'

describe('SearchAppearances', () => {
  it('renders SearchAppearances', () => {
    const wrapper = shallowMount(SearchAppearances, {
      propsData: {
        unitId: 1
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('returns view series', () => {
    const wrapper = shallowMount(SearchAppearances, {
      propsData: {
        unitId: 1
      }
    })

    wrapper.vm.unit = {
      entity: {
        searchAppearances: [
          {
            date: '2019-08-05',
            count: 3
          }
        ]
      }
    }

    expect(wrapper.vm.searchAppearancesSeries).toEqual({
      name: '',
      data: [
        {
          x: new Date('2019-08-05'),
          y: 3
        }
      ]
    })
  })

  it('returns selected views', () => {
    const wrapper = shallowMount(SearchAppearances, {
      propsData: {
        unitId: 1
      }
    })

    wrapper.vm.unit = {
      entity: {
        searchAppearances: []
      }
    }

    expect(wrapper.vm.selectedSearchAppearances).toEqual(0)

    wrapper.vm.unit = {
      entity: {
        searchAppearances: [
          {
            date: '2019-08-04',
            count: 8
          },
          {
            date: '2019-08-05',
            count: 3
          }
        ]
      }
    }

    expect(wrapper.vm.selectedSearchAppearances).toEqual(3)

    wrapper.vm.selectedGrowthIndex = 0

    expect(wrapper.vm.selectedSearchAppearances).toEqual(8)
  })

  it('it select growth index from mouseover data object', () => {
    const wrapper = shallowMount(SearchAppearances, {
      propsData: {
        unitId: 1
      }
    })

    expect(wrapper.vm.selectedGrowthIndex).toEqual(null)

    wrapper.vm.growthMouseOver({
      target: {
        index: 3
      }
    })

    expect(wrapper.vm.selectedGrowthIndex).toEqual(3)
  })
})
