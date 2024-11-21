<template>
  <div class="chart--pie">
    <vue-highcharts ref="pieChart" :options="options" />
  </div>
</template>

<script>
import AppChart from '@/components/charts/AppChart'
import { theme } from '@/tailwind.config'

export default AppChart.extend({
  name: 'PieChart',

  props: {
    pieColors: {
      type: Array,
      default: () => [
        theme.extend.colors['pie-chart'][0],
        theme.extend.colors['pie-chart'][1],
        theme.extend.colors['pie-chart'][2],
        theme.extend.colors['pie-chart'][3],
        theme.extend.colors['pie-chart'][4],
        theme.extend.colors['pie-chart'][5],
        theme.extend.colors['pie-chart'][6]
      ]
    },
    specificOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    options: {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      plotOptions: {
        pie: {
          allowPointSelect: false,
          innerSize: '92%',
          size: '180',
          dataLabels: { enabled: false }
        },
        series: {
          enableMouseTracking: true
        }
      }
    }
  }),

  watch: {
    specificOptions(newVal) {
      this.updateOptions(newVal)
    }
  },

  mounted() {
    this.storeChartReference(this.$refs.pieChart)

    this.updateOptions(this.specificOptions)

    this.updateOptions({
      chart: {
        height: this.height * 1.2,
        width: this.height * 1.2
      },
      plotOptions: {
        pie: {
          size: this.height,
          innerSize: this.height > 100 ? '92%' : '60%',
          colors: this.pieColors
        }
      }
    })

    this.addSeries()
  },

  methods: {
    addSeries() {
      this._chart.delegateMethod('showLoading', 'Loading...')

      this._chart.addSeries(this.series)

      this._chart.hideLoading()
    }
  }
})
</script>

<style lang="postcss">
.chart--pie {
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
