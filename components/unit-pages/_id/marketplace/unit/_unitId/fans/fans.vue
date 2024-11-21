<template>
  <team-fans :unit-id="selectedUnitId" />
</template>

<script>
import TeamFans from '@/components/unit-pages/_id/profile/fans/team-fans'

export default {
  name: 'MarketplaceTeamFans',

  components: {
    TeamFans
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
