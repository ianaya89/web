<template>
  <div>
    <h4>{{ $t('app.brand.profile.audience.page_views.chart.title') }}</h4>
    <div class="w-full mt-4">
      <line-chart :label-formatter="pageViewsLabelFormatter" :height="400" :series="pageViewsChartSeries" />
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart'
import { pageViewsLabelFormatter } from '@/services/chartFormatters'
import { BrandQuery } from '@/services/graphql'

export default {
  name: 'MonthlyPageViews',

  components: {
    LineChart
  },

  apollo: {
    brand: BrandQuery
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    brand: BrandQuery.mock,
    pageViewsLabelFormatter: pageViewsLabelFormatter
  }),

  computed: {
    pageViewsChartSeries() {
      return {
        name: this.$t('app.brand.profile.audience.page_views.chart.title'),
        data: this.$get(this.brand, 'monthlyPageViews', []).map(item => {
          return {
            name: this.$filters.date(item.date, 'MMM'),
            date: item.date,
            unique: item.unique,
            y: item.total
          }
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
