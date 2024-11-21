<template>
  <team-sponsorship :unit-id="selectedUnitId" />
</template>

<script>
import TeamSponsorship from '@/components/unit-pages/_id/profile/sponsorship/team-sponsorship'

export default {
  name: 'MarketplaceTeamSponsorship',

  components: {
    TeamSponsorship
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
