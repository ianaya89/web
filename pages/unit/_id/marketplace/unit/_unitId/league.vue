<template>
  <component :is="specificComponent" v-if="accessLeague && !$apollo.queries.unit.loading" :unit-id="$route.params.id" :selected-unit-id="$route.params.unitId" />
  <feature-not-available v-else-if="!accessLeague" />
</template>

<script>
import { ActiveUnitQuery } from '@/services/graphql'
import selectedUnitPage from '@/services/mixins/selectedUnitPage'
import FeatureNotAvailable from '@/components/FeatureNotAvailable'

export default {
  layout: 'default',

  name: 'UnitMarketplaceTeamLeague',

  apollo: {
    unit: {
      ...ActiveUnitQuery(function() {
        return { id: this.$route.params.unitId }
      })
    }
  },

  components: {
    FeatureNotAvailable,
    league: () =>
      import('@/components/unit-pages/_id/marketplace/unit/_unitId/league/league'),
    'league-league': () =>
      import('@/components/unit-pages/_id/marketplace/unit/_unitId/league/league-league')
  },

  mixins: [selectedUnitPage],

  props: {
    accessLeague: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    pageID: 'league'
  })
}
</script>

<style lang="postcss" scoped>
</style>
