<template>
  <component :is="specificComponent" :unit-id="$route.params.id" :item-id="$route.params.itemId" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'default',

  name: 'UnitMarketplaceItem',

  components: {
    itemId: () => import('@/components/unit-pages/_id/marketplace/item/_itemId')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'itemId'
  })
}
</script>

<style lang="postcss" scoped>
</style>
