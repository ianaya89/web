<template>
  <div class="chart--revenue">
    <vue-highcharts ref="revenueChart" :options="options" />
  </div>
</template>

<script>
import AppChart from '@/components/charts/AppChart'

export default AppChart.extend({
  name: 'RevenueChart',

  props: {
    labelFormatter: {
      type: Function,
      default: vm =>
        function() {
          return `
            <div class="chart__title">${this.point.name}</div>
            <div class="chart__val">
            ${vm.$filters.currency(this.y)}
            </div>
            `
        }
    }
  },

  data: () => ({
    options: {
      chart: {
        type: 'line'
      }
    }
  }),

  mounted() {
    this.storeChartReference(this.$refs.revenueChart)

    this.updateOptions({
      chart: {
        height: this.height
      },
      yAxis: {
        min: 0,
        opposite: true,
        labels: {
          enabled: true
        }
      }
    })

    this.addCategories()
    this.addSeries()
  },

  methods: {
    addSeries() {
      this._chart.delegateMethod('showLoading', 'Loading...')

      this._chart.addSeries({
        ...this.series,
        type: 'area',
        lineWidth: 1,
        color: '#ff553f',
        pointWidth: 5,
        threshold: this.height,
        zIndex: 2,
        fillColor: {
          linearGradient: [0, 0, 0, this.height * 0.8],
          stops: [[0, 'rgba(255,85,63,0.3)'], [1, 'rgba(255,85,63,0)']]
        },
        marker: {
          symbol: `url(${require('../../assets/images/charts/marker.svg')})`
        }
      })

      this._chart.addSeries({
        ...this.series,
        type: 'column',
        color: '#d8d8d8',
        pointWidth: 1,
        borderWidth: 0
      })

      this._chart.hideLoading()
    },

    addCategories() {
      this.updateOptions({
        xAxis: {
          categories: this.series.data.map(entry => entry.name)
        }
      })
    },

    updateData() {
      this.addCategories()
    }
  }
})
</script>

<style lang="postcss">
.chart--revenue {
  .chart__title {
    @apply .text-p5 .font-semibold .text-grey-l2;
  }

  .chart__val {
    white-space: nowrap;
    @apply .text-menu .font-semibold;
  }

  .highcharts-tooltip > span {
    @apply .font-sans .font-medium .py-2 .px-4 .shadow-lg !important;
  }
}
</style>
