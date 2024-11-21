<template>
  <team-league :unit-id="teamId" />
</template>

<script>
import TeamLeague from '@/components/unit-pages/_id/profile/league/team-league'

export default {
  name: 'MarketplaceTeamLeague',

  components: {
    TeamLeague
  },

  props: {
    unitId: {
      type: String,
      required: true
    },
    teamId: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
