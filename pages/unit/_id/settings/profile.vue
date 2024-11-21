<template>
  <component :is="specificComponent" data-cy="settings-profile-page" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitProfile',

  components: {
    profile: () =>
      import('@/components/unit-pages/_id/settings/profile/profile'),
    'team-profile': () =>
      import('@/components/unit-pages/_id/settings/profile/team-profile'),
    'brand-profile': () =>
      import('@/components/unit-pages/_id/settings/profile/brand-profile'),
    'league-profile': () =>
      import('@/components/unit-pages/_id/settings/profile/league-profile')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'profile'
  })
}
</script>

<style lang="postcss" scoped>
</style>
