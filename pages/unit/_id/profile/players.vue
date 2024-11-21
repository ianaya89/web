<template>
  <component :is="specificComponent" v-if="accessPlayers" :unit-id="$route.params.id" />
  <feature-not-available v-else />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'
import FeatureNotAvailable from '@/components/FeatureNotAvailable'

export default {
  layout: 'unit',

  name: 'UnitPlayers',

  components: {
    FeatureNotAvailable,
    players: () =>
      import('@/components/unit-pages/_id/profile/players/players'),
    'team-players': () =>
      import('@/components/unit-pages/_id/profile/players/team-players'),
    'league-players': () =>
      import('@/components/unit-pages/_id/profile/players/league-players')
  },

  mixins: [unitPage],

  props: {
    accessPlayers: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    pageID: 'players'
  })
}
</script>

<style lang="postcss" scoped>
</style>
