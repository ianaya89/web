<template>
  <component :is="specificComponent" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitDashboard',

  components: {
    dashboard: () => import('@/components/unit-pages/_id/dashboard/dashboard'),
    'team-dashboard': () =>
      import('@/components/unit-pages/_id/dashboard/team-dashboard'),
    'brand-dashboard': () =>
      import('@/components/unit-pages/_id/dashboard/brand-dashboard'),
    'league-dashboard': () =>
      import('@/components/unit-pages/_id/dashboard/league-dashboard'),
    'page-not-available': () =>
      import('@/components/unit-pages/_id/page-not-available')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'dashboard',
    permissionName: 'access-brand-dashboard'
  })
}
</script>

<style lang="postcss" scoped>
</style>
