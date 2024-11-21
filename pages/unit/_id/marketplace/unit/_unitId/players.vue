<template>
  <component :is="specificComponent" v-if="accessPlayers" :unit-id="$route.params.id" :selected-unit-id="$route.params.unitId" />
  <feature-not-available v-else />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'
import FeatureNotAvailable from '@/components/FeatureNotAvailable'

export default {
  layout: 'default',

  name: 'UnitMarketplaceTeamPlayers',

  components: {
    FeatureNotAvailable,
    players: () =>
      import('@/components/unit-pages/_id/marketplace/unit/_unitId/players/players')
  },

  mixins: [unitPage],

  props: {
    accessPlayers: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    pageID: 'players'
  })
}
</script>

<style lang="postcss" scoped>
</style>
