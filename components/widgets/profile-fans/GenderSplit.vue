<template>
  <div class="pr-0 lg:pr-6">
    <opposite-chart :series="genderSeries" :tooltip="false" :enable-mouse-tracking="false" :height="90" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { UnitGenderSplitQuery } from '@/services/graphql'
import OppositeChart from '@/components/charts/OppositeChart'
import { theme } from '@/tailwind.config'

export default {
  name: 'GenderSplit',

  components: {
    OppositeChart
  },

  props: {
    unitId: {
      type: String,
      required: true
    }
  },

  apollo: {
    unit: {
      ...UnitGenderSplitQuery,
      variables() {
        return {
          id: this.unitId,
          season: this.activeSeason.name
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      activeSeason: 'active/getLastSeason'
    }),

    genderSeries() {
      return {
        name: 'Genders',
        series: [
          {
            name: this.$t('app.profile.team.fans.demographics.other'),
            icon: '',
            iconColor: 'text-grey',
            color: theme.extend.colors.grey,
            data: [
              this.$get(
                this.unit,
                'entity.precalcs.0.data.genderSplit.unknown',
                0
              )
            ]
          },
          {
            name: this.$t('app.profile.team.fans.demographics.female'),
            icon: 'fas fa-female',
            iconColor: 'text-green',
            color: theme.extend.colors.green,
            data: [
              this.$get(
                this.unit,
                'entity.precalcs.0.data.genderSplit.female',
                0.5
              )
            ]
          },
          {
            name: this.$t('app.profile.team.fans.demographics.male'),
            icon: 'fas fa-male',
            iconColor: 'text-red',
            color: theme.extend.colors.red,
            data: [
              this.$get(
                this.unit,
                'entity.precalcs.0.data.genderSplit.male',
                0.5
              )
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
