<template>
  <team-finances :unit-id="selectedUnitId" />
</template>

<script>
import TeamFinances from '@/components/unit-pages/_id/profile/finances/team-finances'
import unitPage from '@/services/mixins/unitPage'

export default {
  name: 'MarketplaceUnitFinances',

  components: { TeamFinances },

  mixins: [unitPage],

  props: {
    unitId: {
      type: String,
      required: true
    },
    selectedUnitId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    pageID: 'unit'
  })
}
</script>

<style lang="postcss" scoped>
</style>
