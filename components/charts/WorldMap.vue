<template>
  <div class="map-column">
    <!-- should be implemented in the derived components -->
  </div>
</template>

<script>
import { merge } from 'lodash'
import Vue from 'vue'
import Highcharts from 'highcharts'
import HighchartsMap from 'highcharts/modules/map'
import geojson from '@highcharts/map-collection/custom/world.geo.json'

export default Vue.extend({
  name: 'WorldMap',

  props: {
    height: {
      type: String,
      default: '50%'
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    mapJson: {
      type: Object,
      default: () => geojson
    },
    labelFormatter: {
      type: Function,
      default: vm =>
        function() {
          return `
            <div class="chart__val">${this.point.contact.city}</div>
            `
        }
    },
    series: {
      type: Object,
      default: () => ({
        data: []
      })
    }
  },

  data: () => ({
    _chart: null,
    options: {},
    _highMap: null,
    defaultOptions: {
      chart: {
        type: 'map',
        spacing: [0, 0, 0, 0],
        backgroundColor: '#fafbfc',
        style: { fontFamily: 'Akrobat' },
        height: '50%'
      },
      mapNavigation: {
        enabled: false,
        enableMouseWheelZoom: false,
        buttonOptions: {
          style: {
            fontSize: '32px',
            color: '#000000',
            'line-height': '1',
            fontWeight: 400,
            'font-family': 'Akrobat'
          },
          theme: {
            fill: 'transparent',
            'stroke-width': 0,
            r: 0,
            states: {
              hover: {
                fill: 'transparent'
              },
              selected: {
                fill: 'transparent'
              }
            }
          },
          verticalAlign: 'top'
        }
      },
      yAxis: {
        minRange: 100
      },
      xAxis: {
        minRange: 100
      },
      title: {
        text: ''
      },
      tooltip: {
        borderColor: '#f5f5f5',
        borderRadius: 0,
        borderWidth: 1,
        shadow: false,
        backgroundColor: 'rgba(255,255,255,1)',
        useHTML: true,
        padding: 0
      },
      plotOptions: {
        series: {
          color: '#ff553f',
          brightness: 1,
          states: {
            inactive: {
              opacity: 1
            }
          },
          marker: {
            radius: 6,
            symbol: 'circle',
            lineColor: '#ffffff',
            fillColor: '#ff553f',
            lineWidth: 3,
            states: {
              select: {
                radius: 9,
                symbol: 'circle',
                lineColor: '#ffffff',
                fillColor: '#ff553f',
                lineWidth: 4
              },
              hover: {
                radius: 6,
                symbol: 'circle',
                lineColor: '#ffffff',
                fillColor: '#ff553f',
                lineWidth: 3
              }
            }
          }
        }
      },
      legend: {
        enabled: false
      }
    }
  }),

  mounted() {
    this.initializeOptions({
      chart: {
        height: this.height
      },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        useHTML: true,
        formatter: this.labelFormatter(this),
        enabled: this.tooltip,
        style: {
          pointerEvents: 'auto',
          zIndex: 100
        }
      }
    })
  },

  methods: {
    storeMapReference(el) {
      this._chart = el
    },

    initializeMap() {
      HighchartsMap(Highcharts)

      this.updateOptions({
        chart: {
          map: this.mapJson
        }
      })

      this._highMap = Highcharts.mapChart(this._chart, this.options)
    },

    initializeOptions(overrides) {
      this.options = merge({}, this.defaultOptions, overrides)
    },

    updateOptions(newOptions) {
      this.options = merge({}, this.options, newOptions)
    },

    removeSeries() {
      const seriesLength = this._highMap.series.length
      for (let i = seriesLength - 1; i > -1; i--) {
        this._highMap.series[i].remove()
      }
    },

    zoomInMap() {
      this._highMap.mapZoom(0.5)
    },

    zoomOutMap() {
      this._highMap.mapZoom(2)
    }
  }
})
</script>

<style lang="postcss">
.map-column {
  .chart__val {
    white-space: nowrap;
    @apply .text-menu .font-bold;
  }

  .highcharts-tooltip {
    z-index: 9999 !important;

    > span {
      @apply .font-sans .font-medium .py-2 .px-4 .shadow-lg !important;
    }
  }
}
</style>
