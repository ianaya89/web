<template>
  <component :is="specificComponent" v-if="accessTeamInventory" :unit-id="$route.params.id" :selected-unit-id="$route.params.unitId" />
  <feature-not-available v-else />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'
import FeatureNotAvailable from '@/components/FeatureNotAvailable'

export default {
  layout: 'default',

  name: 'UnitMarketplaceUnitInventory',

  components: {
    FeatureNotAvailable,
    inventory: () =>
      import('@/components/unit-pages/_id/marketplace/unit/_unitId/inventory/inventory')
  },

  mixins: [unitPage],

  props: {
    accessTeamInventory: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    pageID: 'inventory'
  })
}
</script>

<style lang="postcss" scoped>
</style>
