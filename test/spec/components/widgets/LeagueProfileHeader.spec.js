import { mount, shallowMount } from '@vue/test-utils'
import LeagueProfileHeader from '@/components/widgets/LeagueProfileHeader'

describe('LeagueProfileHeader', () => {
  it('renders LeagueProfileHeader', () => {
    const wrapper = shallowMount(LeagueProfileHeader, {
      propsData: {
        unitId: 1,
        season: 2
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('returns entity trophies', () => {
    const wrapper = mount(LeagueProfileHeader, {
      propsData: {
        unitId: 1,
        season: 2
      }
    })

    wrapper.vm.unit = {
      entity: {
        trophies: [1, 2, 3]
      }
    }

    expect(wrapper.vm.trophies).toEqual([1, 2, 3])
  })

  it('returns sorted entity milestones by season name', () => {
    const wrapper = mount(LeagueProfileHeader, {
      propsData: {
        unitId: 1,
        season: 2
      }
    })

    wrapper.vm.unit = {
      entity: {
        milestones: [
          {
            season: {
              name: 'a'
            }
          },
          {
            season: {
              name: 'b'
            }
          }
        ]
      }
    }

    expect(wrapper.vm.milestones).toEqual([
      {
        season: {
          name: 'b'
        }
      },
      {
        season: {
          name: 'a'
        }
      }
    ])
  })

  it('closes more info', () => {
    const wrapper = mount(LeagueProfileHeader, {
      propsData: {
        unitId: 1,
        season: 2
      }
    })

    expect(wrapper.vm.$refs.profileHeader.moreInfoHidden).toBeTruthy()

    wrapper.vm.closeMoreInfo()

    expect(wrapper.vm.$refs.profileHeader.moreInfoHidden).toBeFalsy()
  })
})
