<template>
  <component :is="specificComponent" v-if="accessLeague" :unit-id="$route.params.id" />
  <feature-not-available v-else />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'
import FeatureNotAvailable from '@/components/FeatureNotAvailable'

export default {
  layout: 'unit',

  name: 'UnitLeague',

  components: {
    FeatureNotAvailable,
    league: () => import('@/components/unit-pages/_id/profile/league/league'),
    'team-league': () =>
      import('@/components/unit-pages/_id/profile/league/team-league'),
    'league-league': () =>
      import('@/components/unit-pages/_id/profile/league/league-league')
  },

  mixins: [unitPage],

  props: {
    accessLeague: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    pageID: 'league'
  })
}
</script>

<style lang="postcss" scoped>
</style>
