<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitInventory',

  components: {
    inventory: () => import('@/components/unit-pages/_id/inventory/inventory')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'inventory'
  })
}
</script>

<style lang="postcss" scoped>
</style>
