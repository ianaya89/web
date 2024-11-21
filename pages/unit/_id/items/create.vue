<template>
  <component :is="specificComponent" :unit-id="$route.params.id" data-cy="create-inventory-item-page" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'default',

  name: 'UnitCreateItem',

  components: {
    create: () => import('@/components/unit-pages/_id/items/create')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'create'
  })
}
</script>

<style lang="postcss" scoped>
</style>
