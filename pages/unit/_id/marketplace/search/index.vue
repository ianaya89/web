<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitMarketplaceSearch',

  components: {
    search: () => import('@/components/unit-pages/_id/marketplace/search/index')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'search'
  })
}
</script>

<style lang="postcss" scoped>
</style>
