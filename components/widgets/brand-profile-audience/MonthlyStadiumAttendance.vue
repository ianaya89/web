<template>
  <div>
    <div class="w-full flex">
      <h4>{{ $t('app.brand.profile.audience.stadium_attendance.chart.title') }}</h4>
      <app-select
        v-model="attendancePeriod"
        class="w-1/3 pr-4 ml-auto"
        :solo="true"
        :solo-label="null"
        :label="$t('general.season')"
        :items="seasonItems"
      />
    </div>
    <div class="w-full mt-4">
      <line-chart :label-formatter="attendanceLabelFormatter" :height="400" :series="stadiumAttendanceChartSeries" />
    </div>
  </div>
</template>

<script>
import { concat, groupBy, mapValues, values } from 'lodash'
import moment from 'moment'
import LineChart from '@/components/charts/LineChart'
import { attendanceLabelFormatter } from '@/services/chartFormatters'
import {
  BrandFollowedTeamsQuery,
  BrandQuery,
  SeasonsQuery
} from '@/services/graphql'
import AppSelect from '@/components/AppSelect'

export default {
  name: 'MonthlyStadiumAttendance',

  components: {
    LineChart,
    AppSelect
  },

  apollo: {
    brand: BrandQuery,

    seasons: {
      ...SeasonsQuery,
      result({ data }) {
        this.attendancePeriod =
          moment(data.seasons[0].toDate).format('YYYY') +
          '/' +
          (Number(moment(data.seasons[0].toDate).format('YY')) + 1)
      }
    },

    followedTeams: {
      ...BrandFollowedTeamsQuery,
      update(data) {
        return this.$get(data, 'unit.entity.followedTeams', [])
      },
      variables() {
        return {
          id: this.unitId,
          season: this.attendancePeriod
        }
      },
      skip() {
        return this.seasons.length === 0
      }
    }
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    attendanceLabelFormatter: attendanceLabelFormatter,
    attendancePeriod: null,
    seasons: [],
    followedTeams: []
  }),

  computed: {
    stadiumAttendanceChartSeries() {
      let precalcs = []
      this.followedTeams.map(
        item =>
          (precalcs = precalcs.concat(
            this.$get(item, 'teamStadiums.0.stadium.precalcs', [])
          ))
      )

      return {
        name: this.$t(
          'app.brand.profile.audience.stadium_attendance.chart.title'
        ),
        data: values(
          mapValues(groupBy(precalcs, item => item.date), (item, key) => {
            return {
              date: key,
              name: this.$filters.date(key, 'MMM'),
              matches: item.reduce(
                (total, item1) =>
                  total + this.$get(item1, 'data.visitorsTotal', 0),
                0
              ),
              y: item.reduce(
                (total, item1) =>
                  total + this.$get(item1, 'data.visitorsTotal', 0),
                0
              )
            }
          })
        )
      }
    },

    seasonItems() {
      if (this.seasons.length === 0) {
        return []
      }
      const seasonItems = [
        {
          text: this.$t('general.current_season'),
          value:
            moment(this.seasons[0].toDate).format('YYYY') +
            '/' +
            (Number(moment(this.seasons[0].toDate).format('YY')) + 1)
        }
      ]
      return concat(
        seasonItems,
        this.seasons.map((item, index) => {
          return {
            text: index === 0 ? this.$t('general.last_season') : item.name,
            value: item.name
          }
        })
      )
    }
  }
}
</script>

<style scoped>
</style>
