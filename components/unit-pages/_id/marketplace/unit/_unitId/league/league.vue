<template>
  <team-league :unit-id="selectedUnitId" />
</template>

<script>
import TeamLeague from '@/components/unit-pages/_id/profile/league/team-league'

export default {
  name: 'MarketplaceUnitLeague',

  components: {
    TeamLeague
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    selectedUnitId: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
