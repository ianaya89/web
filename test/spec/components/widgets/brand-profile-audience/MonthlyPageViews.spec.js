import { shallowMount } from '@vue/test-utils'
import MonthlyPageViews from '@/components/widgets/brand-profile-audience/MonthlyPageViews'

describe('MonthlyPageViews', () => {
  it('renders MonthlyPageViews', () => {
    const wrapper = shallowMount(MonthlyPageViews, {
      propsData: {
        unitId: 1
      }
    })

    wrapper.setData({
      pageViewsLabelFormatter: jest.fn()
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  it('returns page vews chart series', () => {
    const wrapper = shallowMount(MonthlyPageViews, {
      propsData: {
        unitId: 1
      },

      mocks: {
        $filters: {
          date: (date, format) => date + format
        }
      }
    })

    wrapper.setData({
      brand: {
        monthlyPageViews: [
          {
            date: '2019-08-08',
            unique: 4,
            total: 8
          }
        ]
      }
    })

    expect(wrapper.vm.pageViewsChartSeries.name).toEqual(
      'TRANSLATE:app.brand.profile.audience.page_views.chart.title'
    )
    expect(wrapper.vm.pageViewsChartSeries.data.length).toEqual(1)
    expect(wrapper.vm.pageViewsChartSeries.data[0].name).toEqual(
      '2019-08-08MMM'
    )
    expect(wrapper.vm.pageViewsChartSeries.data[0].date).toEqual('2019-08-08')
    expect(wrapper.vm.pageViewsChartSeries.data[0].unique).toEqual(4)
    expect(wrapper.vm.pageViewsChartSeries.data[0].y).toEqual(8)
  })
})
