<template>
  <div class="chart--opposite">
    <div class="left-label">
      <span class="fa-2x" :class="[series.series[2].icon, series.series[2].iconColor]" />
      <div class="relative float-right ml-4">
        <span class="top-0">{{ series.series[2].name }}</span>
      </div>
    </div>
    <div class="right-label">
      <div class="relative float-left mr-4">
        <span class="top-0">{{ series.series[1].name }}</span>
      </div>
      <span class="fa-2x" :class="[series.series[1].icon, series.series[1].iconColor]" />
    </div>
    <vue-highcharts ref="oppositeChart" :options="options" />
    <div class="left-value">
      {{ males | percentage }}
    </div>
    <div class="right-value">
      {{ females | percentage }}
    </div>
  </div>
</template>

<script>
import AppChart from '@/components/charts/AppChart'

export default AppChart.extend({
  name: 'OppositeChart',

  data: () => ({
    options: {
      chart: {
        type: 'bar',
        backgroundColor: 'transparent',
        margin: [0, 0, 0, 0],
        spacingRight: 0,
        spacingLeft: 0
      },
      yAxis: {
        min: 0,
        max: 1,
        gridLineWidth: 0,
        lineWidth: 0,
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          pointWidth: 5,
          stacking: 'normal'
        },
        bar: {
          dataLabels: {
            enabled: false
          }
        }
      }
    }
  }),

  mounted() {
    this.storeChartReference(this.$refs.oppositeChart)

    this.updateOptions({
      chart: {
        height: this.height
      }
    })

    this.addCategories()
    this.addSeries()
  },

  computed: {
    males() {
      return this.series.series[2].data[0]
    },

    females() {
      return this.series.series[1].data[0]
    }
  },

  methods: {
    loadSeries: function() {
      this.series.series.forEach(series => {
        this._chart.addSeries(series)
      })
    },

    addSeries() {
      this._chart.delegateMethod('showLoading', 'Loading...')

      this.loadSeries()

      this._chart.hideLoading()
    },

    updateData() {
      this._chart.chart.series.forEach(series => series.remove())
      this.loadSeries()
    },

    addCategories() {
      this.updateOptions({
        xAxis: {
          lineWidth: 0,
          tickWidth: 0,
          labels: {
            enabled: false
          },
          categories: this.series.series.map(entry => entry.name)
        }
      })
    }
  }
})
</script>

<style lang="postcss" scoped>
.chart--opposite {
  @apply .relative;

  .left-label {
    @apply .absolute .left-0 .top-0 .uppercase .text-grey;

    div span {
      @apply .text-p2;
    }
  }

  .right-label {
    @apply .absolute .right-0 .top-0 .uppercase .text-grey;

    div span {
      @apply .text-p2;
    }
  }

  .left-value {
    @apply .absolute .left-0 .bottom-0 .font-medium .text-p1;
  }

  .right-value {
    @apply .absolute .right-0 .bottom-0 .font-medium .text-p1;
  }
}
</style>
