<template>
  <component :is="specificComponent" v-if="accessSponsorship" :unit-id="$route.params.id" />
  <feature-not-available v-else />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'
import FeatureNotAvailable from '@/components/FeatureNotAvailable'

export default {
  layout: 'unit',

  name: 'UnitSponsorship',

  components: {
    FeatureNotAvailable,
    sponsorship: () =>
      import('@/components/unit-pages/_id/profile/sponsorship/sponsorship'),
    'team-sponsorship': () =>
      import('@/components/unit-pages/_id/profile/sponsorship/team-sponsorship'),
    'league-sponsorship': () =>
      import('@/components/unit-pages/_id/profile/sponsorship/league-sponsorship')
  },

  mixins: [unitPage],

  props: {
    accessSponsorship: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    pageID: 'sponsorship'
  })
}
</script>

<style lang="postcss" scoped>
</style>
