<template>
  <component :is="specificComponent" :unit-id="$route.params.id" data-cy="settings-page" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitSettings',

  components: {
    settings: () => import('@/components/unit-pages/_id/settings/settings'),
    'team-settings': () =>
      import('@/components/unit-pages/_id/settings/team-settings'),
    'brand-settings': () =>
      import('@/components/unit-pages/_id/settings/brand-settings')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'settings'
  })
}
</script>

<style lang="postcss" scoped>
</style>
