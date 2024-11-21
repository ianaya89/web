<template>
  <component :is="specificComponent" :unit-id="$route.params.id" :item-id="$route.params.itemId" data-cy="edit-inventory-item-page" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'default',

  name: 'UnitEditItem',

  components: {
    edit: () => import('@/components/unit-pages/_id/items/_itemId')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'edit'
  })
}
</script>

<style lang="postcss" scoped>
</style>
