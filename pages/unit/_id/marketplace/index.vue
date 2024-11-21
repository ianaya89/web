<template>
  <component :is="specificComponent" :unit-id="$route.params.id" data-cy="marketplace-page" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitMarketplace',

  components: {
    marketplace: () => import('@/components/unit-pages/_id/marketplace/index')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'marketplace'
  })
}
</script>

<style lang="postcss" scoped>
</style>
