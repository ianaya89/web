import { mount, shallowMount } from '@vue/test-utils'
import TeamProfileHeader from '@/components/widgets/TeamProfileHeader'

describe('TeamProfileHeader', () => {
  it('renders TeamProfileHeader', () => {
    const wrapper = shallowMount(TeamProfileHeader, {
      propsData: {
        unitId: 1,
        season: 2
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('returns entity trophies', () => {
    const wrapper = mount(TeamProfileHeader, {
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

  it('returns entity milestones', () => {
    const wrapper = mount(TeamProfileHeader, {
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
          name: 'a'
        }
      },
      {
        season: {
          name: 'b'
        }
      }
    ])
  })

  it('closes more info', () => {
    const wrapper = mount(TeamProfileHeader, {
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
