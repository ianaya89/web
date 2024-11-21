<template>
  <team-fans-landing :unit-id="unitId" :league-id="leagueId" :country-split="countrySplit" :is-authenticated="isAuthenticated" />
</template>

<script>
import TeamFansLanding from '@/components/widgets/landing/TeamFansLanding'

export default {
  scrollToTop: true,

  components: {
    TeamFansLanding
  },
  props: {
    unitId: {
      type: String,
      required: true
    },
    countrySplit: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    leagueId: {
      type: String,
      required: false
    },
    isAuthenticated: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
