<template>
  <div class="chart--stadium-visitors">
    <vue-highcharts ref="stadiumVisitorsChart" :options="options" />
  </div>
</template>

<script>
import AppChart from '@/components/charts/AppChart'

export default AppChart.extend({
  name: 'StadiumVisitorsChart',

  props: {
    labelFormatter: {
      type: Function,
      default: vm =>
        function() {
          return `
            <div class="chart__title">${vm.$filters.date(this.x)}</div>
            <div class="chart__val mb-2">
              Visitors: ${vm.$filters.number(this.y)}
            </div>
            <hr class="h-px w-full bg-grey-l3 mb-4">
            <div class="flex w-full">
              <div class="flex flex-col items-center text-grey-l1">
                <img class="block w-8 h-8 rounded-full" src="${
                  this.point.match.teams[0].logo
                }" />
                <span>${this.point.match.teams[0].name}</span>
              </div>
              <div class="flex flex-1 items-center justify-center text-h7 font-bold">
                ${this.point.match.teams[0].goalsCount}
                :
                ${this.point.match.teams[1].goalsCount}
              </div>
              <div class="flex flex-col items-center text-grey-l1">
                <img class="block w-8 h-8 rounded-full" src="${
                  this.point.match.teams[1].logo
                }" />
                <span>${this.point.match.teams[1].name}</span>
              </div>
            </div>
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
    this.storeChartReference(this.$refs.stadiumVisitorsChart)

    this.updateOptions({
      chart: {
        height: this.height
      },
      xAxis: {
        type: 'datetime'
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
    }
  }
})
</script>

<style lang="postcss">
.chart--stadium-visitors {
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
    @apply .font-sans .font-medium .py-2 .px-4 .min-w-48 .shadow-lg !important;
  }
}
</style>
