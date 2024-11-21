<template>
  <component :is="specificComponent" v-if="!$apollo.queries.unit.loading" :unit-id="$route.params.id" :selected-unit-id="$route.params.unitId" />
</template>

<script>
import selectedUnitPage from '@/services/mixins/selectedUnitPage'
import { UnitTypeQuery } from '@/services/graphql'

export default {
  layout: 'default',

  name: 'UnitMarketplaceUnit',

  apollo: {
    unit: {
      ...UnitTypeQuery,
      variables() {
        return { id: this.$route.params.unitId }
      }
    }
  },

  components: {
    unit: () => import('@/components/unit-pages/_id/marketplace/unit/_unitId'),
    'league-unit': () =>
      import('@/components/unit-pages/_id/marketplace/unit/league-_unitId')
  },

  mixins: [selectedUnitPage],

  data: () => ({
    pageID: 'unit'
  })
}
</script>

<style lang="postcss" scoped>
</style>
