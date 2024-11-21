<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'default',

  name: 'UnitCampaignCreate',

  components: {
    create: () => import('@/components/unit-pages/_id/campaigns/create')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'create'
  })
}
</script>

<style lang="postcss" scoped>
</style>
