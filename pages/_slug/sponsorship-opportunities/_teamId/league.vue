<template>
  <team-league-landing
    :team-id="this.$route.params.teamId"
    :unit-id="unitId"
    :league-id="leagueId"
    :league-name="leagueName"
    :league-logo="leagueLogo"
    :city="city"
    :country="country"
    :is-authenticated="isAuthenticated"
  />
</template>

<script>
import TeamLeagueLanding from '@/components/widgets/landing/TeamLeagueLanding'

export default {
  scrollToTop: true,

  components: {
    TeamLeagueLanding
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
    leagueId: {
      type: String,
      required: true
    },
    leagueName: {
      type: String,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    city: {
      type: Object,
      required: false
    },
    // eslint-disable-next-line vue/require-default-prop
    country: {
      type: String,
      required: false
    },
    // eslint-disable-next-line vue/require-default-prop
    leagueLogo: {
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
