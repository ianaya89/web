<template>
  <component :is="specificComponent" :unit-id="$route.params.id" :selected-unit-id="$route.params.unitId" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'default',

  name: 'UnitMarketplaceTeamStadium',

  components: {
    stadium: () =>
      import('@/components/unit-pages/_id/marketplace/unit/_unitId/stadium/stadium')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'stadium'
  })
}
</script>

<style lang="postcss" scoped>
</style>
