<template>
  <div class="w-full bg-white shadow-xl p-4">
    <div class="w-full flex">
      <div class="mr-auto">
        <label-chart :label="selectedViews" :info="$t('app.team.dashboard.profile_views')" />
      </div>

      <div class="ml-auto my-auto">
        <growth class="text-h3 font-medium" :icon-class="'text-h4'" :value="selectedGrowth" />
      </div>
    </div>

    <div class="w-full">
      <timeseries-chart
        :series="viewsSeries"
        :height="200"
        :series-type="'areaspline'"
        :mouse-over-handler="growthMouseOver"
        :plot-lines="false"
        :series-color="'#21CE99'"
        :tooltip="false"
        :green-marker="true"
        :fill-color="[[0, 'rgba(33, 206, 153,0.3)'], [1, 'rgba(33, 206, 153,0)']]"
      />
    </div>
  </div>
</template>

<script>
import LabelChart from '@/components/LabelChart'
import Growth from '@/components/Growth'
import TimeseriesChart from '@/components/charts/TimeseriesChart'
import { UnitProfileViewsQuery } from '@/services/graphql'
import { calculateGrowth } from '@/services/helpers'

export default {
  name: 'ProfileViews',

  components: {
    Growth,
    LabelChart,
    TimeseriesChart
  },

  props: {
    unitId: {
      type: String,
      default: null
    }
  },

  apollo: {
    unit: {
      ...UnitProfileViewsQuery,
      variables() {
        return {
          id: this.unitId,
          page: 'PROFILE'
        }
      }
    }
  },

  data: () => ({
    selectedGrowthIndex: null,
    unit: UnitProfileViewsQuery.mock
  }),

  computed: {
    viewsSeries() {
      return {
        name: '',
        data: this.$get(this.unit, 'entity.pageVisits', []).map(item => ({
          x: new Date(item.date),
          y: item.count
        }))
      }
    },

    selectedViews() {
      if (this.viewsSeries.data.length > 0) {
        if (this.selectedGrowthIndex === null) {
          return this.viewsSeries.data[this.viewsSeries.data.length - 1].y
        } else {
          return this.viewsSeries.data[this.selectedGrowthIndex].y
        }
      } else {
        return 0
      }
    },

    selectedGrowth() {
      if (this.viewsSeries.data.length > 0) {
        if (this.selectedGrowthIndex === null) {
          const lastIndex = this.viewsSeries.data.length - 1
          if (lastIndex === 0) {
            return 0
          }
          return calculateGrowth(
            this.viewsSeries.data[lastIndex - 1].y,
            this.viewsSeries.data[lastIndex].y
          )
        } else {
          if (this.selectedGrowthIndex === 0) {
            return 0
          }
          return calculateGrowth(
            this.viewsSeries.data[this.selectedGrowthIndex - 1].y,
            this.viewsSeries.data[this.selectedGrowthIndex].y
          )
        }
      } else {
        return 0
      }
    }
  },

  methods: {
    growthMouseOver(data) {
      this.selectedGrowthIndex = data.target.index
    }
  }
}
</script>

<style scoped>
</style>
