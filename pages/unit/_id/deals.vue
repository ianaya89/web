<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitDeals',

  components: {
    deals: () => import('@/components/unit-pages/_id/deals/deals'),
    'page-not-available': () =>
      import('@/components/unit-pages/_id/page-not-available')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'deals',
    permissionName: 'access-brand-deals'
  })
}
</script>

<style lang="postcss" scoped>
</style>
