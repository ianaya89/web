<template>
  <component :is="specificComponent" v-if="accessFansAndReach" :unit-id="$route.params.id" :selected-unit-id="$route.params.unitId" />
  <feature-not-available v-else />
</template>

<script>
import selectedUnitPage from '@/services/mixins/selectedUnitPage'
import { ActiveUnitQuery } from '@/services/graphql'
import FeatureNotAvailable from '@/components/FeatureNotAvailable'

export default {
  layout: 'default',

  name: 'UnitMarketplaceTeamFans',

  apollo: {
    unit: {
      ...ActiveUnitQuery(function() {
        return { id: this.$route.params.unitId }
      })
    }
  },

  components: {
    FeatureNotAvailable,
    fans: () =>
      import('@/components/unit-pages/_id/marketplace/unit/_unitId/fans/fans'),
    'league-fans': () =>
      import('@/components/unit-pages/_id/marketplace/unit/_unitId/fans/league-fans')
  },

  mixins: [selectedUnitPage],

  props: {
    accessFansAndReach: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    pageID: 'fans'
  })
}
</script>

<style lang="postcss" scoped>
</style>
