<template>
  <div class="chart--league-position">
    <vue-highcharts ref="leaguePositionChart" :options="options" />
  </div>
</template>

<script>
import numeral from 'numeral'
import AppChart from '@/components/charts/AppChart'
import { parseLeagueChartPosition } from '@/services/helpers'

export default AppChart.extend({
  name: 'LeaguePositionChart',

  props: {
    labelFormatter: {
      type: Function,
      default: vm =>
        function() {
          return `
            <div class="chart__title">${this.point.name}</div>
            <div class="chart__val">
            ${numeral(vm.extractPosition(this.y)).format('0o')}
            </div>
            `
        }
    }
  },

  data: () => ({
    options: {
      chart: {
        type: 'line'
      },
      yAxis: {
        opposite: true
      }
    }
  }),

  computed: {
    seasons() {
      return this.series.data.map(entry => {
        return entry.name.match(/:(.*)/)[1] || entry.name
      })
    },

    plotlineValues() {
      return [
        ...new Set(
          this.dataset
            .map(position => {
              return parseInt(position)
            })
            .sort((a, b) => a - b)
        )
      ].slice(1)
    }
  },

  mounted() {
    this.storeChartReference(this.$refs.leaguePositionChart)

    this.updateOptions({
      chart: {
        height: this.height
      },
      xAxis: {},
      yAxis: {
        max: this.max,
        min: this.min,
        reversed: true
      }
    })

    this.addCategories()
    this.calculatePlotlines()
    this.addSeries()
  },

  methods: {
    addSeries() {
      this._chart.delegateMethod('showLoading', 'Loading...')

      if (this.series.data.length) {
        this._chart.addSeries({
          ...this.series,
          type: 'area',
          lineWidth: 1,
          color: '#ff553f',
          pointWidth: 5,
          threshold: this.max,
          zIndex: 2,
          fillColor: {
            linearGradient: [0, 0, 0, this.max * 200],
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
      }

      this._chart.hideLoading()
    },

    updateData() {
      this.updateOptions({
        yAxis: {
          min: this.min - 1
        }
      })

      this.addCategories()
      this.calculatePlotlines()
    },

    calculatePlotlines() {
      const plotlineOptions = {
        yAxis: {
          plotLines: this.plotlineValues.map(plotline => {
            return this._newPlotline('', plotline, {
              dashStyle: 'LongDash',
              width: 4,
              label: {
                text: ''
              }
            })
          })
        }
      }
      this.updateOptions(plotlineOptions)
    },

    addCategories() {
      this.updateOptions({
        xAxis: {
          categories: this.seasons
        }
      })
    },

    extractPosition(number) {
      const stringNumber = String(number)

      try {
        return parseLeagueChartPosition(
          stringNumber.split('.').length === 1 ? 0 : stringNumber.split('.')[1]
        )
      } catch (err) {
        return number
      }
    }
  }
})
</script>

<style lang="postcss">
.chart--league-position {
  .chart__title {
    @apply .text-p5 .font-bold .text-grey-l2;
  }

  .chart__val {
    white-space: nowrap;
    @apply .text-menu .font-bold;
  }

  .highcharts-tooltip > span {
    @apply .font-sans .font-medium .py-2 .px-4 .shadow-lg !important;
  }
}
</style>
