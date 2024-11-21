<template>
  <div class="w-full mt-16 mb-32">
    <div class="w-full flex">
      <div class="flex">
        <h5 class="mr-auto">
          {{ $t('app.profile.team.stadium.perMatchVisitors') }}
        </h5>
        <app-tooltip class="font-normal text-left" :position="'right'">
          <template v-slot:activator>
            <span class="lni-question-circle text-grey mt-1 ml-2" />
          </template>
          <p class="w-64 font-sans">
            {{ $t('app.profile.team.stadium.totalVisitorsHomeMatches') }}
          </p>
        </app-tooltip>
      </div>
    </div>
    <div class="w-full">
      <timeseries-chart :height="400" :series="lineChartSeries" :label-formatter="labelFormatter" />
    </div>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import { mapGetters } from 'vuex'
import TimeseriesChart from '@/components/charts/TimeseriesChart'
import AppTooltip from '@/components/AppTooltip'
import { SeasonsQuery, UnitMatchesQuery } from '@/services/graphql'

export default {
  name: 'StadiumVisitors',

  components: {
    TimeseriesChart,
    AppTooltip
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
          id: this.unitId
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
              ${vm.$t('general.visitors')}: ${vm.$filters.number(this.y)}
            </div>
            <hr class="h-px w-full bg-grey-l3 mb-4">
            <div class="w-full flex">
              <div class="w-2/5 flex flex-col items-center text-grey-l1">
                <div style="background-image: url(${vm.$get(
                  this.point,
                  'participants.home.team.logo.url'
                )})" class="w-10 h-10 bg-center bg-contain bg-no-repeat"></div>
                <span class="break-words whitespace-normal max-w-full">${vm.$get(
                  this.point,
                  'participants.home.team.name'
                )}</span>
              </div>
              <div class="w-1/5 flex flex-1 items-center justify-center text-h7 font-bold">
                ${vm.$get(this.point, 'participants.home.score')}
                :
                ${vm.$get(this.point, 'participants.away.score')}
              </div>
              <div class="w-2/5 flex flex-col items-center text-grey-l1">
                <div style="background-image: url(${vm.$get(
                  this.point,
                  'participants.away.team.logo.url'
                )})" class="w-10 h-10 bg-center bg-contain bg-no-repeat"></div>
                <span class="break-words whitespace-normal max-w-full">${vm.$get(
                  this.point,
                  'participants.away.team.name'
                )}</span>
              </div>
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
          this.$get(this.unit, 'entity.matches', []).map(m => {
            return {
              x: new Date(m.occurredAt).getTime(),
              y: m.attendanceCount,
              participants: {
                home: {
                  team: m.homeTeam,
                  score: m.homeTeamScore
                },
                away: {
                  team: m.awayTeam,
                  score: m.awayTeamScore
                }
              }
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
