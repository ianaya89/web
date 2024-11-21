<template>
  <component :is="specificComponent" :deal-id="$route.params.dealId" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitDeal',

  components: {
    deal: () => import('@/components/unit-pages/_id/deals/_dealId')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'deal'
  })
}
</script>

<style lang="postcss" scoped>
</style>
