<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'default',

  name: 'UnitCreatePackage',

  components: {
    create: () => import('@/components/unit-pages/_id/packages/create')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'create'
  })
}
</script>

<style lang="postcss" scoped>
</style>
