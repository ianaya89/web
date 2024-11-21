import { shallowMount } from '@vue/test-utils'
import ProfileViews from '@/components/widgets/team-dashboard/ProfileViews'

describe('ProfileViews', () => {
  it('renders ProfileViews', () => {
    const wrapper = shallowMount(ProfileViews, {
      propsData: {
        unitId: 1
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('returns view series', () => {
    const wrapper = shallowMount(ProfileViews, {
      propsData: {
        unitId: 1
      }
    })

    wrapper.vm.unit = {
      entity: {
        pageVisits: [
          {
            date: '2019-08-05',
            count: 3
          }
        ]
      }
    }

    expect(wrapper.vm.viewsSeries).toEqual({
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
    const wrapper = shallowMount(ProfileViews, {
      propsData: {
        unitId: 1
      }
    })

    wrapper.vm.unit = {
      entity: {
        pageVisits: []
      }
    }

    expect(wrapper.vm.selectedViews).toEqual(0)

    wrapper.vm.unit = {
      entity: {
        pageVisits: [
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

    expect(wrapper.vm.selectedViews).toEqual(3)

    wrapper.vm.selectedGrowthIndex = 0

    expect(wrapper.vm.selectedViews).toEqual(8)
  })

  it('it select growth index from mouseover data object', () => {
    const wrapper = shallowMount(ProfileViews, {
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
