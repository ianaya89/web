<template>
  <div class="w-full mt-16">
    <div class="w-full flex">
      <div class="flex">
        <h5 class="mr-auto">
          {{ $t('app.profile.league.stadium.averageMatchdayAttendance') }}
        </h5>
      </div>
    </div>
    <div class="w-full">
      <timeseries-chart :height="400" :series="lineChartSeries" :label-formatter="labelFormatter" />
    </div>
  </div>
</template>

<script>
import { groupBy, sortBy } from 'lodash'
import { mapGetters } from 'vuex'
import TimeseriesChart from '@/components/charts/TimeseriesChart'
import { SeasonsQuery, UnitMatchesQuery } from '@/services/graphql'

export default {
  name: 'LeagueStadiumVisitors',

  components: {
    TimeseriesChart
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    seasons: SeasonsQuery,
    unit: {
      ...UnitMatchesQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name
        }
      }
    }
  },

  data: () => ({
    seasons: [],
    unit: {},
    labelFormatter: vm =>
      function() {
        return `
            <div class="chart__title">${vm.$filters.date(this.x)}</div>
            <div class="chart__val mb-2">
              ${vm.$t(
                'app.profile.league.stadium.average_visitors'
              )}: ${vm.$filters.number(this.y)}
            </div>
            `
      }
  }),

  computed: {
    ...mapGetters({
      activeSeason: 'active/getLastSeason'
    }),

    lineChartSeries() {
      return {
        name: 'Visitors',
        data: sortBy(
          Object.values(
            groupBy(this.$get(this.unit, 'entity.matches', []), 'occurredAt')
          )
            .map(matchDay => {
              return {
                occurredAt: matchDay[0].occurredAt,
                attendanceCount: matchDay.reduce(
                  (sum, item) => sum + item.attendanceCount,
                  0
                )
              }
            })
            .map(m => {
              return {
                x: new Date(m.occurredAt).getTime(),
                y: m.attendanceCount
              }
            }),
          'x'
        )
      }
    }
  }
}
</script>

<style scoped>
</style>
