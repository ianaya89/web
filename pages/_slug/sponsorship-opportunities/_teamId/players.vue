<template>
  <team-players-landing :unit-id="unitId" :is-authenticated="isAuthenticated" />
</template>

<script>
import TeamPlayersLanding from '@/components/widgets/landing/TeamPlayersLanding'

export default {
  scrollToTop: true,

  components: {
    TeamPlayersLanding
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
    isAuthenticated: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
