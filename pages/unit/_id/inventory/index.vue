<template>
  <component :is="specificComponent" :unit-id="$route.params.id" data-cy="inventory-page" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitInventoryIndex',

  components: {
    index: () => import('@/components/unit-pages/_id/inventory/index/index')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'index'
  })
}
</script>

<style lang="postcss" scoped>
</style>
