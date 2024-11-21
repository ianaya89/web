<template>
  <league-league :unit-id="selectedUnitId" />
</template>

<script>
import LeagueLeague from '@/components/unit-pages/_id/profile/league/league-league'

export default {
  name: 'MarketplaceLeagueLeague',

  components: {
    LeagueLeague
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
