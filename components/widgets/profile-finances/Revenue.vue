<template>
  <div>
    <h3 class="pb-4">
      {{ $t('app.profile.team.finances.revenue.title') }}
    </h3>

    <div class="w-full flex flex-wrap-reverse md:-mx-4">
      <div class="w-full md:w-1/2 md:px-4">
        <revenue-row class="border-b border-grey-l3">
          <template v-slot:name>
            <span class="my-auto font-medium font-serif">{{ $t('app.profile.team.finances.revenue.domestic') }}</span>
          </template>
          <div class="w-full font-medium text-h6">
            {{ $get(unit, 'entity.precalcs.0.data.finance.domestic') | currency }}
          </div>
        </revenue-row>
        <revenue-row class="border-b border-grey-l3">
          <template v-slot:name>
            <span class="my-auto font-medium font-serif">{{ $t('app.profile.team.finances.revenue.uefa') }}</span>
          </template>
          <div class="w-full font-medium text-h6">
            {{ $get(unit, 'entity.precalcs.0.data.finance.uefa') | currency }}
          </div>
        </revenue-row>
        <revenue-row class="border-b border-grey-l3">
          <template v-slot:name>
            <span class="my-auto font-medium font-serif">{{ $t('app.profile.team.finances.revenue.commercial') }}</span>
          </template>
          <div class="w-full font-medium text-h6">
            {{ $get(unit, 'entity.precalcs.0.data.finance.commercial') | currency }}
          </div>
        </revenue-row>
        <revenue-row class="border-b border-grey-l3">
          <template v-slot:name>
            <span class="my-auto font-medium font-serif">{{ $t('app.profile.team.finances.revenue.gate') }}</span>
          </template>
          <div class="w-full font-medium text-h6">
            {{ $get(unit, 'entity.precalcs.0.data.finance.gate') | currency }}
          </div>
        </revenue-row>
        <revenue-row class="border-b-3 border-grey-l3">
          <template v-slot:name>
            <span class="my-auto font-serif">{{ $t('app.profile.team.finances.revenue.others') }}</span>
          </template>
          <div class="w-full font-medium text-h6">
            {{ $get(unit, 'entity.precalcs.0.data.finance.others') | currency }}
          </div>
        </revenue-row>
        <revenue-row class="w-full flex pt-2 pb-4">
          <template v-slot:name>
            <span class="my-auto text-h6">{{ $t('app.profile.team.finances.revenue.total') }}</span>
          </template>
          <div class="w-full font-medium text-h3">
            {{ $get(unit, 'entity.precalcs.0.data.finance.totalRevenue') | currency }}
          </div>
        </revenue-row>
        <revenue-row class="mt-4 border-t border-grey-l3">
          <template v-slot:name>
            <span class="my-auto text-h6">{{ $t('app.profile.team.finances.revenue.enterprise') }}</span>
          </template>
          <div class="w-full font-medium text-h3">
            {{ $get(unit, 'entity.precalcs.0.data.finance.enterpriseValue') | currency }}
          </div>
        </revenue-row>
        <revenue-row class="mt-4 border-t border-grey-l3">
          <template v-slot:name>
            <span class="my-auto text-h6">{{ $t('app.profile.team.finances.revenue.squad_market') }}</span>
          </template>
          <div class="w-full font-medium text-h3">
            {{ $get(unit, 'entity.precalcs.0.data.finance.squadMarketValue') | currency }}
          </div>
        </revenue-row>
      </div>
      <div class="w-full md:w-1/2 md:px-4 pb-4 md:pb-4">
        <revenue-chart :height="400" :series="revenueChartSeries" />
      </div>
    </div>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import { mapGetters } from 'vuex'
import {
  SeasonsQuery,
  UnitRevenueSeasonQuery,
  UnitRevenuesQuery
} from '@/services/graphql'
import RevenueChart from '@/components/charts/RevenueChart'
import RevenueRow from '@/components/RevenueRow'

export default {
  name: 'Revenue',

  components: {
    RevenueRow,
    RevenueChart
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
      ...UnitRevenueSeasonQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name
        }
      }
    },
    revenues: {
      ...UnitRevenuesQuery,
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      activeSeason: 'active/getLastSeason'
    }),

    revenueChartSeries() {
      return {
        name: 'Revenue',
        data: sortBy(this.revenues || [], 'name')
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
