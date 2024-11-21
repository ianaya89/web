<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'default',

  name: 'UnitProposal',

  components: {
    proposal: () => import('@/components/unit-pages/_id/proposal/proposal')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'proposal'
  })
}
</script>

<style lang="postcss" scoped>
</style>
