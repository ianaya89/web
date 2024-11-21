<template>
  <div class="chart--line">
    <vue-highcharts ref="lineChart" :options="options" />
  </div>
</template>

<script>
import AppChart from '@/components/charts/AppChart'

export default AppChart.extend({
  name: 'TimeseriesChart',

  props: {
    seriesType: {
      type: String,
      default: 'area'
    },

    valueFilterFnc: {
      type: Function,
      default: null
    },

    seriesColor: {
      type: String,
      default: '#ff553f'
    },

    greenMarker: {
      type: Boolean,
      default: false
    },

    fillColor: {
      type: Array,
      default: () => [[0, 'rgba(255,85,63,0.3)'], [1, 'rgba(255,85,63,0)']]
    },

    plotLines: {
      type: Boolean,
      default: true
    },

    labelFormatter: {
      type: Function,
      default: vm =>
        function() {
          return `
            <div class="chart__title">${vm.$filters.dateTime(
              this.point.x
            )}</div>
            <div class="chart__val">${
              this.point.filterFnc
                ? this.point.filterFnc(this.y)
                : vm.$filters.number(this.y)
            }</div>
            `
        }
    }
  },

  data: () => ({
    options: {
      chart: {
        type: 'line',
        spacingRight: 200
      },
      xAxis: {
        type: 'datetime'
      }
    }
  }),

  mounted() {
    this.storeChartReference(this.$refs.lineChart)

    this.updateOptions({
      chart: {
        height: this.height,
        spacingRight: this.plotLines ? 200 : 0
      }
    })

    if (this.plotLines) {
      this.calculatePlotlines()
    }
    this.addSeries()
  },

  methods: {
    addSeries() {
      this._chart.delegateMethod('showLoading', 'Loading...')

      this._chart.addSeries({
        ...this.series,
        type: this.seriesType,
        lineWidth: 1,
        color: this.seriesColor,
        pointWidth: 5,
        // threshold: this.height,
        zIndex: 2,
        fillColor: {
          linearGradient: [0, 0, 0, this.height * 0.8],
          stops: this.fillColor
        },
        marker: {
          symbol: !this.greenMarker
            ? `url(${require('../../assets/images/charts/marker.svg')})`
            : `url(${require('../../assets/images/charts/marker-green.svg')})`
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
      this.removeSeries()
      this.addSeries()

      if (this.plotLines) {
        this.calculatePlotlines()
      }
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
    @apply .font-sans .font-medium .py-2 .px-4 .w-56 .shadow-lg !important;
  }

  .highcharts-label {
    @apply .bg-white;
  }
}
</style>
