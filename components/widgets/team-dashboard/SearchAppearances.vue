<template>
  <div class="w-full bg-white shadow-xl p-4">
    <div class="w-full flex">
      <div class="mr-auto">
        <label-chart :label="selectedSearchAppearances" :info="$t('app.team.dashboard.search_appearances')" />
      </div>

      <div class="ml-auto my-auto">
        <growth class="text-h3 font-medium" :icon-class="'text-h4'" :value="selectedGrowth" />
      </div>
    </div>

    <div class="w-full">
      <timeseries-chart
        :series="searchAppearancesSeries"
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
import Growth from '@/components/Growth'
import LabelChart from '@/components/LabelChart'
import TimeseriesChart from '@/components/charts/TimeseriesChart'
import { calculateGrowth } from '@/services/helpers'
import { TeamSearchAppearancesQuery } from '@/services/graphql'

export default {
  name: 'SearchAppearances',

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
      ...TeamSearchAppearancesQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  data: () => ({
    selectedGrowthIndex: null,
    unit: TeamSearchAppearancesQuery.mock
  }),

  computed: {
    searchAppearancesSeries() {
      return {
        name: '',
        data: this.$get(this.unit, 'entity.searchAppearances', []).map(
          item => ({
            x: new Date(item.date),
            y: item.count
          })
        )
      }
    },

    selectedSearchAppearances() {
      if (this.searchAppearancesSeries.data.length > 0) {
        if (this.selectedGrowthIndex === null) {
          // eslint-disable-next-line standard/computed-property-even-spacing
          return this.searchAppearancesSeries.data[
            this.searchAppearancesSeries.data.length - 1
          ].y
        } else {
          return this.searchAppearancesSeries.data[this.selectedGrowthIndex].y
        }
      } else {
        return 0
      }
    },

    selectedGrowth() {
      if (this.searchAppearancesSeries.data.length > 0) {
        if (this.selectedGrowthIndex === null) {
          const lastIndex = this.searchAppearancesSeries.data.length - 1
          if (lastIndex === 0) {
            return 0
          }
          return calculateGrowth(
            this.searchAppearancesSeries.data[lastIndex - 1].y,
            this.searchAppearancesSeries.data[lastIndex].y
          )
        } else {
          if (this.selectedGrowthIndex === 0) {
            return 0
          }
          return calculateGrowth(
            this.searchAppearancesSeries.data[this.selectedGrowthIndex - 1].y,
            this.searchAppearancesSeries.data[this.selectedGrowthIndex].y
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
