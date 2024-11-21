<template>
  <div>
    <h6 class="mt-10">
      {{ $t('app.profile.team.fans.age.title') }}
    </h6>

    <div class="w-full flex flex-wrap flex-col-reverse sm:flex-row">
      <div class="w-full sm:w-1/2 pr-4">
        <table class="w-full font-medium">
          <tbody>
            <tr v-for="(row, index) in ageSeries.data" :key="index" class="border-b border-grey-l3">
              <td class="py-2 text-grey">
                <span :class="['bg-pie-chart-' + index]" class="h-3 w-3" />
                <span class="ml-2">{{ row.name }}</span>
              </td>
              <td class="text-right">
                {{ row.y | percentage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-full sm:w-1/2 flex justify-center mb-4 sm:mb-0">
        <pie-chart :series="ageSeries" :label-formatter="percentageFormatter" />
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { UnitAgeSplitQuery } from '@/services/graphql'
import PieChart from '@/components/charts/PieChart'

export default {
  components: {
    PieChart
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitAgeSplitQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name
        }
      }
    }
  },

  data: () => ({
    columns: [
      'group17',
      'group18',
      'group25',
      'group35',
      'group45',
      'group55',
      'group65'
    ],
    percentageFormatter: vm =>
      function() {
        return `
            <div class="chart__title">${this.point.name}</div>
            <div class="chart__val">${vm.$filters.percentage(this.y)}</div>
            `
      }
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getLastSeason'
    }),

    ageSeries() {
      return {
        name: 'Age split',
        data: this.columns.map(name => ({
          name: this.$t(`app.profile.team.fans.age.${name}`),
          y: this.$get(this.unit, `entity.precalcs.0.data.ageSplit.${name}`, 0)
        }))
      }
    }
  }
}
</script>
