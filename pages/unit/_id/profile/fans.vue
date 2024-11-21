<template>
  <component :is="specificComponent" v-if="accessFansAndReach" :unit-id="$route.params.id" />
  <feature-not-available v-else />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'
import FeatureNotAvailable from '@/components/FeatureNotAvailable'

export default {
  layout: 'unit',

  name: 'UnitFans',

  components: {
    FeatureNotAvailable,
    fans: () => import('@/components/unit-pages/_id/profile/fans/fans'),
    'team-fans': () =>
      import('@/components/unit-pages/_id/profile/fans/team-fans'),
    'league-fans': () =>
      import('@/components/unit-pages/_id/profile/fans/league-fans')
  },

  mixins: [unitPage],

  props: {
    accessFansAndReach: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    pageID: 'fans'
  })
}
</script>

<style lang="postcss" scoped>
</style>
