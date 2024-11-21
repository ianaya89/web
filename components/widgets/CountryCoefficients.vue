<template>
  <div class="w-full">
    <div class="w-full">
      <h5>{{ $t('app.profile.league.country_coefficients') }}</h5>
    </div>
    <div class="w-full flex">
      <div class="w-2/3">
        <country-coefficient-position-chart v-if="countryCoefficientsChartSeries.data.length" :height="400" :series="countryCoefficientsChartSeries" />
      </div>
      <div class="w-1/3">
        <div class="flex flex-col w-2/3 mx-auto max-h-400px overflow-y-auto pr-1">
          <div v-for="record in countryCoefficients" :key="record.season.id" class="flex pt-2 pb-1 mb-1 border-b border-grey-l4">
            <app-tooltip class="w-1/2">
              <template v-slot:activator>
                <span>
                  {{ record.season.name }}
                </span>
              </template>
              <span class="capitalize">{{ $t('general.points') }}:</span> {{ record.value }}
            </app-tooltip>
            <span class="w-1/2 text-right font-medium">
              {{ formatPosition(record.position) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import numeral from 'numeral'
import AppTooltip from '@/components/AppTooltip'
import CountryCoefficientPositionChart from '@/components/charts/CountryCoefficientPositionChart'
import { LeagueCountriesUEFACoefficients } from '@/services/graphql'

export default {
  name: 'CountryCoefficients',

  components: {
    AppTooltip,
    CountryCoefficientPositionChart
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...LeagueCountriesUEFACoefficients,
      variables() {
        return {
          id: this.unitId
        }
      }
    }
  },

  computed: {
    countryCoefficients() {
      return sortBy(
        this.$get(this.unit, 'entity.country.uefaCoefficients', []),
        r => -parseInt(r.season.name)
      )
    },

    countryCoefficientsChartSeries() {
      return {
        name: 'Country coefficients',
        data: sortBy(this.countryCoefficients, r =>
          parseInt(r.season.name)
        ).map(record => {
          return {
            name: `${record.season.name}`,
            season: record.season,
            y: record.position
          }
        })
      }
    }
  },

  methods: {
    formatPosition(position) {
      if (!position) {
        return 'N/A'
      }

      return numeral(position).format('0o')
    }
  }
}
</script>

<style lang="postcss" scoped>
.max-h-400px {
  max-height: 400px;
}
</style>
