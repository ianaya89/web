<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'default',

  name: 'UnitCompare',

  components: {
    compare: () => import('@/components/unit-pages/_id/compare/compare')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'compare'
  })
}
</script>

<style lang="postcss" scoped>
</style>
