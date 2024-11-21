<template>
  <component :is="specificComponent" data-cy="settings-subscription-page" :unit-id="$route.params.id" />
</template>

<script>
import unitPage from '@/services/mixins/unitPage'

export default {
  layout: 'unit',

  name: 'UnitSubscriptions',

  components: {
    subscriptions: () =>
      import('@/components/unit-pages/_id/settings/subscriptions/subscriptions'),
    'team-subscriptions': () =>
      import('@/components/unit-pages/_id/settings/subscriptions/team-subscriptions'),
    'league-subscriptions': () =>
      import('@/components/unit-pages/_id/settings/subscriptions/league-subscriptions'),
    'brand-subscriptions': () =>
      import('@/components/unit-pages/_id/settings/subscriptions/brand-subscriptions')
  },

  mixins: [unitPage],

  data: () => ({
    pageID: 'subscriptions'
  })
}
</script>

<style lang="postcss" scoped>
</style>
