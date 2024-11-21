<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitProfile',

  components: {
    profile: () => import('@/components/unit-pages/_id/profile/profile'),
    'team-profile': () =>
      import('@/components/unit-pages/_id/profile/team-profile'),
    'league-profile': () =>
      import('@/components/unit-pages/_id/profile/league-profile'),
    'brand-profile': () =>
      import('@/components/unit-pages/_id/profile/brand-profile')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'profile'
  })
}
</script>

<style lang="postcss" scoped>
</style>
