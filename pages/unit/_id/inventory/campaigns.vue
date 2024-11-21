<template>
  <component :is="specificComponent" data-cy="campaigns-page" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitCampaigns',

  components: {
    campaigns: () =>
      import('@/components/unit-pages/_id/inventory/campaigns/campaigns')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'campaigns'
  })
}
</script>

<style lang="postcss" scoped>
</style>
