import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import StadiumVisitors from '@/components/widgets/profile-stadium/StadiumVisitors'

describe('StadiumVisitors', () => {
  it('renders stadium visitors', () => {
    const wrapper = shallowMount(StadiumVisitors, {
      mocks: {
        $store: {
          getters: {
            'active/getSeason': {
              id: 1,
              name: '2019/20'
            }
          }
        }
      },
      propsData: {
        unitId: 1
      }
    })

    wrapper.vm.labelFormatter = jest.fn()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('returns line chart series', () => {
    const wrapper = shallowMount(StadiumVisitors, {
      mocks: {
        $store: {
          getters: {
            'active/getSeason': {
              id: 1,
              name: '2019/20'
            }
          }
        }
      },
      propsData: {
        unitId: 1
      }
    })

    wrapper.setData({
      labelformatter: jest.fn(),
      unit: {
        entity: {
          matches: [
            {
              occurredAt: '2019-03-22',
              attendanceCount: 2
            },
            {
              occurredAt: '2019-04-22',
              attendanceCount: 1
            }
          ]
        }
      }
    })

    Vue.nextTick(() => {
      expect(wrapper.vm.lineChartSeries.name).toEqual('Visitors')
      expect(wrapper.vm.lineChartSeries.data.length).toEqual(2)
      expect(wrapper.vm.lineChartSeries.data[0].y).toEqual(2)
      expect(wrapper.vm.lineChartSeries.data[1].y).toEqual(1)
    })
  })
})
