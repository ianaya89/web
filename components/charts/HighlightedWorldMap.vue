<template>
  <div class="map-column">
    <div ref="highlightedWorldMap" />
  </div>
</template>

<script>
import { merge } from 'lodash'
import WorldMap from '@/components/charts/WorldMap'
import { theme } from '@/tailwind.config'

export default WorldMap.extend({
  name: 'HighlightedWorldMap',

  props: {
    labelFormatter: {
      type: Function,
      default: vm =>
        function() {
          return `
            <div class="chart__title">${this.point.name}</div>
            <div class="chart__val">${vm.$filters.percentage(
              this.point.value
            )}</div>
            `
        }
    },
    series: {
      type: Object,
      default: () => ({
        data: []
      })
    },
    specificOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    options: {}
  }),

  watch: {
    specificOptions(newVal) {
      this.updateOptions(newVal)
      this.initializeMap()
    },

    series: {
      handler(val) {
        // still not working
        if (this._highMap) {
          this.addSeries(val)

          const series = merge(
            {},
            {
              name: 'Countries',
              joinBy: ['name', 'name'],
              zIndex: 1
            },
            val
          )

          if (this._highMap.series.length > 1) {
            this._highMap.series[1].setData(series.data)
          } else {
            this._highMap.addSeries(series)
          }
        }
      },
      deep: true
    }
  },

  mounted() {
    this.storeMapReference(this.$refs.highlightedWorldMap)

    this.addSeries(this.series)

    this.initializeMap()
  },

  methods: {
    addSeries(seriesData) {
      const series = merge(
        {},
        {
          name: 'Countries',
          joinBy: ['name', 'name'],
          zIndex: 1
        },
        seriesData
      )

      this.updateOptions({
        chart: {
          height: '50%'
        },
        tooltip: {
          formatter: this.labelFormatter(this),
          enabled: this.tooltip
        },
        plotOptions: {
          series: {
            point: {
              events: {
                click: e =>
                  this.$emit('country-clicked', this.$get(e, 'point', false))
              }
            }
          }
        },
        colorAxis: {
          min: 0,
          max: 1,
          stops: [
            [0, theme.extend.colors['pie-chart'][6]],
            [0.1, theme.extend.colors['pie-chart'][5]],
            [0.3, theme.extend.colors['pie-chart'][4]],
            [0.55, theme.extend.colors['pie-chart'][3]],
            [0.6, theme.extend.colors['pie-chart'][2]],
            [0.8, theme.extend.colors['pie-chart'][1]],
            [1, theme.extend.colors['pie-chart'][0]]
          ]
        },
        series: [series]
      })

      this.updateOptions(this.specificOptions)
    }
  }
})
</script>

<style scoped>
</style>
