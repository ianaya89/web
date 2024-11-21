<template>
  <component :is="specificComponent" :unit-id="$route.params.id" :selected-unit-id="$route.params.unitId" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'default',

  name: 'UnitMarketplaceTeamFinances',

  components: {
    finances: () =>
      import('@/components/unit-pages/_id/marketplace/unit/_unitId/finances/finances')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'finances'
  })
}
</script>

<style lang="postcss" scoped>
</style>
