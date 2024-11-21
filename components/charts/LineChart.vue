<template>
  <div class="chart--line">
    <vue-highcharts ref="lineChart" :options="options" />
  </div>
</template>

<script>
import AppChart from '@/components/charts/AppChart'

export default AppChart.extend({
  name: 'LineChart',

  props: {
    labelFormatter: {
      type: Function,
      default: vm =>
        function() {
          return `
            <div class="chart__title">${this.point.name}</div>
            <div class="chart__val">${vm.$filters.number(this.y)}</div>
            `
        }
    }
  },

  data: () => ({
    options: {
      chart: {
        type: 'line',
        spacingRight: 200
      }
    }
  }),

  mounted() {
    this.storeChartReference(this.$refs.lineChart)

    this.updateOptions({
      chart: {
        height: this.height
      },
      xAxis: {
        categories: this.series.data.map(entry => entry.name)
      },
      yAxis: {
        min: this.min * 0.7
      }
    })

    this.calculatePlotlines()
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

    updateData() {
      this.updateOptions({
        xAxis: {
          categories: this.series.data.map(entry => entry.name)
        },
        yAxis: {
          min: this.min * 0.7
        }
      })

      this.calculatePlotlines()
    }
  }
})
</script>

<style lang="postcss">
.chart--line {
  .chart__title {
    @apply .text-p5 .font-bold .text-grey-l2;
  }

  .chart__val {
    white-space: nowrap;
    @apply .text-menu .font-bold;
  }

  .chart__plotline-title {
    @apply .font-sans .text-p2 .font-bold .text-grey .mr-2;
  }

  .chart__plotline-val {
    white-space: nowrap;
    @apply .font-sans .text-p2 .font-bold .w-24 .text-right;
  }

  .highcharts-tooltip > span {
    @apply .font-sans .font-medium .py-2 .px-4 .w-48 .shadow-lg !important;
  }

  .highcharts-label {
    @apply .bg-white;
  }
}
</style>
