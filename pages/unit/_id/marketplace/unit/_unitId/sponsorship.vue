<template>
  <component :is="specificComponent" :unit-id="$route.params.id" :selected-unit-id="$route.params.unitId" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'default',

  name: 'UnitMarketplaceTeamSponsorship',

  components: {
    sponsorship: () =>
      import('@/components/unit-pages/_id/marketplace/unit/_unitId/sponsorship/sponsorship')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'sponsorship'
  })
}
</script>

<style lang="postcss" scoped>
</style>
