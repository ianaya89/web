<template>
  <team-players :unit-id="selectedUnitId" />
</template>

<script>
import TeamPlayers from '@/components/unit-pages/_id/profile/players/team-players'

export default {
  name: 'MarketplaceTeamPlayers',

  components: {
    TeamPlayers
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
