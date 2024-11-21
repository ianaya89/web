<template>
  <div class="chart--column">
    <vue-highcharts ref="columnChart" :options="options" />
  </div>
</template>

<script>
import AppChart from '@/components/charts/AppChart'
import { theme } from '@/tailwind.config'

export default AppChart.extend({
  name: 'ColumnChart',

  data: () => ({
    options: {
      chart: {
        type: 'line',
        height: 300,
        backgroundColor: 'transparent',
        spacingRight: 150
      },
      yAxis: {
        opposite: true
      }
    }
  }),

  mounted() {
    this.storeChartReference(this.$refs.columnChart)

    this.updateOptions({
      chart: {
        height: this.height
      }
    })

    this.addCategories()
    this.addSeries()
    this.calculatePlotlines()
  },

  methods: {
    addSeries() {
      this._chart.delegateMethod('showLoading', 'Loading...')

      this._chart.addSeries({
        ...this.series,
        type: 'column',
        lineWidth: 1,
        color: theme.extend.colors['column-chart'],
        pointWidth: 5
      })

      this._chart.addSeries({
        ...this.series,
        type: 'spline',
        color: 'transparent',
        marker: {
          symbol: `url(${require('../../assets/images/charts/marker.svg')})`
        }
      })

      this._chart.hideLoading()
    },

    updateData() {
      this.calculatePlotlines()
    },

    addCategories() {
      this.updateOptions({
        xAxis: {
          categories: this.series.data.map(entry => entry.name)
        }
      })
    }
  }
})
</script>

<style lang="postcss">
.chart--column {
  .chart__title {
    @apply .text-p5 .font-semibold .text-grey;
  }

  .chart__val {
    white-space: nowrap;
    @apply .text-menu .font-semibold;
  }

  .chart__plotline-title {
    @apply .font-sans .text-p2 .font-semibold .text-grey .mr-2;
  }

  .chart__plotline-val {
    white-space: nowrap;
    @apply .font-sans .text-p2 .font-semibold .w-12 .text-right;
  }

  .highcharts-tooltip > span {
    @apply .font-sans .font-medium .py-2 .px-4 .shadow-lg !important;
  }
}
</style>
