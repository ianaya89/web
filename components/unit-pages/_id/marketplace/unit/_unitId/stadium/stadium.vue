<template>
  <team-stadium :unit-id="selectedUnitId" />
</template>

<script>
import TeamStadium from '@/components/unit-pages/_id/profile/stadium/team-stadium'

export default {
  name: 'MarketplaceTeamStadium',

  components: {
    TeamStadium
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
