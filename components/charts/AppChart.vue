<template>
  <div class="chart">
    <!-- should be implemented in the derived components -->
  </div>
</template>

<script>
import { merge } from 'lodash'
import Vue from 'vue'

export default Vue.extend({
  name: 'Chart',

  props: {
    height: {
      type: Number,
      default: 200
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    enableMouseTracking: {
      type: Boolean,
      default: true
    },
    series: {
      type: Object,
      default: () => ({
        data: []
      })
    },
    mouseOverHandler: {
      type: Function,
      default: undefined
    },
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
    _chart: null,
    options: {},
    defaultOptions: {
      tooltip: {
        borderColor: '#f5f5f5',
        borderRadius: 0,
        borderWidth: 1,
        shadow: false,
        backgroundColor: 'rgba(255,255,255,1)',
        useHTML: true,
        padding: 0
      },
      title: {
        text: ' '
      },
      credits: {
        enabled: false
      },
      series: [],
      legend: {
        enabled: false
      },
      xAxis: {
        gridLineWidth: 0,
        lineColor: '#d8d8d8',
        minPadding: 0,
        maxPadding: 0.055,
        title: {
          text: ' '
        },
        startOnTick: false,
        endOnTick: false
      },
      yAxis: {
        labels: {
          enabled: false
        },
        gridLineWidth: 0,
        title: {
          text: ' '
        },
        plotLines: []
      }
    }
  }),

  computed: {
    dataset() {
      return this.series.data.map(d => d.y)
    },

    max() {
      return Math.max(...this.dataset)
    },

    avg() {
      return Math.round(
        this.dataset.reduce((c, i) => c + i, 0) / this.dataset.length
      )
    },

    min() {
      return Math.min(...this.dataset)
    }
  },

  watch: {
    series: {
      handler() {
        this._updateData()
      },
      deep: true
    }
  },

  mounted() {
    this.initializeOptions({
      tooltip: {
        formatter: this.labelFormatter(this),
        enabled: this.tooltip
      },
      plotOptions: {
        series: {
          enableMouseTracking: this.enableMouseTracking,
          point: {
            events: {
              mouseOver: this.mouseOverHandler
            }
          }
        }
      }
    })
  },

  methods: {
    updateData() {},

    addSeries() {},

    storeChartReference(el) {
      this._chart = el
    },

    calculatePlotlines() {
      const isTooTight = Math.abs(this.max - this.min) < 0.1 * (this.avg || 1)
      const plotLines = isTooTight
        ? [this._newPlotline('Avg:', this.avg)]
        : [
            this._newPlotline('Max:', this.max),
            this._newPlotline('Avg:', this.avg),
            this._newPlotline('Min:', this.min)
          ]

      const plotlineOptions = {
        yAxis: {
          max: this.max,
          plotLines
        }
      }

      this.updateOptions(plotlineOptions)
    },

    initializeOptions(overrides) {
      this.options = merge({}, this.defaultOptions, overrides)
    },

    updateOptions(newOptions) {
      this.options = merge({}, this.options, newOptions)
    },

    removeSeries() {
      const seriesLength = this._chart.chart.series.length
      for (let i = seriesLength - 1; i > -1; i--) {
        this._chart.chart.series[i].remove()
      }
    },

    _updateData() {
      if (!this._chart) {
        return
      }

      this.removeSeries()
      this.addSeries()
      this.updateData()
    },

    _newPlotline(label, value, overrides = {}) {
      return merge(
        {},
        {
          ...overrides,
          color: '#f5f5f5',
          dashStyle: 'solid',
          value: value,
          label: {
            useHTML: true,
            text: `
              <p class="w-full">
                <span class="chart__plotline-title">
                  ${label}
                </span>
                <span class="chart__plotline-val">
                  ${
                    this.valueFilterFnc
                      ? this.valueFilterFnc(value)
                      : this.$filters.number(value)
                  }
                </span>
              </p>`,
            align: 'right',
            verticalAling: 'middle',
            textAlign: 'left'
          },
          width: 1
        },
        overrides
      )
    }
  }
})
</script>

<style scoped>
</style>
